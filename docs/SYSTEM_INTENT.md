# SYSTEM_INTENT.md
## IMS 2.0 — Retail Operating System (Optical & Lifestyle Retail)

**Status:** LOCKED BASE INTENT  
**Owner:** Superadmin (CEO)  
**Audience:** Emergent AI, Developers, Internal Architects  
**Last Updated:** 2026-01-19

---

## 1. SYSTEM PURPOSE

This software is **NOT a POS**.

It is a **Retail Operating System (ROS)** that governs:
- Inventory
- Sales & POS
- Clinical / Optometry
- HR & Attendance
- Payroll & Incentives
- Finance & Accounting
- Tasks & SOPs
- Compliance (GST, Audit)
- Marketplaces
- Intelligence (Read-only AI)

The system replaces:
- WhatsApp workflows
- Excel sheets
- Manual follow-ups
- Memory-based operations
- Fragmented tools

If a process is not implemented in software, **it does not exist**.

---

## 2. CORE PHILOSOPHY

1. Control > Convenience  
2. Explicit authority > implicit assumptions  
3. Visibility > speed  
4. Auditability > shortcuts  
5. Long-term extensibility without breaking current operations  

No silent defaults.  
No hidden automation.  
No AI execution without approval.

---

## 3. ACTORS & ROLE MODEL

A single user may have **multiple roles**.

### Roles
- Superadmin (CEO)
- Admin (HQ Directors)
- Area Manager
- Store Manager
- Optometrist
- Sales Staff
- Cashier
- Workshop / Fitting Staff
- Catalog Manager (HQ)
- Inventory HQ Team
- Accountant / Finance

### Authority Hierarchy
- Superadmin → absolute authority
- Admin → high authority, limited override
- HQ roles → configuration, pricing, catalog
- Store roles → execution
- Sales / Ops → zero configuration rights

Permissions are:
- Role-based
- Scope-based
- Store-based
- Category-based

Never hardcoded.

---

## 4. APPROVAL, ESCALATION & AUDIT

Every critical action must follow one of:
- Auto-approved
- Role-approved
- Escalated
- Hard-blocked

### Mandatory Audit Logging
- Who
- What
- When
- Where
- Previous value
- New value

No destructive action without trace.

---

## 5. NON-NEGOTIABLE BUSINESS LAWS

### Pricing Logic (Global)
- MRP < Offer Price → **BLOCK**
- MRP > Offer Price → No further discounts
- MRP == Offer Price → Role-based discounts allowed
- Gift Cards allowed in all cases
- Overrides only by HQ roles

### Stock Logic
- Barcodes printed at store level
- Stock accepted only after verification
- Mismatch → escalation mandatory
- Location codes embedded in barcode
- Same SKU must have same price across stores

### GST & Compliance
- GST validation via API
- Locked periods for finance
- Only HQ can unlock
- Exportable to Tally

---

## 6. WORKFLOW INVARIANTS

### POS
- Customer → Patient → Prescription → Product → Payment
- Partial payments allowed
- Credit allowed only for approved customers
- Outstanding tracked automatically

### Inventory
- Central cataloging at HQ
- Store-level acceptance
- Transfers tracked with courier + SLA
- Stock audits mandatory

### Clinical
- Prescription validity controlled by optometrist
- Axis validation enforced
- Clinical data immutable after invoice

### HR
- Attendance
- Leaves
- Late marks
- Incentives
- Salary visibility role-based
- Mobile-first

### Tasks & SOPs
- Role-wise checklists
- Priority-based color coding
- Escalation matrix
- Completion tracking

---

## 7. AI GOVERNANCE (READ-ONLY)

AI is:
- Superadmin-only
- Read-only
- Advisory

AI can:
- Analyze
- Recommend
- Flag
- Propose changes

AI cannot:
- Execute
- Modify data
- Change UI
- Change logic
- Override humans

---

## 8. AI CHANGE PROPOSALS

AI outputs must follow:
- Observation
- Pattern detected
- Risk/Opportunity
- Suggested change
- Impact scope
- Rollback plan

Approval required before any action.

---

## 9. FORBIDDEN BEHAVIORS (HARD STOPS)

- No auto-discounts
- No silent stock edits
- No AI execution
- No cross-store pricing drift
- No deletion without audit
- No bypassing approval chains
- No auto-sync without conflict resolution

---

## 10. VERSIONING & EVOLUTION

- Semantic versioning
- Feature flags
- Role-gated rollout
- Store-wise rollout
- Rollback supported

No breaking changes without migration plan.

---

## 11. EMERGENT BUILD RULES

- Follow this file strictly
- Do not invent features
- Do not simplify workflows
- Do not assume defaults
- Ask if unclear
- Build screen skeletons first
- No sample data
- No logic until approved

---

## 12. FINAL INTERPRETATION CLAUSE

If any ambiguity exists:
- Stop
- Ask Superadmin
- Do not assume

This document overrides:
- Prompts
- Suggestions
- Defaults
- Optimizations

---

**END OF SYSTEM_INTENT.md**
