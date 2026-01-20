# PAYROLL ENGINE — IMS 2.0

## Purpose
To calculate salaries, deductions, incentives, advances, and payouts
in a predictable, auditable, rule-based manner.

This system must:
- Be transparent to employees
- Be locked against manipulation
- Be compliant with statutory norms
- Feed Finance without rework

---

## 1. PAYROLL ACTORS

- Employee (view-only)
- Store Manager (view team summary)
- HR / Finance (process & approve)
- Admin / Superadmin (configure & override)

---

## 2. PAYROLL CYCLE

Default cycle:
- Monthly (configurable)

Stages:
1. Attendance Freeze
2. Leave Finalization
3. Incentive Lock
4. Advance Adjustment
5. Payroll Calculation
6. Review
7. Approval
8. Payslip Generation
9. Payment Posting

Each stage has:
- Status
- Owner
- SLA
- Audit trail

---

## 3. SALARY STRUCTURE (CONFIGURABLE)

Components:
- Basic
- HRA
- Conveyance
- Other Allowances
- Statutory Deductions (PF / ESI if applicable)
- Professional Tax (if applicable)
- Advances Recovery
- Incentives (variable)

Salary structure is:
- Role-based
- Store-based
- Employee-specific overrides allowed (Admin only)

---

## 4. ATTENDANCE IMPACT LOGIC

Attendance directly affects:
- Payable days
- Leave deductions
- Late mark penalties

Rules:
- Late marks beyond threshold → auto deduction
- Absence without leave → full-day deduction
- Half-day → partial deduction

All rules configurable via Superadmin Settings.

---

## 5. LEAVE IMPACT LOGIC

- Paid Leave → No deduction
- Unpaid Leave → Deduction
- Sick Leave → Policy-based handling

Leave rules auto-applied once leave is approved.

---

## 6. INCENTIVES CALCULATION

### 6.1 Incentive Sources
- POS Sales
- Targets
- Category performance
- Campaign bonuses

### 6.2 Incentive Rules
- Defined by Superadmin
- Category-wise
- Role-wise
- Store-wise
- Time-bound

Once incentive cycle is locked:
❌ No manual edits allowed

---

## 7. ADVANCE ADJUSTMENT

- Outstanding advances auto-deducted
- Partial recovery allowed
- Recovery schedule visible to employee

No silent deductions.

---

## 8. PAYROLL REVIEW & APPROVAL

- HR reviews individual payroll
- Finance verifies totals
- Admin approves batch
- Superadmin override available (logged)

---

## 9. PAYSLIPS

Payslip includes:
- Earnings breakup
- Deductions breakup
- Incentives
- Advance recovery
- Net payable

Employee can:
- View
- Download

Cannot edit.

---

## 10. PAYROLL AUDIT LOG

Every payroll run logs:
- Inputs used
- Rules applied
- Approvals
- Overrides

Immutable after final approval.

END PAYROLL ENGINE
