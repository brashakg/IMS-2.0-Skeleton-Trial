# PHASE 2 — API EXECUTION SPECIFICATIONS
BUILD PASS 6 — PHASE 2 (POS Core)
IMS 2.0 Retail Operating System

---

## API ENDPOINT 1: Create Order

**Endpoint:** `POST /api/orders`

**Purpose:** Initialize new order in CREATED state

**Request Body:**
```json
{
  "customer_id": "UUID (required)",
  "patient_id": "UUID (required)",
  "location_id": "UUID (required)",
  "created_by": "UUID (required, user_id)",
  "notes": "string (optional)"
}
```

**Validation Order:**
1. Validate user_id exists and is active
2. Validate user has role assignment at location_id
3. Validate customer_id exists
4. Validate patient_id exists and belongs to customer_id
5. Validate location_id exists and is active

**Success Response (201 Created):**
```json
{
  "order_id": "UUID",
  "order_number": "string (e.g., BV-2026-0001)",
  "state": "CREATED",
  "created_at": "timestamp",
  "created_by": "UUID"
}
```

**Error Codes:**
- `400` — Missing required fields
  - reason_code: `MISSING_FIELD`
  - message: "Field '{field_name}' is required"
- `404` — Entity not found
  - reason_code: `ENTITY_NOT_FOUND`
  - message: "Customer/Patient/Location not found"
- `403` — Authorization failure
  - reason_code: `ROLE_VIOLATION`
  - message: "User does not have role assignment at this location"
- `409` — Business rule violation
  - reason_code: `PATIENT_CUSTOMER_MISMATCH`
  - message: "Patient does not belong to selected customer"

**Audit Event Emitted:**
```json
{
  "event_type": "ORDER_CREATED",
  "entity_type": "ORDER",
  "entity_id": "order_id",
  "action": "CREATE",
  "previous_state": null,
  "new_state": "CREATED",
  "payload_snapshot": { /* full request */ },
  "role_context": "active_role_id",
  "actor_id": "user_id",
  "trigger_source": "POS",
  "timestamp": "ISO8601"
}
```

---

## API ENDPOINT 2: Attach Order Item

**Endpoint:** `POST /api/orders/{order_id}/items`

**Purpose:** Add item to order with category-driven validation

**Request Body:**
```json
{
  "product_id": "UUID (required)",
  "quantity": "integer (required, min: 1)",
  "prescription_id": "UUID (required if category requires)",
  "attributes": {
    "eye": "string (L/R, for lens)",
    "coating": ["array of coating types"],
    "color_code": "string",
    "size": "string",
    "custom_notes": "string (optional)"
  }
}
```

**Validation Order:**
1. Validate order_id exists
2. **State Check:** order.state in [CREATED, ITEMS_ATTACHED]
3. Validate product_id exists
4. Fetch product.category_id
5. **Category Enforcement:** Validate attributes against CATEGORY_ATTRIBUTE_MODEL
   - Fetch mandatory attributes for category
   - Check all mandatory attributes present in request
6. **Prescription Enforcement (LENS only):**
   - If category requires prescription → validate prescription_id present
   - Validate prescription_id exists
   - Validate prescription.patient_id == order.patient_id
   - Validate prescription.expiry_date > current_date
7. Validate stock availability (Phase 3 dependency - STUB for now)

**Success Response (201 Created):**
```json
{
  "order_item_id": "UUID",
  "order_id": "UUID",
  "product_id": "UUID",
  "category": "string",
  "quantity": 1,
  "unit_price": "decimal",
  "prescription_bound": "boolean",
  "state_transition": "CREATED → ITEMS_ATTACHED (if first item)"
}
```

**Error Codes:**
- `404` — Order or product not found
  - reason_code: `ENTITY_NOT_FOUND`
- `409` — Invalid state
  - reason_code: `INVALID_STATE_TRANSITION`
  - message: "Cannot add items to order in state {current_state}"
- `400` — Missing mandatory attribute
  - reason_code: `CATEGORY_ENFORCEMENT_FAILED`
  - message: "Missing mandatory attribute '{attr_name}' for category {category}"
