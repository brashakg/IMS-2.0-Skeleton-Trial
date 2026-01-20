# FINANCE GOVERNANCE & PERIOD LOCKING ENGINE — IMS 2.0
Retail Operating System (Not Accounting Software)

## Purpose
To ensure **financial truth, compliance, and audit safety** across stores, HQ, and time.

This engine governs:
- Revenue recognition
- Discounts & overrides
- Expenses & advances
- GST & statutory compliance
- Period locking
- Human accountability

**Principle:**  
Money can move forward.  
History cannot move backward.

---

## CORE FINANCIAL PRINCIPLES

1. Every rupee must have a source  
2. Every adjustment must have authority  
3. Every period must close  
4. Closed periods never reopen silently  
5. Compliance > convenience > speed  

---

## FINANCIAL PERIODS

### Period Types
- Daily (Till closure)
- Monthly (Accounting period)
- Statutory (GST / Compliance)

Each period stores:
- Start date  
- End date  
- Lock status  
- Locked-by role  
- Lock timestamp  

---

## PERIOD LOCKING RULES

### Automatic Locks
System auto-locks:
- Till after daily close
- Expense records after payout
- Advances after settlement
- Invoices after GST filing window

### Manual Locks
Initiated by:
- Accountant
- Admin
- Superadmin

Once locked:
- ❌ No edits  
- ❌ No deletions  
- ❌ No backdated entries  

---

## OVERRIDE RULES (STRICT)

Overrides are allowed only when:
- Reason is mandatory
- Supporting document uploaded
- Authority explicitly approves

Override visibility:
- Always visible to Superadmin
- Logged permanently

Overrides never erase history.

---

## DISCOUNT GOVERNANCE (FINANCE VIEW)

### Discount Categories
- Role-based
- Category-based
- Product-tier-based (Luxury / Regular)
- Campaign-based

### Financial Controls
- Discounts beyond role limit trigger:
  - Approval workflow
  - Finance visibility
  - Audit flag

### Hard Pricing Rules
- Offer Price < MRP  
  → No further discounts allowed  
- Offer Price = MRP  
  → Role-based discounts allowed  
- Offer Price > MRP  
  → ❌ Block transaction (never allowed)

Gift Cards:
- Allowed in all cases
- Logged separately for liability tracking

---

## GST & STATUTORY COMPLIANCE

### GST Handling
- Store-wise GST registration
- Invoice locks post filing
- Credit/Debit note linkage mandatory

### Government API Usage
- GSTIN validation
- Status verification
- Registration state check

Failures:
- Block invoice generation
- Create compliance task
- Escalate to Finance + Admin

---

## FINANCIAL TASK AUTO-GENERATION

System auto-creates tasks when:
- Till mismatch occurs
- Discount override used
- Expense violates policy
- Advance overdue
- GST filing window breached

Tasks:
- Cannot be deleted
- Cannot be hidden
- Follow escalation ladder

---

## AI ROLE (READ-ONLY)

AI may:
- Detect abnormal discount usage
- Spot revenue leakage
- Identify compliance risk
- Suggest policy tightening
- Monitor regulatory changes

AI cannot:
- Modify data
- Approve actions
- Unlock periods
- Execute changes

All AI insights are:
- Read-only
- Superadmin visible
- Logged

---

## AUDIT & LEGAL SAFETY

- Immutable transaction history
- Role-tagged approvals
- Timestamped actions
- Exportable audit trails (with permission)

---

## FAILURE MODE SIMULATIONS

### Pattern 1 — Backdated Entry Attempt
Action:
- Block entry
- Raise audit alert

### Pattern 2 — Repeated Overrides
Action:
- Flag pattern
- Superadmin visibility

### Pattern 3 — Silent Period Drift
Action:
- Auto-lock
- Compliance escalation

---

## GOVERNANCE GUARANTEES

- ❌ No silent edits
- ❌ No hidden write-offs
- ❌ No bypassing finance
- ✅ Full traceability
- ✅ Human override allowed, never invisible

---

END OF FINANCE GOVERNANCE
