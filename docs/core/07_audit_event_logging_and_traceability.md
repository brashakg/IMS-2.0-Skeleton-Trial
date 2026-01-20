# Audit, Event Logging & Traceability Layer (IMS 2.0)

STATUS: DESIGN-ONLY (READ-ONLY)
BUILD PASS: 3
STEP: 7
LOCK LEVEL: ABSOLUTE (audit & compliance authority)
AUTHORITY: SYSTEM_INTENT.md

---

## PURPOSE

This document defines the **authoritative audit and event logging layer** for IMS 2.0.

Its objectives:
- End-to-end traceability of every critical action
- Zero blind spots across POS, Clinical, Finance, Inventory
- Legal, financial, and operational defensibility
- Post-facto reconstruction of any transaction or abuse attempt

This layer is **mandatory**, **append-only**, and **non-bypassable**.

NO UI  
NO CODE  
NO CALCULATIONS  
NO BUSINESS RULE RE-DEFINITION  

---

## CORE PRINCIPLES (LOCKED)

1. **Everything important is an event**
2. **Events are immutable**
3. **Silence is a violation**
4. **Audit precedes convenience**

---

## EVENT MODEL (AUTHORITATIVE)

**Primary Entity**
- `audit_events`

### Mandatory Fields
- event_id
- event_type
- entity_type
- entity_id
- action
- previous_state (nullable)
- new_state (nullable)
- payload_snapshot (read-only)
- role_context
- actor_id
- trigger_source (POS / API / System / Admin / AI)
- timestamp

No field is optional except where explicitly marked.

---

## EVENT TYPES (NON-EXHAUSTIVE, LOCKED SET)

### Transactional
- ORDER_CREATED
- ORDER_ITEM_ATTACHED
- PRICING_REVIEWED
- DISCOUNT_REQUESTED
- DISCOUNT_APPROVED
- DISCOUNT_REJECTED
- BILL_GENERATED
- PAYMENT_ATTEMPTED
- PAYMENT_SUCCESS
- PAYMENT_FAILED
- INVOICE_ISSUED

### Clinical
- PATIENT_CREATED
- PRESCRIPTION_CREATED
- PRESCRIPTION_LOCKED
- CLINICAL_VALIDATION_FAILED

### Inventory
- STOCK_RESERVED
- STOCK_MOVED
- STOCK_ADJUSTMENT_ATTEMPTED
- INVENTORY_RULE_VIOLATION

### Governance & Abuse
- ROLE_VIOLATION_ATTEMPT
- CATEGORY_ENFORCEMENT_FAILED
- DISCOUNT_ENFORCEMENT_FAILED
- POST_BILL_MUTATION_ATTEMPT
- UNAUTHORIZED_STATE_TRANSITION

### System
- SYSTEM_BLOCK
- SYSTEM_OVERRIDE_ATTEMPT
- AI_READ_EVENT

Event types are **append-only**. Removal requires SYSTEM_INTENT revision.

---

## EVENT GENERATION RULES

An audit event MUST be generated when:
- State changes
- Financial values are proposed, approved, or blocked
- Category or discount enforcement triggers
- Any hard-fail occurs
- Any admin or superadmin action is taken
- AI reads protected data

Failure to emit an event = **system defect**.

---

## PAYLOAD SNAPSHOT RULES

- Payload represents **before/after snapshot references**
- No mutable live pointers
- No recomputation at read time
- Stored payload must be sufficient for forensic review

---

## TRACEABILITY CHAINS

### Mandatory Linkages
- order_id → bill_id → payment_id → invoice_id
- discount_request_id → approval_id → application_id
- patient_id → prescription_id → order_item_id

Every chain must be reconstructible **without inference**.

---

## ROLE & CONTEXT CAPTURE

Each event captures:
- Acting role
- Acting user/system identity
- Effective permissions at time of action

Permission changes after the fact **do not alter historical context**.

---

## RETENTION & ACCESS (DESIGN CONSTRAINT)

- Events are never deleted
- Archival allowed, not destruction
- Read access is role-governed
- Superadmin has full visibility
- AI access = read-only, event-level, supervised

---

## ESCALATION FEEDS

Audit events feed into:
- Abuse simulation engine
- SOP & task escalation system
- Compliance and finance reviews

This document does not define escalation logic, only guarantees **data availability**.

---

## AI GOVERNANCE

AI may:
- Read audit events
- Summarize event sequences
- Explain why an action was blocked

AI may NOT:
- Suppress events
- Reinterpret intent
- Suggest bypass strategies

All AI reads generate `AI_READ_EVENT`.

---

## LOCK NOTE

This document:
- Is the forensic backbone of IMS 2.0
- Overrides convenience, speed, and UI concerns
- Is mandatory for compliance, trust, and scale

Any weakening requires SYSTEM_INTENT revision.