- `400` — Prescription required
  - reason_code: `PRESCRIPTION_REQUIRED`
  - message: "Prescription required for LENS category"
- `400` — Prescription expired
  - reason_code: `PRESCRIPTION_EXPIRED`
  - message: "Prescription expired on {expiry_date}"
- `409` — Prescription patient mismatch
  - reason_code: `PRESCRIPTION_PATIENT_MISMATCH`
  - message: "Prescription does not belong to order patient"

**Audit Event Emitted:**
```json
{
  "event_type": "ORDER_ITEM_ATTACHED",
  "entity_type": "ORDER_ITEM",
  "entity_id": "order_item_id",
  "action": "CREATE",
  "previous_state": null,
  "new_state": "ATTACHED",
  "payload_snapshot": { /* full request + validation results */ },
  "role_context": "active_role_id",
  "actor_id": "user_id",
  "trigger_source": "POS",
  "timestamp": "ISO8601"
}
```

**State Transition:**
- If order.state == CREATED → update to ITEMS_ATTACHED
- Emit additional audit event: ORDER_STATE_CHANGED

---

## API ENDPOINT 3: Review Pricing

**Endpoint:** `POST /api/orders/{order_id}/pricing/review`

**Purpose:** Compute pricing snapshot (server-side only)

**Request Body:**
```json
{
  "requested_by": "UUID (required, user_id)"
}
```

**Validation Order:**
1. Validate order_id exists
2. **State Check:** order.state == ITEMS_ATTACHED
3. Validate order has at least one order_item
4. **Fetch all order_items** for this order
5. **For each item:**
   - Fetch product pricing (MRP, Offer Price)
   - **MRP vs Offer validation:**
     - If Offer > MRP → HARD BLOCK (return 422)
     - If Offer < MRP → discount_eligible = false
     - If Offer == MRP → discount_eligible = true
   - Compute item total (unit_price × quantity)
6. Compute subtotal (sum of all items)
7. Compute GST breakdown (CGST/SGST/IGST per item)
8. Compute grand total
9. Create immutable pricing_snapshot

**Success Response (200 OK):**
```json
{
  "order_id": "UUID",
  "pricing_snapshot": {
    "items": [
      {
        "order_item_id": "UUID",
        "product_name": "string",
        "category": "string",
        "mrp": "decimal",
        "offer_price": "decimal",
        "quantity": 1,
        "item_total": "decimal",
        "discount_eligible": "boolean",
        "category_discount_cap": "decimal (percentage)"
      }
    ],
    "subtotal": "decimal",
    "gst_breakdown": {
      "cgst": "decimal",
      "sgst": "decimal",
      "igst": "decimal"
    },
    "grand_total": "decimal",
    "computed_at": "timestamp"
  },
  "state": "PRICING_REVIEWED",
  "discount_eligible_items": ["array of order_item_ids"]
}
```

**Error Codes:**
- `404` — Order not found
- `409` — Invalid state
  - reason_code: `INVALID_STATE_TRANSITION`
  - message: "Order must be in ITEMS_ATTACHED state"
- `400` — No items in order
  - reason_code: `ORDER_EMPTY`
  - message: "Cannot review pricing for order with no items"
- `422` — Offer price violation
  - reason_code: `OFFER_PRICE_EXCEEDS_MRP`
  - message: "Item {item_id}: Offer price {offer} exceeds MRP {mrp}"
  - violating_items: ["array of order_item_ids"]

**Audit Event Emitted:**
```json
{
  "event_type": "PRICING_REVIEWED",
  "entity_type": "ORDER",
  "entity_id": "order_id",
  "action": "PRICE_REVIEW",
  "previous_state": "ITEMS_ATTACHED",
  "new_state": "PRICING_REVIEWED",
  "payload_snapshot": { /* pricing_snapshot */ },
  "role_context": "active_role_id",
  "actor_id": "user_id",
  "trigger_source": "POS",
  "timestamp": "ISO8601"
}
```

---

## API ENDPOINT 4: Request Discount

**Endpoint:** `POST /api/orders/{order_id}/discounts/request`

**Purpose:** Request discount on eligible items (pre-lock only)

