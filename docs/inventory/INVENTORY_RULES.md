# INVENTORY RULES — IMS 2.0

## Purpose
This document defines **non-negotiable inventory laws** governing stock creation, movement, visibility, accountability, and audit.

Inventory is the **financial spine** of the retail operating system.
No silent adjustments. No informal movement. No orphan stock.

---

## 1. PRODUCT CREATION AUTHORITY

Only **HQ Catalog Manager / Admin / Superadmin** can:
- Create new SKUs
- Edit MRP / Offer Price
- Assign categories
- Flag luxury products
- Activate products for stores

Stores:
- ❌ Cannot create products
- ❌ Cannot edit pricing
- ❌ Cannot change SKU attributes

---

## 2. SKU IDENTITY & UNIQUENESS

Each SKU is defined by:
- Brand
- Model Number
- Variant attributes (color, size, power, etc.)

Rules:
- Same SKU = same MRP & Offer across ALL stores
- SKU identity is global, not store-specific
- Price inconsistency across stores is **not allowed**

---

## 3. BARCODE GOVERNANCE

### Barcode Creation
- Barcodes are printed **ONLY at store level**
- Barcode is generated AFTER:
  - HQ catalog approval
  - Stock receipt confirmation

### Barcode Contains:
- SKU ID
- Store Code
- Placement Location Code (e.g., C1, S3, W2)
- Optional QR payload (invoice / tracking / prescription)

### Barcode Reprint Rules
- Store Manager can reprint if:
  - Location changes
  - Display refreshed
- Every reprint is logged

---

## 4. STOCK RECEIPT & ACCEPTANCE

### Flow:
1. HQ catalogs product
2. Stock shipped to store
3. Store Manager receives stock
4. Store Manager verifies:
   - SKU
   - Quantity
   - Physical attributes
5. Accept OR Raise Mismatch

### Mismatch Handling:
- Product moves to **Quarantine**
- Escalation auto-created
- HQ notified
- No sale allowed until resolved

---

## 5. STOCK OWNERSHIP & RESPONSIBILITY

- Stock is owned by STORE, not staff
- Staff can be assigned **responsibility**, not ownership

### Assigned Stock:
- Used for accountability
- Affects incentives / penalties
- Does NOT block selling by others

---

## 6. STOCK MOVEMENT RULES

### Allowed Movements:
- HQ → Store
- Store → HQ (returns / issues)
- Store → Store (only if enabled)

### Disallowed:
- Silent transfers
- Physical movement without system entry
- Manual quantity edits

Every movement requires:
- Source
- Destination
- Reason
- Approver (where required)

---

## 7. NON-MOVING & AGING STOCK

System tracks:
- Days since last sale
- Days since last movement
- Category-wise aging rules

Actions:
- Auto-flag non-moving stock
- Recommend transfers
- Recommend markdowns (HQ only)

---

## 8. STOCK AUDIT RULES

- Audits can be:
  - Daily
  - Periodic
  - Surprise

Audit rules:
- Scan-based preferred
- Manual entry allowed (logged)
- Variance creates task automatically
- Repeated variance escalates

---

## 9. EXPIRY & BATCH RULES (CONTACT LENS)

Mandatory tracking:
- Batch number
- Expiry date

System must:
- Warn before expiry
- Block sale post expiry
- Track batch-wise profitability

---

## 10. AUDIT & IMMUTABILITY

Inventory logs are:
- Append-only
- Non-editable
- Time-stamped
- Role-attributed

No deletion. Ever.

---

END OF INVENTORY RULES
