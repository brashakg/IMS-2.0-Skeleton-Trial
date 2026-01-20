from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from datetime import datetime
from enum import Enum
from uuid import UUID, uuid4


# ============================================================================
# ENUMS (State Machines - Phase 2 Scope)
# ============================================================================

class OrderState(str, Enum):
    """Order state machine (Phase 2 scope only)"""
    CREATED = "CREATED"
    ITEMS_ATTACHED = "ITEMS_ATTACHED"
    PRICING_REVIEWED = "PRICING_REVIEWED"
    PRICING_LOCKED = "PRICING_LOCKED"
    # BILLED, CLOSED, CANCELLED are Phase 4 (out of scope)


class DiscountRequestStatus(str, Enum):
    """Discount request states"""
    PENDING_APPROVAL = "PENDING_APPROVAL"
    AUTO_APPROVED = "AUTO_APPROVED"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    BLOCKED = "BLOCKED"


class CategoryClassification(str, Enum):
    """Category classification for discount rules"""
    MASS = "MASS"
    PREMIUM = "PREMIUM"
    LUXURY = "LUXURY"
    SERVICE = "SERVICE"
    NON_DISCOUNTABLE = "NON_DISCOUNTABLE"


class AuditEventType(str, Enum):
    """Audit event types (Phase 2 scope)"""
    ORDER_CREATED = "ORDER_CREATED"
    ORDER_ITEM_ATTACHED = "ORDER_ITEM_ATTACHED"
    PRICING_REVIEWED = "PRICING_REVIEWED"
    DISCOUNT_REQUESTED = "DISCOUNT_REQUESTED"
    DISCOUNT_APPROVED = "DISCOUNT_APPROVED"
    DISCOUNT_REJECTED = "DISCOUNT_REJECTED"
    DISCOUNT_APPLIED = "DISCOUNT_APPLIED"
    PRICING_LOCKED = "PRICING_LOCKED"
    CATEGORY_ENFORCEMENT_FAILED = "CATEGORY_ENFORCEMENT_FAILED"
    DISCOUNT_ENFORCEMENT_FAILED = "DISCOUNT_ENFORCEMENT_FAILED"
    UNAUTHORIZED_STATE_TRANSITION = "UNAUTHORIZED_STATE_TRANSITION"
    ORDER_STATE_QUERIED = "ORDER_STATE_QUERIED"
    POST_LOCK_MUTATION_ATTEMPT = "POST_LOCK_MUTATION_ATTEMPT"
    PRESCRIPTION_VALIDATION_FAILED = "PRESCRIPTION_VALIDATION_FAILED"


# ============================================================================
# REQUEST MODELS
# ============================================================================

class CreateOrderRequest(BaseModel):
    """Request to create new order"""
    customer_id: str
    patient_id: str
    location_id: str
    created_by: str  # user_id
    notes: Optional[str] = None


class AttachOrderItemRequest(BaseModel):
    """Request to attach item to order"""
    product_id: str
    quantity: int = Field(ge=1)
    prescription_id: Optional[str] = None
    attributes: Optional[Dict[str, Any]] = {}


class ReviewPricingRequest(BaseModel):
    """Request to review pricing"""
    requested_by: str  # user_id


class DiscountRequest(BaseModel):
    """Request discount on order item"""
    order_item_id: str
    requested_discount_percent: float = Field(ge=0, le=100)
    reason: str
    requested_by: str  # user_id


class ApproveDiscountRequest(BaseModel):
    """Approve discount request"""
    approved_by: str  # user_id
    approved_discount_percent: float = Field(ge=0, le=100)
    approval_reason: str


class RejectDiscountRequest(BaseModel):
    """Reject discount request"""
    rejected_by: str  # user_id
    rejection_reason: str


class LockPricingRequest(BaseModel):
    """Lock pricing"""
    locked_by: str  # user_id
    lock_reason: Optional[str] = None


# ============================================================================
# RESPONSE MODELS
# ============================================================================

class OrderResponse(BaseModel):
    """Order creation response"""
    order_id: str
    order_number: str
    state: OrderState
    created_at: datetime
    created_by: str


