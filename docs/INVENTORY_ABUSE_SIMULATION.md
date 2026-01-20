# INVENTORY ABUSE & STOCK GOVERNANCE — IMS 2.0
Retail Operating System (Stock Integrity Layer)

## Purpose
To detect, prevent, and surface **stock misuse, manipulation, and leakage**
WITHOUT blaming staff or blocking operations.

Inventory errors are treated as **process failures first**, not people failures.

---

## CORE PRINCIPLES

1. Stock must always have a physical explanation
2. No silent adjustments
3. Every movement leaves a trail
4. Ownership ≠ authority
5. Visibility before enforcement

---

## ABUSE PATTERN 1 — REPEATED STOCK MISMATCH

Pattern:
- Same store or staff repeatedly reports shortages during audits

Detection:
- Audit delta clustering by store / staff / category

Action:
- Auto-task to Store Manager
- Pattern visibility to Admin & Superadmin
- No direct accusation

---

## ABUSE PATTERN 2 — SELECTIVE ACCEPTANCE

Pattern:
- Store accepts stock selectively while escalating specific SKUs repeatedly

Detection:
- GRN vs escalation frequency analysis

Action:
- Highlight to HQ Inventory Team
- Require photographic verification
- Escalation ladder activated if repeated

---

## ABUSE PATTERN 3 — BARCODE SWAPPING / RELABELING

Pattern:
- Frequent barcode reprints on same SKUs

Detection:
- Barcode regeneration frequency tracking
- Location change correlation

Action:
- Admin visibility
- Store-level audit suggestion
- No auto-block

---

## ABUSE PATTERN 4 — STAFF-ASSIGNED STOCK LOSS

Pattern:
- Same staff repeatedly loses assigned stock

Detection:
- Staff-stock responsibility mapping
- Loss ratio threshold

Action:
- Task created
- Review assignment practices
- Training suggestion

---

## ABUSE PATTERN 5 — TRANSFER LOOPING

Pattern:
- Same SKUs transferred multiple times between stores

Detection:
- Transfer loop graph detection

Action:
- Admin alert
- Inventory optimization suggestion
- No transfer block

---

## ABUSE PATTERN 6 — NON-MOVING STOCK IGNORANCE

Pattern:
- Old stock repeatedly skipped during audits or transfers

Detection:
- Age + audit + movement correlation

Action:
- Auto-task for liquidation / transfer
- Superadmin insight

---

## GOVERNANCE RULES

- ❌ No auto stock write-offs
- ❌ No silent quantity changes
- ❌ No staff-facing abuse alerts
- ✅ All patterns are read-only
- ✅ Human investigation required

---

## AI ROLE (READ-ONLY)

AI may:
- Surface abnormal patterns
- Suggest audit focus areas
- Recommend redistribution

AI may NOT:
- Modify stock
- Block transfers
- Assign blame

---

END OF INVENTORY ABUSE SIMULATION
