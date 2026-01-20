# POS OPTICAL FLOW — CONTRACT BINDING
IMS 2.0 Retail Operating System

## Purpose
Define the **mandatory optical selling sequence** and how UI actions bind to API contracts and DB entities.

This document enforces:
Customer → Patient → Prescription → Lens → Frame → Pricing → Discount → Save

NO deviations allowed.

---

## 1. MANDATORY SEQUENCE (HARD RULE)

1. Customer selected
2. Patient selected or created
3. Prescription attached (MANDATORY for any lens)
4. Product Type chosen:
   - Frame only
   - Lens only
   - Frame + Lens
5. Lens selection (if applicable)
6. Frame selection (if applicable)
7. Coatings / Add-ons
8. Pricing evaluation
9. Discount validation
10. Order save

Violation at any step → HARD BLOCK

---

## 2. UI → API BINDING

### Step: Attach Prescription
UI Action:
- Select prescription

API:
- GET /clinical/prescriptions/{patient_id}

Validation:
- Prescription must be ACTIVE
- Expiry date validated
- Audit log entry created

---

### Step: Lens Selection
UI Action:
- Choose lens SKU

API:
- POST /pos/validate-lens-selection

Payload:
- prescription_id
- lens_sku_id

Validation:
- Power compatibility
- Axis validity
- Category = Optical Lens
- Prescription mandatory

---

### Step: Frame Selection
UI Action:
- Choose frame SKU

API:
- GET /inventory/stock

Validation:
- Stock available
- Category = Frame/Sunglass

---

### Step: Pricing Evaluation
API:
- POST /pos/evaluate-pricing

Reads:
- MRP
- Offer price
- Category classification
- Active offers

Rules:
- MRP < Offer → BLOCK
- MRP > Offer → Discounts DISABLED
- MRP == Offer → Discount check allowed

---

### Step: Discount Attempt
API:
- POST /pos/validate-discount

Reads:
- Role
- Category
- Discount history
- Context (time, customer)

Possible Outcomes:
- Allowed
- Approval required
- Blocked
- Silent flag raised

---

### Step: Save Order
API:
- POST /pos/create-sale

Writes:
- orders
- order_items
- order_prescriptions
- pricing_snapshots
- audit_logs

---

## 3. AUTO TASK CREATION

System creates tasks when:
- Prescription overridden
- Discount approval required
- Stock shortage
- Pricing conflict

Task Engine:
- Category = POS
- Priority auto-assigned
- Escalation attached

---

## 4. AUDIT REQUIREMENTS

Every step logs:
- Actor
- Timestamp
- Previous value
- New value
- Reason (if override)

No silent mutation allowed.

---

END POS OPTICAL FLOW CONTRACT
