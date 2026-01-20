from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import (
    get_database,
    orders_collection,
    order_items_collection,
    discount_requests_collection,
    discount_approvals_collection,
    products_collection,
    customers_collection,
    patients_collection,
    user_roles_collection
)
from models import (
    CreateOrderRequest,
    AttachOrderItemRequest,
    ReviewPricingRequest,
    DiscountRequest,
    ApproveDiscountRequest,
    RejectDiscountRequest,
    LockPricingRequest,
    OrderResponse,
    OrderItemResponse,
    PricingReviewResponse,
    DiscountRequestResponse,
    DiscountApprovalResponse,
    PricingLockResponse,
    OrderStateResponse,
    OrderState,
    DiscountRequestStatus,
    AuditEventType,
    PricingSnapshot,
    CategoryClassification
)
from audit_service import AuditService
from state_machine import StateMachineValidator
from category_enforcement import CategoryEnforcementService
from discount_enforcement import DiscountEnforcementService
from datetime import datetime
from uuid import uuid4
from typing import Dict, Any, List

app = FastAPI(title="IMS 2.0 - Retail Operating System", version="Phase 2")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restrict in production
    allow_credentials=True,
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

@app.post("/api/orders", response_model=OrderResponse)
async def create_order(request: CreateOrderRequest):
    """
    API ENDPOINT 1: Create Order
    State: CREATED
    Source: PHASE_2_API_SPECIFICATIONS.md
    """
    
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
    
    # Validation 3: User has role at location
    active_role_id = get_active_role(request.created_by, request.location_id)
    
    # Create order
    order_id = str(uuid4())
    order_number = generate_order_number()
    
    order_doc = {
        "id": order_id,
        "order_number": order_number,
        "customer_id": request.customer_id,
        "patient_id": request.patient_id,
        "location_id": request.location_id,
        "state": OrderState.CREATED.value,
        "created_by": request.created_by,
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
        actor_id=request.created_by,
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
        created_by=request.created_by
    )


@app.post("/api/orders/{order_id}/items", response_model=OrderItemResponse)
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)
