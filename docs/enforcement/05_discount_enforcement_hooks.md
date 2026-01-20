# Discount Enforcement Hooks (IMS 2.0)

STATUS: DESIGN-ONLY
BUILD PASS: 3
STEP: 5
LOCK LEVEL: VERY HIGH
AUTHORITY: SYSTEM_INTENT.md

---

## PURPOSE

Discounts are controlled financial events.
All discount activity is logged and bounded.

---

## CORE RULES

- Discounts do not edit prices
- Every attempt is recorded
- Approval is bounded, not absolute

---

## ENFORCEMENT POINTS

### REQUEST
Entity: `discount_requests`

Rules:
- Role must be permitted
- Category eligibility checked

---

### PRE-CHECK
Entities: `orders`, `order_items`

Rules:
- Max limits enforced
- Stack rules validated

---

### APPROVAL
Entity: `discount_approvals`

Rules:
- Role authority checked
- Single approval only

---

### APPLICATION
Entity: `discount_applications`

Rules:
- Approved value only
- Applied during pricing lock

---

### POST-BILL
Entity: `bills`

Rules:
- Discounts forbidden
- Credit-note flow only

---

## AUDIT

Every step logged.
No deletes. No edits.

---

## AI GOVERNANCE

AI is explanatory only.

---

LOCKED.
