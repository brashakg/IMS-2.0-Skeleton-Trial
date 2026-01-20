# EXPENSES & ADVANCES ENGINE — IMS 2.0

## Purpose
To track, approve, audit, and reconcile all employee expenses and advances
with full visibility, accountability, and hierarchy-based control.

No cash is invisible.
No reimbursement is informal.
No advance is forgotten.

---

## 1. EXPENSE TYPES

Expense Categories (HQ configurable):
- Travel
- Food
- Local Conveyance
- Client Entertainment
- Repairs & Maintenance
- Office Supplies
- Emergency
- Other (requires mandatory note)

Rules:
- Category mandatory
- "Other" requires explanation
- Amount must be numeric and positive

---

## 2. EXPENSE ATTRIBUTES (MANDATORY)

Every expense entry includes:
- Employee ID
- Store / HQ
- Category
- Amount
- Date of expense
- Bill upload (mandatory unless configured otherwise)
- Notes (conditional)
- Linked task (if generated)
- Approval chain
- Audit trail

---

## 3. BILL UPLOAD SYSTEM

Accepted formats:
- JPG
- PNG
- PDF

Rules:
- One primary bill mandatory
- Multiple attachments allowed
- Timestamp locked
- No replacement after approval (only addendum)

---

## 4. EXPENSE LIFECYCLE

States:
1. Draft
2. Submitted
3. Approved
4. Rejected
5. Paid
6. Closed

Rules:
- Draft visible only to employee
- Submitted locks editing
- Rejected requires reason
- Approved moves to finance queue

---

## 5. ADVANCES SYSTEM

Advance Types:
- Salary Advance
- Travel Advance
- Emergency Advance

Attributes:
- Advance amount
- Date issued
- Issued by
- Recovery mode
- Outstanding balance
- Linked expenses (optional)

Visibility:
- Employee → Own advances only
- Finance/Admin/Superadmin → All

---

## 6. ADVANCE RECOVERY RULES

Recovery Modes:
- Salary deduction
- Expense offset
- Manual settlement

Rules:
- No new advance if outstanding exceeds limit
- Advance aging tracked
- Auto reminders triggered

---

## 7. APPROVAL MATRIX

Expense Approval:
- Staff → Store Manager
- Store Manager → Area Manager
- Area Manager → Admin
- Admin → Superadmin (if threshold crossed)

Advance Approval:
- Staff → Admin
- Admin → Superadmin (mandatory)

Thresholds configurable in Superadmin Settings.

---

## 8. AUTO-GENERATED TASKS

Triggers:
- Expense pending > X days
- Advance not settled > X days
- Missing bill
- Repeated rejections

Tasks generated under Task Engine.

---

## 9. AUDIT & LOCKING

- Approved expenses cannot be edited
- Paid expenses are permanently locked
- Audit logs immutable

---

END EXPENSES ENGINE
