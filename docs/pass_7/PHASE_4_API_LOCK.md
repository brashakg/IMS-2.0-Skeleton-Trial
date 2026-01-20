# Phase 4 API Lock — Billing, Payments & Invoice (IMS 2.0)

STATUS: LOCKED
BUILD PASS: 7
PHASE: 4

## ENTRY REQUIREMENT
All Phase 4 APIs require:
- order.state == PRICING_LOCKED
- pricing_snapshot immutable
- no pending discount approvals

## LOCKED APIS

### 1. Create Bill
POST /api/bills

Input:
- order_id

Behavior:
- Validates order state
- Generates bill_id and bill_number
- Copies pricing_snapshot
- Marks bill as immutable

Failures:
- Order not PRICING_LOCKED → BLOCK

---

### 2. Get Bill
GET /api/bills/{bill_id}

Returns:
- bill details
- pricing snapshot
- payment status

---

### 3. Record Payment
POST /api/bills/{bill_id}/payments

Input:
- payment_mode (cash | upi | card)
- amount
- reference (optional)

Behavior:
- Allows partial payments
- Updates outstanding balance

Failures:
- Bill not found
- Amount exceeds outstanding

---

### 4. Get Payments
GET /api/bills/{bill_id}/payments

---

### 5. Generate Invoice
POST /api/invoices

Input:
- bill_id

Behavior:
- Allowed only if outstanding == 0
- Generates invoice_id and invoice_number
- Invoice immutable

Failures:
- Outstanding balance > 0 → BLOCK

---

## NON-NEGOTIABLE RULES
- No edits after bill creation
- No deletion of bill, payment, or invoice
- No pricing mutation
- Backend authority only

## AUDIT (MANDATORY)
Audit events required:
- BILL_CREATED
- PAYMENT_RECORDED
- INVOICE_GENERATED
- BILLING_BLOCKED