class OrderItemResponse(BaseModel):
    """Order item attachment response"""
    order_item_id: str
    order_id: str
    product_id: str
    category: str
    quantity: int
    unit_price: float
    prescription_bound: bool
    state_transition: Optional[str] = None


class PricingSnapshot(BaseModel):
    """Pricing snapshot (immutable after creation)"""
    items: List[Dict[str, Any]]
    subtotal: float
    gst_breakdown: Dict[str, float]
    grand_total: float
    computed_at: datetime


class PricingReviewResponse(BaseModel):
    """Pricing review response"""
    order_id: str
    pricing_snapshot: PricingSnapshot
    state: OrderState
    discount_eligible_items: List[str]


class DiscountRequestResponse(BaseModel):
    """Discount request response"""
    discount_request_id: str
    status: DiscountRequestStatus
    approved_discount_percent: Optional[float] = None
    role_cap: Optional[float] = None
    category_cap: Optional[float] = None
    approver_role_required: Optional[str] = None
    reason: Optional[str] = None
    message: Optional[str] = None


class DiscountApprovalResponse(BaseModel):
    """Discount approval response"""
    discount_approval_id: str
    discount_request_id: str
    status: str
    approved_discount_percent: float
    approved_by: str
    approved_at: datetime


class PricingLockResponse(BaseModel):
    """Pricing lock response"""
    order_id: str
    state: OrderState
    pricing_snapshot: PricingSnapshot
    locked_by: str
    locked_at: datetime
    immutable: bool = True


class OrderStateResponse(BaseModel):
    """Order state query response"""
    order_id: str
    state: OrderState
    allowed_actions: List[str]
    blocked_actions: List[Dict[str, str]]
    pending_approvals: List[str]
    immutable: bool


class ErrorResponse(BaseModel):
    """Standard error response"""
    error: bool = True
    reason_code: str
    message: str
    details: Optional[Dict[str, Any]] = None


# ============================================================================
# DATABASE MODELS (Document structures)
# ============================================================================

class OrderDocument(BaseModel):
    """Order document (MongoDB)"""
    id: str = Field(default_factory=lambda: str(uuid4()))
    order_number: str
    customer_id: str
    patient_id: str
    location_id: str
    state: OrderState
    created_by: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    pricing_snapshot: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None


class OrderItemDocument(BaseModel):
    """Order item document (MongoDB)"""
    id: str = Field(default_factory=lambda: str(uuid4()))
    order_id: str
    product_id: str
    category: str
    quantity: int
    unit_price: float
    mrp: float
    offer_price: float
    discount_applied: float = 0.0
    final_price: float
    prescription_id: Optional[str] = None
    attributes: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)


class DiscountRequestDocument(BaseModel):
    """Discount request document (MongoDB)"""
    id: str = Field(default_factory=lambda: str(uuid4()))
    order_id: str
    order_item_id: str
    requested_discount_percent: float
    requested_by: str  # user_id
    role_id: str
    category: str
    category_classification: CategoryClassification
    role_cap: float
    category_cap: float
    status: DiscountRequestStatus
    reason: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class DiscountApprovalDocument(BaseModel):
    """Discount approval document (MongoDB)"""
    id: str = Field(default_factory=lambda: str(uuid4()))
    discount_request_id: str
    approved_by: str  # user_id
    approver_role_id: str
    approved_discount_percent: float
    approval_reason: str
    approved_at: datetime = Field(default_factory=datetime.utcnow)


class AuditLogDocument(BaseModel):
    """Audit log document (MongoDB) - Append-only"""
    id: str = Field(default_factory=lambda: str(uuid4()))
    event_type: AuditEventType
    entity_type: str
    entity_id: str
    action: str
    previous_state: Optional[Any] = None
    new_state: Optional[Any] = None
    payload_snapshot: Dict[str, Any]
    role_context: str
    actor_id: str
    trigger_source: str  # POS / SYSTEM / ADMIN
    timestamp: datetime = Field(default_factory=datetime.utcnow)
