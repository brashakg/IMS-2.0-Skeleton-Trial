# ROLE-BASED WORKFLOW CHAINS — IMS 2.0

This document defines **end-to-end operational workflows**
with explicit role authority, transitions, and escalation paths.

NO STEP MAY BE SKIPPED UNLESS EXPLICITLY ALLOWED.

---

## WORKFLOW 1 — SALES → DELIVERY

1. Sales Staff
   - Create order
   - Collect advance (optional)
   - Assign delivery date

2. System
   - Locks pricing
   - Generates order task

3. Store Manager
   - Reviews pending deliveries
   - Assigns fitting / workshop task

4. Workshop Staff
   - Marks job complete

5. System
   - Triggers customer notification
   - Creates delivery follow-up task

6. Sales Staff
   - Delivers order
   - Collects balance
   - Closes order

Escalation:
- Delay > SLA → Store Manager → Area Manager

---

## WORKFLOW 2 — DISCOUNT OVERRIDE

1. Sales Staff
   - Requests override

2. System
   - Blocks transaction
   - Creates approval task

3. Store Manager / Admin
   - Approves or rejects
   - Mandatory justification

4. System
   - Logs audit
   - Continues sale OR blocks permanently

No silent approvals allowed.

---

## WORKFLOW 3 — STOCK ACCEPTANCE

1. HQ
   - Dispatch stock

2. Store Manager
   - Accepts / Escalates mismatch

3. System
   - Locks stock if mismatch
   - Creates task

4. HQ
   - Corrects catalog / pricing / SKU

5. Store Manager
   - Re-accepts

Barcode printing allowed only after acceptance.

---

## WORKFLOW 4 — EXPENSE & ADVANCE

1. Employee
   - Submits expense / advance

2. System
   - Validates eligibility

3. Manager / Finance
   - Approves or rejects

4. System
   - Locks record
   - Updates ledger

Escalation:
- Pending > SLA → Admin → Superadmin

---

## WORKFLOW 5 — CLINICAL PRESCRIPTION

1. Optometrist
   - Conducts test
   - Sets validity

2. System
   - Logs prescription
   - Checks patterns silently

3. Admin (if flagged)
   - Reviews insight
   - No auto-action

Prescription cannot be edited post-sale.

---

## WORKFLOW 6 — TASK ESCALATION

1. Task Created
2. No action → Escalate
3. No resolution → Escalate higher
4. Superadmin sees unresolved chains

Tasks never disappear.

---

END ROLE WORKFLOWS