**Request Body:**
```json
{
  "order_item_id": "UUID (required)",
  "requested_discount_percent": "decimal (required, 0-100)",
  "reason": "string (required)",
  "requested_by": "UUID (required, user_id)"
}
```

**Validation Order:**
1. Validate order_id exists
2. **State Check:** order.state == PRICING_REVIEWED (before lock)
3. Validate order_item_id belongs to order_id
4. Fetch order_item.product_id → product.category_id
5. Fetch product MRP and Offer Price
6. **MRP/Offer Check:**
   - If Offer < MRP → discount_eligible = false → BLOCK
   - If Offer >= MRP → proceed
7. **Role Resolution:** Fetch active role for requested_by
8. **Category Classification:** Fetch category classification (MASS/PREMIUM/LUXURY/SERVICE/NON-DISCOUNTABLE)
9. **Discount Cap Lookup:**
   - Query discount_rules table: role_id × category_classification
   - Get max_discount_percent and approval_required
10. **Enforcement Decision:**
    - If requested <= cap AND !approval_required → AUTO-APPROVED
    - If requested <= cap AND approval_required (luxury) → REQUIRES_APPROVAL
    - If requested > cap → REQUIRES_APPROVAL
    - If category = NON-DISCOUNTABLE → BLOCKED

**Success Response (200 OK - Auto-Approved):**
```json
{
  "discount_request_id": "UUID",
  "status": "AUTO_APPROVED",
  "approved_discount_percent": "decimal",
  "reason": "Within role and category limits"
}
```

**Success Response (202 Accepted - Requires Approval):**
```json
{
  "discount_request_id": "UUID",
  "status": "REQUIRES_APPROVAL",
  "requested_discount_percent": "decimal",
  "role_cap": "decimal",
  "category_cap": "decimal",
  "approver_role_required": "string (e.g., STORE_MANAGER)",
  "message": "Discount exceeds limits, approval required"
}
```

**Error Codes:**
- `404` — Order or item not found
- `409` — Invalid state
  - reason_code: `INVALID_STATE_FOR_DISCOUNT`
  - message: "Discounts can only be requested in PRICING_REVIEWED state"
- `403` — Not discount eligible
  - reason_code: `DISCOUNT_NOT_ELIGIBLE`
  - message: "Item has Offer Price < MRP, no discount allowed"
- `400` — Blocked by category
  - reason_code: `CATEGORY_NON_DISCOUNTABLE`
  - message: "Category {category} does not allow discounts"
- `400` — Missing reason
  - reason_code: `MISSING_FIELD`
  - message: "Reason is mandatory for discount requests"

**Audit Event Emitted:**
```json
{
  "event_type": "DISCOUNT_REQUESTED",
  "entity_type": "DISCOUNT_REQUEST",
  "entity_id": "discount_request_id",
  "action": "REQUEST",
  "previous_state": null,
  "new_state": "AUTO_APPROVED | PENDING_APPROVAL | BLOCKED",
  "payload_snapshot": {
    "order_item_id": "UUID",
    "requested_percent": "decimal",
    "role_cap": "decimal",
    "category_cap": "decimal",
    "enforcement_decision": "string"
  },
  "role_context": "active_role_id",
  "actor_id": "user_id",
  "trigger_source": "POS",
  "timestamp": "ISO8601"
}
```

---

## API ENDPOINT 5: Approve Discount

**Endpoint:** `POST /api/discounts/{discount_request_id}/approve`

**Purpose:** Approve pending discount request

**Request Body:**
```json
{
  "approved_by": "UUID (required, user_id)",
  "approved_discount_percent": "decimal (required, may be <= requested)",
  "approval_reason": "string (required)",
  "approved_at": "timestamp (auto-generated)"
}
```

**Validation Order:**
1. Validate discount_request_id exists
2. Validate discount_request.status == PENDING_APPROVAL
3. **Role Authority Check:**
   - Fetch approver role
   - Validate approver role >= minimum_approver_role (from discount_rules)
4. Validate approved_discount_percent <= requested_discount_percent
5. Validate approval_reason is not empty
6. **Fetch linked order_id** from discount_request
7. **State Check:** order.state == PRICING_REVIEWED (not locked yet)

