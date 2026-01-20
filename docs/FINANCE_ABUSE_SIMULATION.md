# FINANCE ABUSE & COMPLIANCE SIMULATION — IMS 2.0

## Purpose
Detect financial leakage, compliance risk, and manipulation
WITHOUT blocking legitimate business operations.

---

## PATTERN 1 — PERIOD HOPPING

Pattern:
- Backdated entries before period lock

Detection:
- Entry timestamp vs period lock delta

Action:
- Hard block
- Audit log entry
- Superadmin visibility

---

## PATTERN 2 — ROUNDING MANIPULATION

Pattern:
- Consistent rounding in favor of customer or staff

Detection:
- Rounding bias analysis

Action:
- Finance dashboard flag
- Pattern trend shown

---

## PATTERN 3 — WRITE-OFF FREQUENCY

Pattern:
- Same store repeatedly writing off small amounts

Detection:
- Write-off clustering

Action:
- Admin visibility
- Task for review

---

## PATTERN 4 — GST MISALIGNMENT

Pattern:
- GST rate mismatches across invoices

Detection:
- SKU GST variance detection

Action:
- Accountant alert
- Lock invoice edit

---

## PATTERN 5 — MANUAL OVERRIDE DEPENDENCY

Pattern:
- Same role repeatedly requesting overrides

Detection:
- Override frequency trend

Action:
- Superadmin insight
- Policy tightening suggestion

---

## GOVERNANCE
- ❌ No auto-punishment
- ❌ No staff alerts
- ✅ Read-only intelligence
- ✅ Compliance-first
