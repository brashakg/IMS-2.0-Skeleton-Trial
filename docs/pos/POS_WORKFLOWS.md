# POS WORKFLOWS — IMS 2.0

## Purpose
Defines **real-world POS flows** exactly as they happen in-store.
No shortcuts. No hidden automation.

---

## FLOW 1 — WALK-IN CUSTOMER SALE

1. Customer walks in
2. Sales selects / creates customer
3. Patient selected / added
4. Product selection begins
5. Price logic applied automatically
6. Discount attempted
   - If within authority → allowed
   - If exceeded → approval required or blocked
7. Advance / full payment taken
8. Order saved
9. Order status = "In Progress"

---

## FLOW 2 — ADVANCE + DELIVERY PAYMENT

1. Order created with advance
2. Outstanding amount tracked
3. Reminder tasks auto-created
4. Delivery blocked if:
   - Outstanding unpaid
   - Mandatory checks incomplete
5. Final payment received
6. Invoice generated

---

## FLOW 3 — DISCOUNT OVERRIDE

1. Staff attempts excess discount
2. System blocks action
3. Approval request created
4. Approver notified
5. Approval / rejection logged
6. Only after approval can order proceed

---

## FLOW 4 — LUXURY PRODUCT SALE

1. Luxury flag detected
2. Discount caps auto-reduced
3. Additional approval thresholds applied
4. Enhanced logging enabled

---

## FLOW 5 — GIFT CARD REDEMPTION

1. Gift Card applied
2. Balance verified
3. Remaining balance updated
4. Linked permanently to order

---

## FLOW 6 — ABUSE DETECTION (PASSIVE)

System tracks:
- Repeated near-limit discounts
- Same staff + same pattern
- Time-based anomalies

Alerts visible ONLY to:
- Admin
- Superadmin
- AI Intelligence (read-only)

---

END OF POS WORKFLOWS