**Success Response (200 OK):**
```json
{
  "discount_approval_id": "UUID",
  "discount_request_id": "UUID",
  "status": "APPROVED",
  "approved_discount_percent": "decimal",
  "approved_by": "UUID",
  "approved_at": "timestamp"
}
```

**Error Codes:**
- `404` — Discount request not found
- `409` — Already processed
  - reason_code: `ALREADY_PROCESSED`
  - message: "Discount request already approved/rejected"
- `409` — Order locked
  - reason_code: `ORDER_LOCKED`
  - message: "Cannot approve discount for locked order"
- `403` — Insufficient authority
  - reason_code: `INSUFFICIENT_APPROVAL_AUTHORITY`
  - message: "Your role cannot approve discounts of this amount"
- `400` — Approval exceeds request
  - reason_code: `APPROVAL_EXCEEDS_REQUEST`
  - message: "Approved amount cannot exceed requested amount"
- `400` — Missing approval reason
  - reason_code: `MISSING_APPROVAL_REASON`
  - message: "Approval reason is mandatory"

**Audit Events Emitted (2 events):**
1. DISCOUNT_APPROVED
```json
{
  "event_type": "DISCOUNT_APPROVED",
  "entity_type": "DISCOUNT_APPROVAL",
  "entity_id": "discount_approval_id",
  "action": "APPROVE",
  "payload_snapshot": {
    "discount_request_id": "UUID",
    "requested_percent": "decimal",
    "approved_percent": "decimal",
    "approver_role": "string",
    "approval_reason": "string"
  },
  "role_context": "approver_role_id",
  "actor_id": "approved_by",
  "trigger_source": "POS",
  "timestamp": "ISO8601"
}
```

2. DISCOUNT_APPLIED (when applied to pricing)
```json
{
  "event_type": "DISCOUNT_APPLIED",
  "entity_type": "ORDER_ITEM",
  "entity_id": "order_item_id",
  "action": "APPLY_DISCOUNT",
  "previous_state": { "discount": 0 },
  "new_state": { "discount": "approved_percent" },
  "payload_snapshot": {
    "discount_approval_id": "UUID",
    "original_price": "decimal",
    "discounted_price": "decimal"
  },
  "role_context": "system",
  "actor_id": "system",
  "trigger_source": "SYSTEM",
  "timestamp": "ISO8601"
}
```

---

## API ENDPOINT 6: Lock Pricing

**Endpoint:** `POST /api/orders/{order_id}/pricing/lock`

**Purpose:** Lock order pricing (irreversible)

**Request Body:**
```json
{
  "locked_by": "UUID (required, user_id)",
  "lock_reason": "string (optional, for audit)"
}
```

**Validation Order:**
1. Validate order_id exists
2. **State Check:** order.state == PRICING_REVIEWED
3. **Pre-lock Validations:**
   - Fetch all discount_requests for this order
   - Ensure all are in final state (APPROVED, REJECTED, or AUTO_APPROVED)
   - No discount_requests in PENDING_APPROVAL state
4. Validate user has permission to lock pricing
5. **Immutability Enforcement:**
   - Fetch pricing_snapshot from PRICING_REVIEWED step
   - Verify pricing_snapshot exists and is complete

**Success Response (200 OK):**
```json
{
  "order_id": "UUID",
  "state": "PRICING_LOCKED",
  "pricing_snapshot": {
    "items": [ /* array */ ],
    "subtotal": "decimal",
    "total_discount": "decimal",
    "gst_breakdown": { /* object */ },
    "grand_total": "decimal",
    "locked_at": "timestamp"
  },
  "locked_by": "UUID",
  "locked_at": "timestamp",
  "immutable": true
}
```

**Error Codes:**
- `404` — Order not found
- `409` — Invalid state
  - reason_code: `INVALID_STATE_FOR_LOCK`
  - message: "Order must be in PRICING_REVIEWED state"
- `409` — Pending approvals
  - reason_code: `PENDING_DISCOUNT_APPROVALS`
  - message: "Cannot lock pricing with pending discount approvals"
  - pending_requests: ["array of discount_request_ids"]
