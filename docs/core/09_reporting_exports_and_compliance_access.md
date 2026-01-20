# Reporting, Exports & Compliance Data Access (IMS 2.0)

STATUS: DESIGN-ONLY (READ-ONLY)
BUILD PASS: 3
STEP: 9
LOCK LEVEL: VERY HIGH (compliance & external exposure)
AUTHORITY: SYSTEM_INTENT.md

---

## PURPOSE

This document defines the **authoritative data access layer** for:
- Internal reports
- Financial and clinical exports
- Compliance, audit, and statutory access
- Management and regulator-facing views

This layer is:
- STRICTLY read-only
- NON-MUTATIVE
- FULLY AUDITABLE

NO UI  
NO CODE  
NO CALCULATIONS  
NO BUSINESS RULE RE-DEFINITION  

---

## CORE PRINCIPLES (LOCKED)

1. **Reports never change data**
2. **Exports are snapshots, not live feeds**
3. **Access is role-bound and purpose-bound**
4. **Every export is auditable**

---

## REPORTING DOMAINS

### 1. SALES & FINANCIAL

**Source Entities**
- orders
- order_items
- bills
- payments
- invoices
- discount_applications

**Examples**
- Daily sales summary
- Category-wise revenue
- Discount usage reports
- Payment failure analysis

Rules:
- Derived from immutable records
- No recalculation of historical values
- Uses stored snapshots only

---

### 2. CLINICAL & OPTICAL

**Source Entities**
- patients
- prescriptions
- order_items (clinical categories)

Examples:
- Prescription counts
- Expiry tracking
- Clinical compliance summaries

Rules:
- Personally identifiable data masked by default
- Full access restricted to clinical roles only

---

### 3. INVENTORY

**Source Entities**
- inventory_movements
- products
- categories

Examples:
- Stock aging
- Loss and adjustment reports
- Category-wise stock valuation

Rules:
- Inventory reports cannot trigger stock changes
- Historical movement preserved

---

### 4. GOVERNANCE & ABUSE

**Source Entities**
- audit_events
- discount_requests
- approvals
- enforcement violations

Examples:
- Abuse attempt summaries
- Role violation frequency
- Override usage reports

Rules:
- Superadmin access only
- No redaction allowed

---

## EXPORT MODEL (AUTHORITATIVE)

**Primary Entity**
- `data_exports`

### Mandatory Fields
- export_id
- export_type
- requested_by
- role_context
- scope_definition
- generated_at
- format (CSV / PDF / JSON)
- checksum
- delivery_method

Exports are immutable once generated.

---

## EXPORT RULES

- Exports are point-in-time snapshots
- No background mutation or sync
- No live database connections allowed
- Each export tied to a declared purpose

Unauthorized export attempt = hard fail + escalation.

---

## ACCESS CONTROL

Access determined by:
- role
- permission
- declared purpose
- data sensitivity level

Most restrictive rule applies.

Temporary access must:
- Have expiry
- Be logged
- Be non-renewable without review

---

## AUDIT REQUIREMENTS

Every report view or export logs:
- user_id
- role_context
- data_domain
- scope
- timestamp
- delivery_outcome

Exports are traceable back to:
- underlying entities
- approval (if required)

---

## AI GOVERNANCE

AI may:
- Summarize reports
- Explain trends from exported data
