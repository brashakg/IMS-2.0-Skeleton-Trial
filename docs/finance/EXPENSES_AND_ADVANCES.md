# EXPENSES & ADVANCES — IMS 2.0

## Purpose
To control:
- Employee expenses
- Advance payments
- Reimbursements
- Fraud prevention
- Audit & compliance

This system prioritizes **traceability over convenience**.

---

## 1. EXPENSE TYPES

Expenses are classified as:
- Travel
- Food
- Courier
- Repairs
- Office supplies
- Client-related
- Other (mandatory note required)

Each category has:
- Daily cap
- Monthly cap
- Role-wise eligibility
- Approval chain

Configured by Superadmin.

---

## 2. EXPENSE CREATION FLOW (EMPLOYEE)

Employee can:
- Create expense entry
- Select category (mandatory)
- Upload bill (mandatory unless waived by policy)
- Add notes (mandatory for "Other")
- Submit for approval

Employee CANNOT:
- Edit after submission
- Approve own expense
- See others’ expenses (except subordinates if role allows)

---

## 3. BILL UPLOAD RULES

- Mandatory image/PDF upload
- File hash stored
- Duplicate bill detection (AI-assisted later)
- Bill linked permanently to expense record

No bill deletion allowed after approval.

---

## 4. APPROVAL HIERARCHY

Approval depends on:
- Expense amount
- Expense category
- Employee role

Example:
- Staff → Store Manager → Finance
- Manager → Area Manager → Finance
- HQ Staff → Admin → Finance
- Finance expenses → Admin / Superadmin

Approval chains are configurable but **cannot be bypassed**.

---

## 5. ADVANCE PAYMENTS SYSTEM

Employees may take advances against:
- Salary
- Travel
- Special approval

Advance properties:
- Amount
- Purpose
- Expected settlement date
- Linked future expenses

Visibility:
- Employee (own only)
- Finance
- Admin
- Superadmin

---

## 6. ADVANCE SETTLEMENT RULES

- Advances must be settled via expenses
- Partial settlement allowed
- Outstanding advances block new advances
- Outstanding advances shown on dashboard

---

## 7. AUTO-TRIGGERS

System automatically:
- Flags overdue settlements
- Blocks new advances
- Creates follow-up tasks
- Escalates if unresolved

---

## 8. AUDIT & LOCKING

- Approved expenses cannot be edited
- Paid expenses lock automatically
- Accounting period lock applies

Full audit trail maintained:
- Who created
- Who approved
- When paid
- Any overrides

---

## 9. REPORTING

Available reports:
- Expense by employee
- Expense by category
- Advance outstanding
- Reimbursement aging
- Policy violations

Export requires audit log.

---

## 10. AI ROLE (READ-ONLY)

AI may:
- Detect abnormal patterns
- Flag duplicate bills
- Identify expense abuse trends
- Suggest policy tightening

AI cannot:
- Approve
- Reject
- Modify expenses

---

END OF EXPENSES & ADVANCES