- `400` — Missing pricing snapshot
  - reason_code: `PRICING_NOT_REVIEWED`
  - message: "Pricing must be reviewed before locking"

**Audit Event Emitted:**
```json
{
  "event_type": "PRICING_LOCKED",
  "entity_type": "ORDER",
  "entity_id": "order_id",
  "action": "LOCK_PRICING",
  "previous_state": "PRICING_REVIEWED",
  "new_state": "PRICING_LOCKED",
  "payload_snapshot": { /* full pricing snapshot */ },
  "role_context": "active_role_id",
  "actor_id": "locked_by",
  "trigger_source": "POS",
  "timestamp": "ISO8601"
}
```

---

## API ENDPOINT 7: Reject Discount

**Endpoint:** `POST /api/discounts/{discount_request_id}/reject`

**Purpose:** Reject pending discount request

**Request Body:**
```json
{
  "rejected_by": "UUID (required, user_id)",
  "rejection_reason": "string (required)"
}
```

**Validation Order:**
1. Validate discount_request_id exists
2. Validate discount_request.status == PENDING_APPROVAL
3. Validate rejected_by has approval authority
4. Validate rejection_reason is not empty
5. Fetch linked order_id
6. **State Check:** order.state == PRICING_REVIEWED (not locked)

**Success Response (200 OK):**
```json
{
  "discount_request_id": "UUID",
  "status": "REJECTED",
  "rejected_by": "UUID",
  "rejection_reason": "string",
  "rejected_at": "timestamp"
}
```

**Error Codes:**
- `404` — Discount request not found
- `409` — Already processed
  - reason_code: `ALREADY_PROCESSED`
- `409` — Order locked
  - reason_code: `ORDER_LOCKED`
- `403` — Insufficient authority
  - reason_code: `INSUFFICIENT_AUTHORITY`
- `400` — Missing rejection reason
  - reason_code: `MISSING_REJECTION_REASON`

**Audit Event Emitted:**
```json
{
  "event_type": "DISCOUNT_REJECTED",
  "entity_type": "DISCOUNT_REQUEST",
  "entity_id": "discount_request_id",
  "action": "REJECT",
  "previous_state": "PENDING_APPROVAL",
  "new_state": "REJECTED",
  "payload_snapshot": {
    "requested_percent": "decimal",
    "rejection_reason": "string",
    "rejected_by_role": "string"
  },
  "role_context": "rejector_role_id",
  "actor_id": "rejected_by",
  "trigger_source": "POS",
  "timestamp": "ISO8601"
}
```

---

## API ENDPOINT 8: Get Order State

**Endpoint:** `GET /api/orders/{order_id}/state`

**Purpose:** Fetch current order state and validation status

**Request:** None (query param only)

**Validation Order:**
1. Validate order_id exists
2. Fetch order.state
3. Fetch validation_status per state

**Success Response (200 OK):**
```json
{
  "order_id": "UUID",
  "state": "string (CREATED | ITEMS_ATTACHED | PRICING_REVIEWED | PRICING_LOCKED)",
  "allowed_actions": ["array of allowed actions for current state"],
  "blocked_actions": ["array of blocked actions with reasons"],
  "pending_approvals": ["array of pending discount_request_ids"],
  "immutable": "boolean (true if PRICING_LOCKED or beyond)"
}
```

**Error Codes:**
- `404` — Order not found

**Audit Event Emitted:**
```json
{
  "event_type": "ORDER_STATE_QUERIED",
  "entity_type": "ORDER",
  "entity_id": "order_id",
  "action": "READ",
  "role_context": "querying_user_role_id",
  "actor_id": "user_id",
  "trigger_source": "POS",
  "timestamp": "ISO8601"
}
```

---

## VALIDATION SUMMARY TABLE

