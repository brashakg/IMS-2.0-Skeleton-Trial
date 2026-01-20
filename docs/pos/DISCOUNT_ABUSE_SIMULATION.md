# DISCOUNT ABUSE SIMULATION — IMS 2.0

## Purpose
Define how the system **detects, prevents, and escalates discount abuse**
WITHOUT accusing staff or blocking genuine sales.

---

## ABUSE PATTERN 1 — NEAR-LIMIT DISCOUNTS

Pattern:
- Staff repeatedly gives discounts at 9.8% when cap is 10%

Detection:
- Frequency tracking
- Pattern clustering

Action:
- Silent flag
- Visible to Admin & Superadmin only
- AI Insight generated (read-only)

---

## ABUSE PATTERN 2 — CATEGORY HOPPING

Pattern:
- Discount given on accessories to compensate blocked discount on luxury frames

Detection:
- Cross-line discount analysis

Action:
- Highlight order
- Require manager justification if repeated

---

## ABUSE PATTERN 3 — SAME CUSTOMER LOOP

Pattern:
- Same customer receives repeated special discounts

Detection:
- Customer + staff + time correlation

Action:
- Alert Admin
- AI suggests review

---

## ABUSE PATTERN 4 — TIME-BASED ANOMALY

Pattern:
- High discounts near closing time

Detection:
- Time window analysis

Action:
- Task created for Store Manager
- No auto-block

---

## ABUSE PATTERN 5 — APPROVAL MISUSE

Pattern:
- Same approver approving same staff repeatedly

Detection:
- Approval graph analysis

Action:
- Escalation to Superadmin
- Audit log surfaced

---

## IMPORTANT GOVERNANCE RULES

- ❌ No automatic punishment
- ❌ No auto-blocking sales
- ❌ No staff-facing alerts
- ✅ Read-only intelligence
- ✅ Human decision always final

---

END OF DISCOUNT ABUSE SIMULATION
