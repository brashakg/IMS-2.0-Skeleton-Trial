# FINANCE & ACCOUNTING ENGINE — IMS 2.0

## Purpose
To maintain legally compliant, auditable, locked financial records
across sales, purchases, payroll, expenses, and returns.

Finance is NOT flexible.
Finance is NOT convenient.
Finance is FINAL.

---

## 1. FINANCE ACTORS

- Store Staff → View-only
- Store Manager → Limited view
- Accountant → Processing authority
- Admin → Review authority
- Superadmin → Override authority

---

## 2. FINANCIAL PERIODS

Default:
- Monthly periods

Each period has states:
1. Open
2. Review
3. Locked

Rules:
- Locked periods cannot be edited
- Unlock requires Superadmin + reason
- Unlock is logged permanently

---

## 3. LEDGER SYSTEM

Ledgers:
- Sales Ledger
- Purchase Ledger
- Expense Ledger
- Payroll Ledger
- GST Ledger
- Advance Ledger

Every financial transaction:
→ MUST hit a ledger  
→ MUST have reference  
→ MUST be traceable

No orphan entries allowed.

---

## 4. SALES ACCOUNTING

Sources:
- POS Invoices
- Credit Notes
- Sales Returns

Rules:
- Invoice date defines revenue period
- Discounts logged separately
- GST calculated at invoice level
- Rounding tracked explicitly

---

## 5. PURCHASE ACCOUNTING

Sources:
- Purchase Orders
- GRN
- Vendor Invoices
- Purchase Returns

Rules:
- GRN ≠ Invoice (tracked separately)
- Input GST credit only after invoice confirmation
- Vendor credit notes tracked

---

## 6. EXPENSE ACCOUNTING

Sources:
- Employee expense claims
- Vendor expenses
- Operational expenses

Rules:
- Approval required
- Category mandatory
- Bill upload mandatory (if applicable)
- Expense hits ledger only after approval

---

## 7. ADVANCES & RECOVERY

- Advances logged per employee
- Advance recovery auto-linked to payroll
- Outstanding visible to:
  - Employee
  - Finance
  - Admin
  - Superadmin

No silent adjustments.

---

## 8. GST COMPLIANCE ENGINE

GST tracked for:
- Sales
- Purchases
- Expenses (if applicable)

Features:
- GSTIN validation (Govt API)
- Auto classification (IGST / CGST / SGST)
- Input credit tracking
- Output liability tracking

Period locking applies strictly.

---

## 9. AI ADVISORY (READ-ONLY)

AI can:
- Track GST rule changes
- Detect anomalies
- Suggest accounting adjustments
- Warn of compliance risks

AI cannot:
❌ Post entries  
❌ Edit ledgers  
❌ Unlock periods  

All AI output is advisory only.

---

## 10. AUDIT & TRACEABILITY

Every financial action logs:
- Who
- What
- When
- Why (if override)

Audit logs are immutable.

END FINANCE ENGINE
``
