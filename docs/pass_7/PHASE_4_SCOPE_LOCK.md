# Phase 4 Scope Lock — Billing, Payments & Invoice (IMS 2.0)

STATUS: LOCKED
BUILD PASS: 7
PHASE: 4

## PURPOSE
Phase 4 governs billing, payments, and invoice generation
for orders that have reached PRICING_LOCKED state.

No billing action may occur before pricing is locked.

## ENTRY CONDITION
- Order state MUST be PRICING_LOCKED
- No pending discount approvals
- Pricing snapshot immutable

## IN-SCOPE

### Billing
- Bill generation from locked order
- Bill number generation
- Tax breakup display (GST)
- Bill timestamping
- Bill immutability after creation

### Payments
- Payment modes:
  - Cash
  - UPI
  - Card
  - Mixed / partial payments
- Multiple payments per bill allowed
- Outstanding balance tracking
- Payment timestamping
- Payment actor capture

### Invoice
- Invoice generation after full payment
- Invoice number generation
- Invoice PDF / printable artifact
- Invoice immutability
- Invoice reprint allowed (no edits)

### Audit
- All billing actions must emit audit events
- All payment actions must emit audit events
- Invoice generation must emit audit event

## OUT OF SCOPE
- Pricing changes
- Discount changes
- Inventory movement
- Refunds
- Credit notes
- Enquiry conversion
- Reporting
- Accounting exports

## NON-NEGOTIABLE RULES
- No edits after bill creation
- No payments before bill exists
- No invoice before full payment
- No silent adjustments
- Backend authority only
- Frontend is display + trigger only

## FAILURE MODES (MUST BLOCK)
- Attempt to bill before PRICING_LOCKED
- Attempt to edit pricing post-bill
- Attempt to generate invoice before full payment
- Attempt to delete bill or payment

## FUTURE (NOT NOW)
- Refunds
- Credit notes
- Accounting sync
- E-invoicing
