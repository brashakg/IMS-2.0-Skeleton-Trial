# CUSTOMER CREDIT ABUSE SIMULATION — IMS 2.0

## Purpose
Prevent misuse of credit customers and silent outstanding buildup.

---

## PATTERN 1 — CREDIT EXTENSION LOOP

Pattern:
- Same customer repeatedly granted credit

Detection:
- Credit frequency + aging

Action:
- Finance alert

---

## PATTERN 2 — DELIVERY BEFORE PAYMENT

Pattern:
- Orders marked delivered without settlement

Detection:
- Status vs payment mismatch

Action:
- Hard flag
- Admin review

---

## PATTERN 3 — PARTIAL PAYMENT ABUSE

Pattern:
- Small advances used to hold expensive stock

Detection:
- Advance-to-total ratio

Action:
- Admin insight

---

## GOVERNANCE
- ❌ No auto blocking
- ✅ Credit discipline visibility
