# Transaction State Machine & Immutability Rules (IMS 2.0)

STATUS: DESIGN-ONLY (READ-ONLY)
BUILD PASS: 3
STEP: 6
LOCK LEVEL: VERY HIGH (financial + legal integrity)
AUTHORITY: SYSTEM_INTENT.md

---

## PURPOSE

This document defines the **authoritative state machines** and **immutability boundaries**
for:
- Orders
- Bills
- Payments
- Invoices

Its goal is to ensure:
- Predictable system behavior
- Zero silent mutations
- Full auditability
- Legal and financial integrity

NO UI  
NO CODE  
NO CALCULATIONS  
NO BUSINESS RULE RE-DEFINITION  

---

## CORE PRINCIPLE (LOCKED)

> **State progression is irreversible.**  
> Correction happens via **new entities**, never mutation.

---

## 1. ORDER STATE MACHINE

**Entity**
- `orders`

### Allowed States (Sequential)

1. `CREATED`
2. `ITEMS_ATTACHED`
3. `PRICING_REVIEWED`
4. `PRICING_LOCKED`
5. `BILLED`
6. `CLOSED`
7. `CANCELLED` (only before BILLING)

### State Transition Rules

- Items may only be added in `CREATED` or `ITEMS_ATTACHED`
- Pricing actions only allowed in `ITEMS_ATTACHED`
- Discount hooks only fire before `PRICING_LOCKED`
- Order becomes immutable after `BILLED`
- Cancel allowed only before `PRICING_LOCKED`

**Hard Fail Conditions**
- Backward state transition
- Skipping mandatory states
- Item mutation after pricing lock

---

## 2. BILL STATE MACHINE

**Entity**
- `bills`

### Allowed States

1. `GENERATED`
2. `PAYMENT_PENDING`
3. `PARTIALLY_PAID`
4. `PAID`
5. `VOIDED` (admin-only, exceptional)

### Rules

- Bill is generated only from `PRICING_LOCKED` orders
- Bill amounts are immutable post-generation
- Discounts cannot affect bills directly
- Void requires superadmin role and audit reason

---

## 3. PAYMENT STATE MACHINE

**Entity**
- `payments`

### Allowed States

1. `INITIATED`
2. `SUCCESS`
3. `FAILED`
4. `REVERSED` (bank-originated only)

### Rules

- Payment records are append-only
- Failed payments are never overwritten
- Reversals do not delete original payment entries

---

## 4. INVOICE STATE MACHINE

**Entity**
- `invoices`

### Allowed States

1. `ISSUED`
2. `DELIVERED`
3. `ARCHIVED`

### Rules

- Invoice generated only after bill is `PAID`
- Invoice content is immutable
- Corrections handled via credit-note flow (separate system)

---

## 5. IMMUTABILITY BOUNDARIES (CRITICAL)

| Entity | Immutable After |
|------|----------------|
| orders | PRICING_LOCKED |
| order_items | PRICING_LOCKED |
| bills | GENERATION |
| payments | INSERT |
| invoices | ISSUE |

Any attempt to mutate beyond boundary = **hard fail + escalation log**

---

## 6. REVERSALS & CORRECTIONS (DESIGN RULE)

- No entity supports “edit-in-place”
- Corrections are represented by:
  - New rows
  - Linked references
  - Explicit reversal or adjustment entities

Silent correction is forbidden.

---

## 7. AUDIT REQUIREMENTS (MANDATORY)

Each state transition logs:
- entity_type
- entity_id
- previous_state
- new_state
- role_context
- actor_id
- timestamp
- trigger_source (POS / System / Admin)

No deletes. No overwrites.

---

## 8. ENFORCEMENT INTERLOCKS

This state machine is **hard-bound** to:
- POS Optical Flow Data Binding
- Category Enforcement Hooks
- Discount Enforcement Hooks

Any violation blocks downstream progression.

---

## 9. AI GOVERNANCE

AI may:
- Explain current state
- Explain why transition is blocked

AI may NOT:
- Suggest bypasses
- Recommend reversals
- Alter state progression

Superadmin advisory access only.

---

## LOCK NOTE

This document:
- Defines the legal and financial spine of IMS 2.0
- Cannot be bypassed by UI, role, or API
- Is mandatory for audit, taxation, and compliance integrity

Any relaxation requires SYSTEM_INTENT revision.
