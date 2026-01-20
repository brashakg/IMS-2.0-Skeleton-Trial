# INVENTORY ABUSE SIMULATION — IMS 2.0

## Purpose
Detect inventory manipulation, negligence, or shortcuts  
WITHOUT accusing staff and WITHOUT auto-blocking operations.

Inventory abuse directly affects:
- Financial accuracy
- Audit integrity
- Shrinkage accountability

This system prioritizes **early visibility over punishment**.

---

## ABUSE PATTERN 1 — PHANTOM STOCK CREATION

Pattern:
- System shows stock available
- Physical audits consistently short

Detection:
- Repeated negative variance across audits
- GRN accepted but no downstream sales movement

Action:
- Silent flag
- Escalation task to Store Manager
- Admin visibility only
- ❌ No auto stock correction

---

## ABUSE PATTERN 2 — UNDER-RECEIVING AT GRN

Pattern:
- GRN accepted with lower quantity than PO
- Same vendor + store pattern repeats

Detection:
- PO vs GRN delta analysis
- Vendor + store correlation over time

Action:
- Mandatory GRN justification
- Task created for HQ Inventory Team
- Pattern surfaced to Admin

---

## ABUSE PATTERN 3 — SELECTIVE BARCODE LOSS

Pattern:
- Missing barcodes only for high-value SKUs

Detection:
- SKU value vs barcode-loss correlation
- Repeat incidents by same location

Action:
- Stock audit forced for category
- No staff-facing alerts
- Admin-only visibility

---

## ABUSE PATTERN 4 — TRANSFER LEAKAGE

Pattern:
- Stock transferred out
- Receiving store reports mismatch repeatedly

Detection:
- Transfer-out vs transfer-in delta tracking
- Courier + store correlation

Action:
- Escalation task
- Courier intelligence attached
- No auto blame assignment

---

## ABUSE PATTERN 5 — ADJUSTMENT MISUSE

Pattern:
- Frequent manual stock adjustments
- Same role / same user

Detection:
- Adjustment frequency threshold
- Adjustment value clustering

Action:
- Adjustment lock (future)
- Superadmin insight only
- Full audit trail exposed

---

## GOVERNANCE RULES

- ❌ No automatic penalties
- ❌ No stock auto-correction
- ❌ No staff notifications
- ✅ Read-only intelligence
- ✅ Human review mandatory

---

END OF INVENTORY ABUSE SIMULATION
