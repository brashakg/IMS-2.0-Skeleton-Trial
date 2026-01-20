from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from database import (
    get_database,
    orders_collection,
    order_items_collection,
    discount_requests_collection,
    discount_approvals_collection,
    products_collection,
    customers_collection,
    patients_collection,
    user_roles_collection,
    bills_collection,
    payments_collection,
    invoices_collection,
    locations_collection
)
from models import (
    CreateOrderRequest,
    AttachOrderItemRequest,
    ReviewPricingRequest,
    DiscountRequest,
    ApproveDiscountRequest,
    RejectDiscountRequest,
    LockPricingRequest,
    CreateBillRequest,
    RecordPaymentRequest,
    GenerateInvoiceRequest,
    OrderResponse,
    OrderItemResponse,
    PricingReviewResponse,
    DiscountRequestResponse,
    DiscountApprovalResponse,
    PricingLockResponse,
    OrderStateResponse,
    BillResponse,
    PaymentResponse,
    InvoiceResponse,
    OrderState,
    DiscountRequestStatus,
    AuditEventType,
    PricingSnapshot,
    CategoryClassification,
    PaymentMode
)
from audit_service import AuditService
from state_machine import StateMachineValidator
from category_enforcement import CategoryEnforcementService
from discount_enforcement import DiscountEnforcementService
from auth import create_access_token, authenticate_user, get_current_user, require_role
from permissions import check_permission
from datetime import datetime
from uuid import uuid4
from typing import Dict, Any, List
from pydantic import BaseModel

app = FastAPI(title="IMS 2.0 - Retail Operating System", version="Phase 2")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restrict in production
    allow_credentials=True,


# ============================================================================
# AUTHENTICATION
# ============================================================================

class LoginRequest(BaseModel):
    username: str
    password: str
    location_id: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]


