# Phase 2 — POS Core Coding Scope (IMS 2.0)

STATUS: CODING-AUTHORIZED
BUILD PASS: 6
PHASE: 2
LOCK LEVEL: VERY HIGH
AUTHORITY: SYSTEM_INTENT.md + PASSES 3, 4, 5, 6

---

## PURPOSE

This document authorizes and constrains **Phase 2 coding** for IMS 2.0.

Phase 2 implements the **POS transactional core**:
- Order lifecycle
- Item attachment
- Pricing computation
- Discount enforcement
- Pricing lock

Nothing outside this scope is allowed.

---

## ALLOWED ENTITIES (BEHAVIOR ENABLED)

- orders
- order_items
- discount_requests
- discount_approvals
- discount_applications

(No new entities may be introduced.)

---

## ORDER STATE MACHINE (MANDATORY)

Allowed states:

- CREATED
- ITEMS_ATTACHED
- PRICING_REVIEWED
- PRICING_LOCKED

Rules:
- Transitions must be explicit
- Backward transitions forbidden
- Skipping states forbidden
- Every transition emits an audit event

---

## ITEM ATTACHMENT RULES

Allowed actions:
- Attach items to orders in CREATED or ITEMS_ATTACHED state

Mandatory enforcement:
- Category attribute validation
- Clinical categories require prescription reference
- Attribute payload must conform to CATEGORY_ATTRIBUTE_MODEL

Failure behavior:
- Hard fail
- No partial writes
- Audit event mandatory

---

## PRICING COMPUTATION RULES

Pricing is:
- Server-side only
- Computed, never edited
- Stored as immutable snapshot

Pricing allowed only when:
- Order is in ITEMS_ATTACHED state

UI must never send:
- Final price
- Tax totals
- Discounted totals

---

## DISCOUNT ENFORCEMENT RULES

Allowed:
- Discount request
- Discount evaluation
- Discount approval binding

Constraints:
- Must follow DISCOUNT_LOGIC_BY_CATEGORY
- Role authority checked
- Discounts apply only before PRICING_LOCKED

Approved discounts are:
- Bounded
- Audited
- Non-editable post-application

---

## PRICING LOCK (HARD BOUNDARY)

Transition to PRICING_LOCKED:
- Freezes order_items
- Freezes pricing snapshot
- Freezes discount application

Post-lock:
- No edits
- No recalculation
- No overrides

Violations must hard-fail and audit.

---

## AUDIT REQUIREMENTS

The following MUST emit audit events:
- Order creation
- Item attachment
- Item rejection
- Pricing computation
- Discount request
- Discount approval / rejection
- Pricing lock
- Invalid transition attempt

Missing audit = invalid implementation.

---

## EXPLICITLY OUT OF SCOPE

Do NOT implement:
- Billing
- Payments
- Invoicing
- Inventory movement
- Prescription creation
- Reporting
- UI rendering logic

Stub or block instead.

---

## COMPLETION GATE

Phase 2 is complete only if:
- State machine is enforced
- Category enforcement blocks invalid items
- Pricing cannot be client-edited
- Discounts cannot bypass limits
- Pricing lock is irreversible
- All actions are audited

---

LOCKED.