| Endpoint | State Requirement | Category Check | Prescription Check | MRP/Offer Check | Discount Check | Audit Event |
|----------|------------------|----------------|-------------------|----------------|----------------|-------------|
| POST /orders | N/A | No | No | No | No | ORDER_CREATED |
| POST /orders/{id}/items | CREATED or ITEMS_ATTACHED | YES (mandatory attrs) | YES (if LENS) | No | No | ORDER_ITEM_ATTACHED |
| POST /orders/{id}/pricing/review | ITEMS_ATTACHED | No | No | YES (per item) | No | PRICING_REVIEWED |
| POST /orders/{id}/discounts/request | PRICING_REVIEWED | YES (cap lookup) | No | YES (eligibility) | YES (role × category) | DISCOUNT_REQUESTED |
| POST /discounts/{id}/approve | PRICING_REVIEWED | No | No | No | YES (authority) | DISCOUNT_APPROVED |
| POST /discounts/{id}/reject | PRICING_REVIEWED | No | No | No | YES (authority) | DISCOUNT_REJECTED |
| POST /orders/{id}/pricing/lock | PRICING_REVIEWED | No | No | No | YES (all resolved) | PRICING_LOCKED |
| GET /orders/{id}/state | Any | No | No | No | No | ORDER_STATE_QUERIED |

---

## ERROR CODE CATALOG (Phase 2)

| Code | Reason Code | Category | Message Template |
|------|------------|----------|------------------|
| 400 | MISSING_FIELD | Validation | "Field '{field}' is required" |
| 400 | CATEGORY_ENFORCEMENT_FAILED | Category | "Missing mandatory attribute '{attr}' for category {cat}" |
| 400 | PRESCRIPTION_REQUIRED | Clinical | "Prescription required for LENS category" |
| 400 | PRESCRIPTION_EXPIRED | Clinical | "Prescription expired on {date}" |
| 400 | ORDER_EMPTY | Business | "Cannot review pricing for empty order" |
| 400 | MISSING_APPROVAL_REASON | Governance | "Approval reason is mandatory" |
| 403 | ROLE_VIOLATION | Authorization | "User does not have required role" |
| 403 | INSUFFICIENT_APPROVAL_AUTHORITY | Authorization | "Your role cannot approve this discount" |
| 403 | DISCOUNT_NOT_ELIGIBLE | Pricing | "Offer Price < MRP, discount not allowed" |
| 404 | ENTITY_NOT_FOUND | Data | "{entity_type} not found" |
| 409 | INVALID_STATE_TRANSITION | State | "Order in state {state}, action not allowed" |
| 409 | PRESCRIPTION_PATIENT_MISMATCH | Clinical | "Prescription does not belong to patient" |
| 409 | ALREADY_PROCESSED | Business | "Request already processed" |
| 409 | PENDING_DISCOUNT_APPROVALS | State | "Cannot lock with pending approvals" |
| 409 | ORDER_LOCKED | Immutability | "Order is locked, no edits allowed" |
| 422 | OFFER_PRICE_EXCEEDS_MRP | Pricing | "Offer {offer} exceeds MRP {mrp}" |

---

## AUDIT EVENT CATALOG (Phase 2)

| Event Type | Trigger | Entity | Required Fields |
|-----------|---------|--------|----------------|
| ORDER_CREATED | Order creation | ORDER | order_id, state=CREATED |
| ORDER_ITEM_ATTACHED | Item added | ORDER_ITEM | order_item_id, category, prescription_id (if lens) |
| PRICING_REVIEWED | Pricing computed | ORDER | pricing_snapshot |
| DISCOUNT_REQUESTED | Discount request | DISCOUNT_REQUEST | requested_percent, role_cap, category_cap |
| DISCOUNT_APPROVED | Approval granted | DISCOUNT_APPROVAL | approved_by, approval_reason |
| DISCOUNT_REJECTED | Approval denied | DISCOUNT_REQUEST | rejected_by, rejection_reason |
| DISCOUNT_APPLIED | Discount application | ORDER_ITEM | discount_approval_id, discount_percent |
| PRICING_LOCKED | Pricing finalized | ORDER | state=PRICING_LOCKED, pricing_snapshot |
| CATEGORY_ENFORCEMENT_FAILED | Validation failure | ORDER_ITEM | missing_attributes, category |
| DISCOUNT_ENFORCEMENT_FAILED | Discount violation | DISCOUNT_REQUEST | violation_type, limits |
| UNAUTHORIZED_STATE_TRANSITION | State violation | ORDER | attempted_state, current_state |

---

END OF PHASE 2 API SPECIFICATIONS