@app.post("/api/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """Login endpoint - returns JWT token"""
    
    # Validate location exists
    location = locations_collection.find_one({"id": request.location_id, "status": "ACTIVE"})
    if not location:
        raise HTTPException(
            status_code=404,
            detail={"error": True, "reason_code": "INVALID_LOCATION", "message": "Location not found or inactive"}
        )
    
    # Authenticate user
    user_data = authenticate_user(request.username, request.password, request.location_id)
    
    if not user_data:
        raise HTTPException(
            status_code=401,
            detail={"error": True, "reason_code": "INVALID_CREDENTIALS", "message": "Invalid username, password, or no role at this location"}
        )
    
    # Generate token
    token = create_access_token(
        user_id=user_data["user_id"],
        roles=user_data["roles"],
        location_id=user_data["location_id"]
    )
    
    return LoginResponse(
        access_token=token,
        token_type="bearer",
        user={
            "user_id": user_data["user_id"],
            "username": user_data["username"],
            "email": user_data["email"],
            "roles": user_data["roles"],
            "location_id": user_data["location_id"],
            "location_name": location.get("display_name")
        }
    )


@app.get("/api/auth/me")
async def get_current_user_info(user: Dict[str, Any] = Depends(get_current_user)):
    """Get current authenticated user info"""
    return {"user": user}


    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def generate_order_number() -> str:
    """Generate unique order number"""
    # Format: BV-YYYY-NNNN
    year = datetime.utcnow().year
    # TODO: Implement sequence counter
    sequence = str(uuid4())[:4].upper()
    return f"BV-{year}-{sequence}"


def get_active_role(user_id: str, location_id: str) -> str:
    """
    Get active role for user at location
    Returns: role_id
    Raises: HTTPException if no role assignment
    """
    user_role = user_roles_collection.find_one({
        "user_id": user_id,
        "location_id": location_id,
        "active": True
    })
    
    if not user_role:
        raise HTTPException(
            status_code=403,
            detail={
                "error": True,
                "reason_code": "ROLE_VIOLATION",
                "message": "User does not have role assignment at this location"
            }
        )
    
    return user_role.get("role_id")


# ============================================================================
# PHASE 2 API ENDPOINTS
# ============================================================================

@app.post("/api/orders", response_model=OrderResponse, status_code=201)
async def create_order(request: CreateOrderRequest, user: Dict[str, Any] = Depends(get_current_user)):
    """
    API ENDPOINT 1: Create Order
    State: CREATED
    Auth: Required
    Permissions: create_order
    """
    
    # Permission check
    if not check_permission(user.get("roles", []), "create_order"):
        raise HTTPException(
            status_code=403,
            detail={"error": True, "reason_code": "INSUFFICIENT_PERMISSIONS", "message": "You do not have permission to create orders"}
        )
    
    # Use authenticated user context
    actual_user_id = user.get("user_id")
    actual_location_id = user.get("location_id")
    
    # Validation 1: Customer exists
    customer = customers_collection.find_one({"id": request.customer_id})
    if not customer:
        raise HTTPException(
            status_code=404,
            detail={
                "error": True,
                "reason_code": "ENTITY_NOT_FOUND",
                "message": f"Customer {request.customer_id} not found"
            }
        )
    
    # Validation 2: Patient exists and belongs to customer
    patient = patients_collection.find_one({"id": request.patient_id})
    if not patient:
        raise HTTPException(
            status_code=404,
            detail={
                "error": True,
                "reason_code": "ENTITY_NOT_FOUND",
                "message": f"Patient {request.patient_id} not found"
            }
        )
    
    if patient.get("customer_id") != request.customer_id:
        raise HTTPException(
            status_code=409,
            detail={
                "error": True,
                "reason_code": "PATIENT_CUSTOMER_MISMATCH",
                "message": "Patient does not belong to selected customer"
            }
        )
    
    # Validation 3: User has role at location (already validated by token)
    active_role_id = user.get("roles", [])[0] if user.get("roles") else "UNKNOWN"
    
    # Create order
    order_id = str(uuid4())
    order_number = generate_order_number()
    
    order_doc = {
        "id": order_id,
        "order_number": order_number,
        "customer_id": request.customer_id,
        "patient_id": request.patient_id,
        "location_id": actual_location_id,
        "state": OrderState.CREATED.value,
        "created_by": actual_user_id,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "pricing_snapshot": None,
        "notes": request.notes
    }
    
    orders_collection.insert_one(order_doc)
    
    # Emit audit event
    AuditService.emit_event(
        event_type=AuditEventType.ORDER_CREATED,
        entity_type="ORDER",
        entity_id=order_id,
        action="CREATE",
        actor_id=actual_user_id,
        role_context=active_role_id,
        trigger_source="POS",
        previous_state=None,
        new_state=OrderState.CREATED.value,
        payload_snapshot=request.model_dump()
    )
    
    return OrderResponse(
        order_id=order_id,
        order_number=order_number,
        state=OrderState.CREATED,
        created_at=order_doc["created_at"],
        created_by=actual_user_id
    )


@app.post("/api/orders/{order_id}/items", response_model=OrderItemResponse, status_code=201)
async def attach_order_item(order_id: str, request: AttachOrderItemRequest):
    """
    API ENDPOINT 2: Attach Order Item
    State transition: CREATED → ITEMS_ATTACHED (if first item)
    Source: PHASE_2_API_SPECIFICATIONS.md
    """
    
    # Fetch order
    order = orders_collection.find_one({"id": order_id})
    if not order:
        raise HTTPException(
            status_code=404,
            detail={
                "error": True,
                "reason_code": "ENTITY_NOT_FOUND",
                "message": f"Order {order_id} not found"
            }
        )
    
    current_state = OrderState(order["state"])
    
    # State validation: Can only attach items in CREATED or ITEMS_ATTACHED
    StateMachineValidator.validate_action_allowed(current_state, "attach_items")
    
    # Fetch product
    product = products_collection.find_one({"id": request.product_id})
    if not product:
        raise HTTPException(
            status_code=404,
            detail={
                "error": True,
                "reason_code": "ENTITY_NOT_FOUND",
                "message": f"Product {request.product_id} not found"
            }
        )
    
    category = product.get("category", "").upper()
    
    # Category enforcement
    category_validation = CategoryEnforcementService.validate_item_attributes(
        product_id=request.product_id,
        attributes=request.attributes,
        prescription_id=request.prescription_id
    )
    
    # Prescription validation (if required)
    prescription_bound = False
    if request.prescription_id:
        CategoryEnforcementService.validate_prescription(
            prescription_id=request.prescription_id,
            patient_id=order["patient_id"]
        )
        prescription_bound = True
    
    # Create order item
    order_item_id = str(uuid4())
    mrp = product.get("mrp", 0.0)
    offer_price = product.get("offer_price", mrp)
    
    order_item_doc = {
        "id": order_item_id,
        "order_id": order_id,
        "product_id": request.product_id,
        "category": category,
        "quantity": request.quantity,
        "unit_price": offer_price,
        "mrp": mrp,
        "offer_price": offer_price,
        "discount_applied": 0.0,
        "final_price": offer_price * request.quantity,
        "prescription_id": request.prescription_id,
        "attributes": request.attributes,
        "created_at": datetime.utcnow()
    }
    
    order_items_collection.insert_one(order_item_doc)
    
    # State transition (if first item)
    state_transition = None
    if current_state == OrderState.CREATED:
        orders_collection.update_one(
            {"id": order_id},
            {"$set": {
                "state": OrderState.ITEMS_ATTACHED.value,
                "updated_at": datetime.utcnow()
            }}
        )
        state_transition = f"{OrderState.CREATED.value} → {OrderState.ITEMS_ATTACHED.value}"
    
    # Emit audit event
    AuditService.emit_event(
        event_type=AuditEventType.ORDER_ITEM_ATTACHED,
        entity_type="ORDER_ITEM",
        entity_id=order_item_id,
        action="CREATE",
        actor_id="system",  # TODO: Extract from request context
        role_context="system",
        trigger_source="POS",
        previous_state=None,
        new_state="ATTACHED",
        payload_snapshot={
            **request.model_dump(),
            "category": category,
            "prescription_bound": prescription_bound
        }
    )
    
    return OrderItemResponse(
        order_item_id=order_item_id,
        order_id=order_id,
        product_id=request.product_id,
        category=category,
        quantity=request.quantity,
        unit_price=offer_price,
        prescription_bound=prescription_bound,
        state_transition=state_transition
    )


@app.get("/api/orders/{order_id}/state", response_model=OrderStateResponse)
async def get_order_state(order_id: str):
    """
    API ENDPOINT 8: Get Order State
    Source: PHASE_2_API_SPECIFICATIONS.md
    """
    
    # Fetch order
    order = orders_collection.find_one({"id": order_id})
    if not order:
        raise HTTPException(
            status_code=404,
            detail={
                "error": True,
                "reason_code": "ENTITY_NOT_FOUND",
                "message": f"Order {order_id} not found"
            }
        )
    
    current_state = OrderState(order["state"])
    
    # Determine allowed and blocked actions
    allowed_actions = StateMachineValidator.STATE_PERMISSIONS.get(current_state, [])
    
    # Check for pending approvals
    pending_approvals = list(discount_requests_collection.find({
        "order_id": order_id,
        "status": DiscountRequestStatus.PENDING_APPROVAL.value
    }))
    pending_approval_ids = [req["id"] for req in pending_approvals]
    
    # Immutability check
    immutable = current_state == OrderState.PRICING_LOCKED
    
    # Emit audit event (read operation)
    AuditService.emit_event(
        event_type=AuditEventType.ORDER_STATE_QUERIED,
        entity_type="ORDER",
        entity_id=order_id,
        action="READ",
        actor_id="system",  # TODO: Extract from auth context
        role_context="system",
        trigger_source="POS",
        payload_snapshot={"state": current_state.value}
    )
    
    return OrderStateResponse(
        order_id=order_id,
        state=current_state,
        allowed_actions=allowed_actions,
        blocked_actions=[],  # TODO: Compute blocked actions with reasons
        pending_approvals=pending_approval_ids,
        immutable=immutable
    )


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "phase": "BUILD_PASS_6_PHASE_2",
        "service": "IMS 2.0 - POS Core"
    }


@app.post("/api/orders/{order_id}/pricing/review", response_model=PricingReviewResponse)
async def review_pricing(order_id: str, request: ReviewPricingRequest):
    """
    API ENDPOINT 3: Review Pricing
    State transition: ITEMS_ATTACHED → PRICING_REVIEWED
    Source: PHASE_2_API_SPECIFICATIONS.md
    """
    
    # Fetch order
    order = orders_collection.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Order not found"})
    
    current_state = OrderState(order["state"])
    
    # State validation
    if current_state != OrderState.ITEMS_ATTACHED:
        raise HTTPException(
            status_code=409,
            detail={
                "error": True,
                "reason_code": "INVALID_STATE_TRANSITION",
                "message": "Order must be in ITEMS_ATTACHED state",
                "current_state": current_state.value
            }
        )
    
    # Fetch all order items
    items = list(order_items_collection.find({"order_id": order_id}))
    if not items:
        raise HTTPException(
            status_code=400,
            detail={"error": True, "reason_code": "ORDER_EMPTY", "message": "Cannot review pricing for order with no items"}
        )
    
    # Pricing computation (SERVER-SIDE ONLY)
    pricing_items = []
    subtotal = 0.0
    discount_eligible_items = []
    
    for item in items:
        item_mrp = item.get("mrp", 0.0)
        item_offer = item.get("offer_price", item_mrp)
        item_qty = item.get("quantity", 1)
        
        # MRP vs Offer Price validation (HARD BLOCK if Offer > MRP)
        if item_offer > item_mrp:
            raise HTTPException(
                status_code=422,
                detail={
                    "error": True,
                    "reason_code": "OFFER_PRICE_EXCEEDS_MRP",
                    "message": f"Offer price {item_offer} exceeds MRP {item_mrp}",
                    "violating_item_id": item["id"],
                    "mrp": item_mrp,
                    "offer_price": item_offer
                }
            )
        
        # Determine discount eligibility
        discount_eligible = (item_offer >= item_mrp)  # Only if Offer == MRP or Offer > MRP (latter blocked above)
        
        if discount_eligible:
            discount_eligible_items.append(item["id"])
        
        item_total = item_offer * item_qty
        subtotal += item_total
        
        # Fetch product for category discount cap info
        product = products_collection.find_one({"id": item["product_id"]})
        category_classification = product.get("category_classification", "MASS") if product else "MASS"
        
        pricing_items.append({
            "order_item_id": item["id"],
            "product_name": product.get("name", "Unknown") if product else "Unknown",
            "category": item.get("category"),
            "mrp": item_mrp,
            "offer_price": item_offer,
            "quantity": item_qty,
            "item_total": item_total,
            "discount_eligible": discount_eligible,
            "category_discount_cap": DiscountEnforcementService._get_category_discount_cap(
                CategoryClassification(category_classification)
            )
        })
    
    # GST computation (basic - Phase 2 scope)
    # TODO: Implement location-based IGST/CGST/SGST logic
    gst_rate = 0.18  # 18% default
    gst_amount = subtotal * gst_rate
    cgst = gst_amount / 2
    sgst = gst_amount / 2
    igst = 0.0  # TODO: Inter-state logic
    
    grand_total = subtotal + gst_amount
    
    # Create pricing snapshot
    pricing_snapshot = {
        "items": pricing_items,
        "subtotal": round(subtotal, 2),
        "gst_breakdown": {
            "cgst": round(cgst, 2),
            "sgst": round(sgst, 2),
            "igst": round(igst, 2)
        },
        "grand_total": round(grand_total, 2),
        "computed_at": datetime.utcnow().isoformat()
    }
    
    # Update order state
    orders_collection.update_one(
        {"id": order_id},
        {"$set": {
            "state": OrderState.PRICING_REVIEWED.value,
            "pricing_snapshot": pricing_snapshot,
            "updated_at": datetime.utcnow()
        }}
    )
    
    # Emit audit event
    AuditService.emit_event(
        event_type=AuditEventType.PRICING_REVIEWED,
        entity_type="ORDER",
        entity_id=order_id,
        action="PRICE_REVIEW",
        actor_id=request.requested_by,
        role_context="system",  # TODO: Fetch actual role
        trigger_source="POS",
        previous_state=OrderState.ITEMS_ATTACHED.value,
        new_state=OrderState.PRICING_REVIEWED.value,
        payload_snapshot=pricing_snapshot
    )
    
    return PricingReviewResponse(
        order_id=order_id,
        pricing_snapshot=PricingSnapshot(**pricing_snapshot),
        state=OrderState.PRICING_REVIEWED,
        discount_eligible_items=discount_eligible_items
    )


@app.post("/api/orders/{order_id}/discounts/request", response_model=DiscountRequestResponse)
async def request_discount(order_id: str, request: DiscountRequest):
    """
    API ENDPOINT 4: Request Discount
    Pre-condition: Order in PRICING_REVIEWED state (before lock)
    Source: PHASE_2_API_SPECIFICATIONS.md
    """
    
    # Fetch order
    order = orders_collection.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Order not found"})
    
    current_state = OrderState(order["state"])
    
    # State validation: Can only request discount in PRICING_REVIEWED
    if current_state != OrderState.PRICING_REVIEWED:
        raise HTTPException(
            status_code=409,
            detail={
                "error": True,
                "reason_code": "INVALID_STATE_FOR_DISCOUNT",
                "message": "Discounts can only be requested in PRICING_REVIEWED state",
                "current_state": current_state.value
            }
        )
    
    # Fetch order item
    order_item = order_items_collection.find_one({"id": request.order_item_id, "order_id": order_id})
    if not order_item:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Order item not found"})
    
    # Get active role
    active_role_id = get_active_role(request.requested_by, order["location_id"])
    
    # Fetch product for category info
    product = products_collection.find_one({"id": order_item["product_id"]})
    if not product:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Product not found"})
    
    category = product.get("category", "UNKNOWN")
    category_classification = CategoryClassification(product.get("category_classification", "MASS"))
    mrp = product.get("mrp", 0.0)
    offer_price = product.get("offer_price", mrp)
    
    # Evaluate discount request (Role × Category × Context)
    status, details = DiscountEnforcementService.evaluate_discount_request(
        requested_discount_percent=request.requested_discount_percent,
        user_id=request.requested_by,
        active_role_id=active_role_id,
        category=category,
        category_classification=category_classification,
        mrp=mrp,
        offer_price=offer_price
    )
    
    # Create discount request record
    discount_request_id = str(uuid4())
    discount_request_doc = {
        "id": discount_request_id,
        "order_id": order_id,
        "order_item_id": request.order_item_id,
        "requested_discount_percent": request.requested_discount_percent,
        "requested_by": request.requested_by,
        "role_id": active_role_id,
        "category": category,
        "category_classification": category_classification.value,
        "role_cap": details.get("role_cap", 0.0),
        "category_cap": details.get("category_cap", 0.0),
        "status": status.value,
        "reason": request.reason,
        "created_at": datetime.utcnow()
    }
    
    discount_requests_collection.insert_one(discount_request_doc)
    
    # If auto-approved, apply discount immediately
    if status == DiscountRequestStatus.AUTO_APPROVED:
        # Apply discount to order_item
        discounted_price = offer_price * (1 - request.requested_discount_percent / 100)
        order_items_collection.update_one(
            {"id": request.order_item_id},
            {"$set": {
                "discount_applied": request.requested_discount_percent,
                "final_price": discounted_price * order_item["quantity"]
            }}
        )
        
        # Emit DISCOUNT_APPLIED event
        AuditService.emit_event(
            event_type=AuditEventType.DISCOUNT_APPLIED,
            entity_type="ORDER_ITEM",
            entity_id=request.order_item_id,
            action="APPLY_DISCOUNT",
            actor_id="system",
            role_context="system",
            trigger_source="SYSTEM",
            previous_state={"discount": 0},
            new_state={"discount": request.requested_discount_percent},
            payload_snapshot={"discount_request_id": discount_request_id}
        )
    
    # Emit audit event
    AuditService.emit_event(
        event_type=AuditEventType.DISCOUNT_REQUESTED,
        entity_type="DISCOUNT_REQUEST",
        entity_id=discount_request_id,
        action="REQUEST",
        actor_id=request.requested_by,
        role_context=active_role_id,
        trigger_source="POS",
        previous_state=None,
        new_state=status.value,
        payload_snapshot={
            "requested_percent": request.requested_discount_percent,
            "role_cap": details.get("role_cap"),
            "category_cap": details.get("category_cap"),
            "enforcement_decision": status.value,
            "details": details
        }
    )
    
    # Response based on status
    if status == DiscountRequestStatus.AUTO_APPROVED:
        return DiscountRequestResponse(
            discount_request_id=discount_request_id,
            status=status,
            approved_discount_percent=request.requested_discount_percent,
            reason="Within role and category limits"
        )
    elif status == DiscountRequestStatus.PENDING_APPROVAL:
        return DiscountRequestResponse(
            discount_request_id=discount_request_id,
            status=status,
            role_cap=details.get("role_cap"),
            category_cap=details.get("category_cap"),
            approver_role_required=details.get("approver_role_required"),
            message=details.get("reason")
        )
    else:  # BLOCKED
        raise HTTPException(
            status_code=403,
            detail={
                "error": True,
                "reason_code": "DISCOUNT_NOT_ELIGIBLE",
                "message": details.get("reason"),
                "details": details
            }
        )


@app.post("/api/discounts/{discount_request_id}/approve", response_model=DiscountApprovalResponse)
async def approve_discount(discount_request_id: str, request: ApproveDiscountRequest, user: Dict[str, Any] = Depends(require_role(["STORE_MANAGER", "AREA_MANAGER", "ADMIN", "SUPERADMIN"]))):
    """
    API ENDPOINT 5: Approve Discount
    Auth: Required (Manager+)
    Source: PHASE_2_API_SPECIFICATIONS.md
    """
    
    # Fetch discount request
    discount_req = discount_requests_collection.find_one({"id": discount_request_id})
    if not discount_req:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Discount request not found"})
    
    # Check status
    if discount_req["status"] != DiscountRequestStatus.PENDING_APPROVAL.value:
        raise HTTPException(
            status_code=409,
            detail={
                "error": True,
                "reason_code": "ALREADY_PROCESSED",
                "message": f"Discount request already {discount_req['status']}"
            }
        )
    
    # Fetch order to check state
    order = orders_collection.find_one({"id": discount_req["order_id"]})
    if order["state"] == OrderState.PRICING_LOCKED.value:
        raise HTTPException(
            status_code=409,
            detail={"error": True, "reason_code": "ORDER_LOCKED", "message": "Cannot approve discount for locked order"}
        )
    
    # TODO: Validate approver authority (simplified for Phase 2)
    # DiscountEnforcementService.validate_approval_authority(approver_role_id, requested_discount_percent)
    
    # Validate approved amount <= requested amount
    if request.approved_discount_percent > discount_req["requested_discount_percent"]:
        raise HTTPException(
            status_code=400,
            detail={"error": True, "reason_code": "APPROVAL_EXCEEDS_REQUEST", "message": "Approved amount cannot exceed requested amount"}
        )
    
    # Validate approval reason exists
    if not request.approval_reason or request.approval_reason.strip() == "":
        raise HTTPException(
            status_code=400,
            detail={"error": True, "reason_code": "MISSING_APPROVAL_REASON", "message": "Approval reason is mandatory"}
        )
    
    # Create approval record
    approval_id = str(uuid4())
    approval_doc = {
        "id": approval_id,
        "discount_request_id": discount_request_id,
        "approved_by": request.approved_by,
        "approver_role_id": "system",  # TODO: Fetch actual role
        "approved_discount_percent": request.approved_discount_percent,
        "approval_reason": request.approval_reason,
        "approved_at": datetime.utcnow()
    }
    
    discount_approvals_collection.insert_one(approval_doc)
    
    # Update discount request status
    discount_requests_collection.update_one(
        {"id": discount_request_id},
        {"$set": {"status": DiscountRequestStatus.APPROVED.value}}
    )
    
    # Apply discount to order_item
    order_item = order_items_collection.find_one({"id": discount_req["order_item_id"]})
    offer_price = order_item.get("offer_price", 0.0)
    discounted_price = offer_price * (1 - request.approved_discount_percent / 100)
    
    order_items_collection.update_one(
        {"id": discount_req["order_item_id"]},
        {"$set": {
            "discount_applied": request.approved_discount_percent,
            "final_price": discounted_price * order_item["quantity"]
        }}
    )
    
    # Emit audit events
    AuditService.emit_event(
        event_type=AuditEventType.DISCOUNT_APPROVED,
        entity_type="DISCOUNT_APPROVAL",
        entity_id=approval_id,
        action="APPROVE",
        actor_id=request.approved_by,
        role_context="system",  # TODO: Fetch actual role
        trigger_source="POS",
        payload_snapshot={
            "discount_request_id": discount_request_id,
            "requested_percent": discount_req["requested_discount_percent"],
            "approved_percent": request.approved_discount_percent,
            "approval_reason": request.approval_reason
        }
    )
    
    AuditService.emit_event(
        event_type=AuditEventType.DISCOUNT_APPLIED,
        entity_type="ORDER_ITEM",
        entity_id=discount_req["order_item_id"],
        action="APPLY_DISCOUNT",
        actor_id="system",
        role_context="system",
        trigger_source="SYSTEM",
        previous_state={"discount": 0},
        new_state={"discount": request.approved_discount_percent},
        payload_snapshot={"discount_approval_id": approval_id}
    )
    
    return DiscountApprovalResponse(
        discount_approval_id=approval_id,
        discount_request_id=discount_request_id,
        status="APPROVED",
        approved_discount_percent=request.approved_discount_percent,
        approved_by=request.approved_by,
        approved_at=approval_doc["approved_at"]
    )


@app.post("/api/discounts/{discount_request_id}/reject", response_model=Dict[str, Any])
async def reject_discount(discount_request_id: str, request: RejectDiscountRequest):
    """
    API ENDPOINT 7: Reject Discount
    Source: PHASE_2_API_SPECIFICATIONS.md
    """
    
    # Fetch discount request
    discount_req = discount_requests_collection.find_one({"id": discount_request_id})
    if not discount_req:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Discount request not found"})
    
    # Check status
    if discount_req["status"] != DiscountRequestStatus.PENDING_APPROVAL.value:
        raise HTTPException(
            status_code=409,
            detail={"error": True, "reason_code": "ALREADY_PROCESSED", "message": f"Discount request already {discount_req['status']}"}
        )
    
    # Fetch order to check state
    order = orders_collection.find_one({"id": discount_req["order_id"]})
    if order["state"] == OrderState.PRICING_LOCKED.value:
        raise HTTPException(
            status_code=409,
            detail={"error": True, "reason_code": "ORDER_LOCKED", "message": "Cannot reject discount for locked order"}
        )
    
    # Validate rejection reason
    if not request.rejection_reason or request.rejection_reason.strip() == "":
        raise HTTPException(
            status_code=400,
            detail={"error": True, "reason_code": "MISSING_REJECTION_REASON", "message": "Rejection reason is mandatory"}
        )
    
    # Update discount request status
    discount_requests_collection.update_one(
        {"id": discount_request_id},
        {"$set": {
            "status": DiscountRequestStatus.REJECTED.value,
            "rejected_by": request.rejected_by,
            "rejection_reason": request.rejection_reason,
            "rejected_at": datetime.utcnow()
        }}
    )
    
    # Emit audit event
    AuditService.emit_event(
        event_type=AuditEventType.DISCOUNT_REJECTED,
        entity_type="DISCOUNT_REQUEST",
        entity_id=discount_request_id,
        action="REJECT",
        actor_id=request.rejected_by,
        role_context="system",  # TODO: Fetch actual role
        trigger_source="POS",
        previous_state=DiscountRequestStatus.PENDING_APPROVAL.value,
        new_state=DiscountRequestStatus.REJECTED.value,
        payload_snapshot={
            "requested_percent": discount_req["requested_discount_percent"],
            "rejection_reason": request.rejection_reason
        }
    )
    
    return {
        "discount_request_id": discount_request_id,
        "status": "REJECTED",
        "rejected_by": request.rejected_by,
        "rejection_reason": request.rejection_reason,
        "rejected_at": datetime.utcnow().isoformat()
    }


@app.post("/api/orders/{order_id}/pricing/lock", response_model=PricingLockResponse)
async def lock_pricing(order_id: str, request: LockPricingRequest):
    """
    API ENDPOINT 7: Lock Pricing
    State transition: PRICING_REVIEWED → PRICING_LOCKED (IRREVERSIBLE)
    Source: PHASE_2_API_SPECIFICATIONS.md
    """
    
    # Fetch order
    order = orders_collection.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Order not found"})
    
    current_state = OrderState(order["state"])
    
    # State validation
    if current_state != OrderState.PRICING_REVIEWED:
        raise HTTPException(
            status_code=409,
            detail={
                "error": True,
                "reason_code": "INVALID_STATE_FOR_LOCK",
                "message": "Order must be in PRICING_REVIEWED state",
                "current_state": current_state.value
            }
        )
    
    # Check for pending discount approvals
    pending_approvals = list(discount_requests_collection.find({
        "order_id": order_id,
        "status": DiscountRequestStatus.PENDING_APPROVAL.value
    }))
    
    if pending_approvals:
        raise HTTPException(
            status_code=409,
            detail={
                "error": True,
                "reason_code": "PENDING_DISCOUNT_APPROVALS",
                "message": "Cannot lock pricing with pending discount approvals",
                "pending_requests": [req["id"] for req in pending_approvals]
            }
        )
    
    # Verify pricing snapshot exists
    pricing_snapshot = order.get("pricing_snapshot")
    if not pricing_snapshot:
        raise HTTPException(
            status_code=400,
            detail={"error": True, "reason_code": "PRICING_NOT_REVIEWED", "message": "Pricing must be reviewed before locking"}
        )
    
    # Lock pricing (IRREVERSIBLE)
    locked_at = datetime.utcnow()
    orders_collection.update_one(
        {"id": order_id},
        {"$set": {
            "state": OrderState.PRICING_LOCKED.value,
            "pricing_locked_at": locked_at,
            "pricing_locked_by": request.locked_by,
            "updated_at": locked_at
        }}
    )
    
    # Emit audit event
    AuditService.emit_event(
        event_type=AuditEventType.PRICING_LOCKED,
        entity_type="ORDER",
        entity_id=order_id,
        action="LOCK_PRICING",
        actor_id=request.locked_by,
        role_context="system",  # TODO: Fetch actual role
        trigger_source="POS",
        previous_state=OrderState.PRICING_REVIEWED.value,
        new_state=OrderState.PRICING_LOCKED.value,
        payload_snapshot=pricing_snapshot
    )
    
    return PricingLockResponse(
        order_id=order_id,
        state=OrderState.PRICING_LOCKED,
        pricing_snapshot=PricingSnapshot(**pricing_snapshot),
        locked_by=request.locked_by,
        locked_at=locked_at,
        immutable=True
    )


if __name__ == "__main__":


# ============================================================================
# PHASE 3A STUB APIs (Read-only, minimal implementation)
# ============================================================================

@app.get("/api/customers")
async def search_customers(search: str = ""):
    """STUB: Customer search (Phase 3A requirement)"""
    customers = list(customers_collection.find({}))
    if search:
        customers = [c for c in customers if search.lower() in c.get("name", "").lower() or search in c.get("mobile", "")]
    return {"customers": customers}


@app.post("/api/customers")
async def create_customer(data: Dict[str, Any]):
    """STUB: Create customer (Phase 3A requirement)"""
    customer_id = str(uuid4())
    customer_doc = {
        "id": customer_id,
        "name": data.get("name"),
        "mobile": data.get("mobile"),
        "email": data.get("email"),
        "created_at": datetime.utcnow()
    }
    customers_collection.insert_one(customer_doc)
    return {"customer_id": customer_id, "name": customer_doc["name"]}


@app.get("/api/customers/{customer_id}/patients")
async def get_customer_patients(customer_id: str):
    """STUB: Get patients for customer (Phase 3A requirement)"""
    patients = list(patients_collection.find({"customer_id": customer_id}))
    return {"patients": patients}


@app.post("/api/patients")
async def create_patient(data: Dict[str, Any]):
    """STUB: Create patient (Phase 3A requirement)"""
    patient_id = str(uuid4())
    patient_doc = {
        "id": patient_id,
        "customer_id": data.get("customer_id"),
        "name": data.get("name"),
        "age": data.get("age"),
        "gender": data.get("gender"),
        "created_at": datetime.utcnow()
    }
    patients_collection.insert_one(patient_doc)
    return {"patient_id": patient_id, "name": patient_doc["name"]}


@app.get("/api/patients/{patient_id}/prescriptions")
async def get_patient_prescriptions(patient_id: str):
    """STUB: Get prescriptions for patient (CRITICAL for optical flow)"""
    prescriptions = list(prescriptions_collection.find({"patient_id": patient_id}))
    return {"prescriptions": prescriptions}


@app.get("/api/products")
async def search_products(category: str = "", search: str = ""):
    """STUB: Product search (Phase 3A requirement)"""
    query = {}
    if category:
        query["category"] = category.upper()
    
    products = list(products_collection.find(query))
    


# ============================================================================
# PHASE 4 APIs — Billing, Payments, Invoice
# ============================================================================

@app.post("/api/bills", response_model=BillResponse, status_code=201)
async def create_bill(request: CreateBillRequest, user: Dict[str, Any] = Depends(require_role(["CASHIER", "STORE_MANAGER", "ADMIN", "SUPERADMIN"]))):
    """
    PHASE 4 API 1: Create Bill
    Entry: order.state == PRICING_LOCKED
    Auth: Required (Cashier+)
    Source: PHASE_4_API_LOCK.md
    """
    
    # Fetch order
    order = orders_collection.find_one({"id": request.order_id})
    if not order:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Order not found"})
    
    current_state = OrderState(order["state"])
    
    # Entry condition: Must be PRICING_LOCKED
    if current_state != OrderState.PRICING_LOCKED:
        # Emit blocking audit event
        AuditService.emit_event(
            event_type=AuditEventType.BILLING_BLOCKED,
            entity_type="ORDER",
            entity_id=request.order_id,
            action="CREATE_BILL_BLOCKED",
            actor_id=request.created_by,
            role_context="system",
            trigger_source="POS",
            payload_snapshot={"current_state": current_state.value, "required_state": "PRICING_LOCKED"}
        )
        
        raise HTTPException(
            status_code=409,
            detail={
                "error": True,
                "reason_code": "BILLING_BEFORE_LOCK",
                "message": "Cannot create bill before pricing is locked",
                "current_state": current_state.value,
                "required_state": "PRICING_LOCKED"
            }
        )
    
    # Check for pending discount approvals
    pending = list(discount_requests_collection.find({"order_id": request.order_id, "status": "PENDING_APPROVAL"}))
    if pending:
        raise HTTPException(
            status_code=409,
            detail={
                "error": True,
                "reason_code": "PENDING_APPROVALS",
                "message": "Cannot create bill with pending discount approvals"
            }
        )
    
    # Generate bill
    bill_id = str(uuid4())
    bill_number = f"BILL-{datetime.utcnow().year}-{str(uuid4())[:6].upper()}"
    
    pricing_snapshot = order.get("pricing_snapshot")
    total_amount = pricing_snapshot.get("grand_total", 0.0)
    
    bill_doc = {
        "id": bill_id,
        "bill_number": bill_number,
        "order_id": request.order_id,
        "total_amount": total_amount,
        "outstanding_balance": total_amount,  # Initially unpaid
        "pricing_snapshot": pricing_snapshot,
        "created_by": request.created_by,
        "created_at": datetime.utcnow()
    }
    
    bills_collection.insert_one(bill_doc)
    
    # Update order state
    orders_collection.update_one(
        {"id": request.order_id},
        {"$set": {"state": OrderState.BILLED.value, "updated_at": datetime.utcnow()}}
    )
    
    # Emit audit event
    AuditService.emit_event(
        event_type=AuditEventType.BILL_CREATED,
        entity_type="BILL",
        entity_id=bill_id,
        action="CREATE",
        actor_id=request.created_by,
        role_context="system",
        trigger_source="POS",
        previous_state=OrderState.PRICING_LOCKED.value,
        new_state=OrderState.BILLED.value,
        payload_snapshot={"bill_number": bill_number, "total_amount": total_amount}
    )
    
    return BillResponse(
        bill_id=bill_id,
        bill_number=bill_number,
        order_id=request.order_id,
        total_amount=total_amount,
        outstanding_balance=total_amount,
        pricing_snapshot=pricing_snapshot,
        created_at=bill_doc["created_at"],
        created_by=request.created_by,
        immutable=True
    )


@app.get("/api/bills/{bill_id}", response_model=BillResponse)
async def get_bill(bill_id: str):
    """PHASE 4 API 2: Get Bill"""
    
    bill = bills_collection.find_one({"id": bill_id})
    if not bill:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Bill not found"})
    
    return BillResponse(
        bill_id=bill["id"],
        bill_number=bill["bill_number"],
        order_id=bill["order_id"],
        total_amount=bill["total_amount"],
        outstanding_balance=bill["outstanding_balance"],
        pricing_snapshot=bill["pricing_snapshot"],
        created_at=bill["created_at"],
        created_by=bill["created_by"],
        immutable=True
    )


@app.post("/api/bills/{bill_id}/payments", response_model=PaymentResponse, status_code=201)
async def record_payment(bill_id: str, request: RecordPaymentRequest):
    """
    PHASE 4 API 3: Record Payment
    Supports partial and mixed payments
    Source: PHASE_4_API_LOCK.md
    """
    
    # Fetch bill
    bill = bills_collection.find_one({"id": bill_id})
    if not bill:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Bill not found"})
    
    outstanding = bill.get("outstanding_balance", 0.0)
    
    # Validate payment amount
    if request.amount > outstanding:
        raise HTTPException(
            status_code=400,
            detail={
                "error": True,
                "reason_code": "PAYMENT_EXCEEDS_OUTSTANDING",
                "message": f"Payment amount {request.amount} exceeds outstanding {outstanding}",
                "outstanding_balance": outstanding
            }
        )
    
    # Record payment
    payment_id = str(uuid4())
    payment_doc = {
        "id": payment_id,
        "bill_id": bill_id,
        "payment_mode": request.payment_mode.value,
        "amount": request.amount,
        "reference": request.reference,
        "collected_by": request.collected_by,
        "collected_at": datetime.utcnow()
    }
    
    payments_collection.insert_one(payment_doc)
    
    # Update outstanding balance
    new_outstanding = outstanding - request.amount
    bills_collection.update_one(
        {"id": bill_id},
        {"$set": {"outstanding_balance": new_outstanding}}
    )
    
    # Emit audit event
    AuditService.emit_event(
        event_type=AuditEventType.PAYMENT_RECORDED,
        entity_type="PAYMENT",
        entity_id=payment_id,
        action="RECORD",
        actor_id=request.collected_by,
        role_context="system",
        trigger_source="POS",
        previous_state={"outstanding": outstanding},
        new_state={"outstanding": new_outstanding},
        payload_snapshot={
            "payment_mode": request.payment_mode.value,
            "amount": request.amount,
            "reference": request.reference
        }
    )
    
    return PaymentResponse(
        payment_id=payment_id,
        bill_id=bill_id,
        payment_mode=request.payment_mode,
        amount=request.amount,
        reference=request.reference,
        collected_by=request.collected_by,
        collected_at=payment_doc["collected_at"],
        outstanding_after_payment=new_outstanding
    )


@app.get("/api/bills/{bill_id}/payments")
async def get_bill_payments(bill_id: str):
    """PHASE 4 API 4: Get All Payments for Bill"""
    
    payments = list(payments_collection.find({"bill_id": bill_id}).sort("collected_at", 1))
    return {"payments": payments}


@app.post("/api/invoices", response_model=InvoiceResponse, status_code=201)
async def generate_invoice(request: GenerateInvoiceRequest):
    """
    PHASE 4 API 5: Generate Invoice
    Requirement: Bill must be fully paid (outstanding == 0)
    Source: PHASE_4_API_LOCK.md
    """
    
    # Fetch bill
    bill = bills_collection.find_one({"id": request.bill_id})
    if not bill:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Bill not found"})
    
    # Check outstanding balance
    outstanding = bill.get("outstanding_balance", 0.0)
    if outstanding > 0.01:  # Allow small rounding difference
        # Emit blocking audit event
        AuditService.emit_event(
            event_type=AuditEventType.INVOICE_BLOCKED,
            entity_type="BILL",
            entity_id=request.bill_id,
            action="INVOICE_GENERATION_BLOCKED",
            actor_id=request.generated_by,
            role_context="system",
            trigger_source="POS",
            payload_snapshot={"outstanding_balance": outstanding}
        )
        
        raise HTTPException(
            status_code=409,
            detail={
                "error": True,
                "reason_code": "OUTSTANDING_BALANCE",
                "message": f"Cannot generate invoice with outstanding balance of ₹{outstanding}",
                "outstanding_balance": outstanding
            }
        )
    
    # Generate invoice
    invoice_id = str(uuid4())
    invoice_number = f"INV-{datetime.utcnow().year}-{str(uuid4())[:8].upper()}"
    
    invoice_doc = {
        "id": invoice_id,
        "invoice_number": invoice_number,
        "bill_id": request.bill_id,
        "issue_date": datetime.utcnow(),
        "total_amount": bill.get("total_amount", 0.0),
        "generated_by": request.generated_by
    }
    
    invoices_collection.insert_one(invoice_doc)
    
    # Update order state to CLOSED
    orders_collection.update_one(
        {"id": bill["order_id"]},
        {"$set": {"state": OrderState.CLOSED.value, "updated_at": datetime.utcnow()}}
    )
    
    # Emit audit event
    AuditService.emit_event(
        event_type=AuditEventType.INVOICE_GENERATED,
        entity_type="INVOICE",
        entity_id=invoice_id,
        action="GENERATE",
        actor_id=request.generated_by,
        role_context="system",
        trigger_source="POS",
        previous_state=OrderState.BILLED.value,
        new_state=OrderState.CLOSED.value,
        payload_snapshot={"invoice_number": invoice_number, "total_amount": invoice_doc["total_amount"]}
    )
    
    return InvoiceResponse(
        invoice_id=invoice_id,
        invoice_number=invoice_number,
        bill_id=request.bill_id,
        issue_date=invoice_doc["issue_date"],
        total_amount=invoice_doc["total_amount"],
        generated_by=request.generated_by,
        immutable=True
    )


@app.get("/api/invoices/{invoice_id}")
async def get_invoice(invoice_id: str):
    """PHASE 4 API 6: Get Invoice"""
    
    invoice = invoices_collection.find_one({"id": invoice_id})
    if not invoice:
        raise HTTPException(status_code=404, detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Invoice not found"})
    
    return invoice


    if search:
        products = [p for p in products if search.lower() in p.get("name", "").lower()]
    
    return {"products": products}


@app.get("/api/discounts/pending")
async def get_pending_discounts():
    """STUB: Get pending discount approvals (Phase 3A requirement)"""
    pending = list(discount_requests_collection.find({"status": "PENDING_APPROVAL"}))
    return {"pending_approvals": pending}


    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)
