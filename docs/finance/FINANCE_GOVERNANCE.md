# FINANCE GOVERNANCE — IMS 2.0

## Purpose
Ensure **financial correctness, compliance, and audit readiness**
across stores, HQ, and time periods.

Finance is treated as a **regulated system**, not an internal tool.

---

## CORE PRINCIPLES

1. No silent edits
2. No backdated manipulation
3. No bypassing accounting periods
4. Compliance > convenience
5. Human approval always traceable

---

## PERIOD LOCKING

Accounting periods can be:
- Open
- Soft-locked (review mode)
- Hard-locked (final)

Rules:
- Hard-locked periods cannot be edited
- Unlock requires Superadmin approval
- Unlock reason is mandatory
- Unlock creates an audit event

---

## PAYMENT & RECEIPT CONTROLS

- Every receipt linked to:
  - Invoice
  - Payment mode
  - Collector
- Cash mismatches auto-create tasks
- Till closure is mandatory daily

No till closure → escalation.

---

## WRITE-OFF GOVERNANCE

Write-offs require:
- Reason
- Amount
- Approval chain

Threshold-based approvals:
- Small → Admin
- Medium → Finance Head
- Large → Superadmin

No write-off deletion allowed.

---

## GST & TAX COMPLIANCE

- GST calculated at line level
- GST edits blocked post-invoice
- GST reports locked once filed

Mismatch between sales & GST returns:
- Flagged
- Visible to Finance + Superadmin

---

## AUDIT TRAIL (IMMUTABLE)

Every financial mutation logs:
- Who
- When
- What changed
- Previous value
- Reason

Audit logs cannot be deleted.

---

END OF FINANCE GOVERNANCE
