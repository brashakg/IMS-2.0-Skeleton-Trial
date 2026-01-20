# POS Optical Flow — Data Binding (IMS 2.0)

STATUS: DESIGN-ONLY (READ-ONLY)
BUILD PASS: 3
STEP: 3
LOCK LEVEL: HIGH (binds POS flow to schema + API contracts)
AUTHORITY: SYSTEM_INTENT.md

---

## PURPOSE

This document binds the **corrected POS optical flow** to:
- Database schema entities (tables only)
- API contracts (request/response shapes only)
- Category enforcement hooks
- Discount enforcement hooks

NO UI.
NO CODE.
NO ASSUMPTIONS.
NO BUSINESS LOGIC RE-DEFINITION.

This file is the **single source of truth** for how POS flow progresses at the data level.

---

## CANONICAL OPTICAL FLOW (LOCKED)

Customer  
→ Patient  
→ Prescription  
→ Lens  
→ Frame  
→ Pricing  
→ Billing  
→ Payment  
→ Invoice

Flow order is **non-negotiable**.

---

## FLOW STEP BINDINGS

### 1. CUSTOMER

**Primary Entity**
- `customers`

**Required Data Bindings**
- customer_id (system-generated)
- name
- mobile
- consent_flags

**Rules**
- Customer may exist without Patient
- Customer reuse allowed across visits
- No clinical data allowed at this step

**APIs**
- POST /customers
- GET /customers/{id}

---

### 2. PATIENT

**Primary Entity**
- `patients`

**Relations**
- patients.customer_id → customers.id

**Required Data Bindings**
- patient_id
- age
- gender
- visit_context

**Rules**
- Patient is mandatory for optical flow
- Multiple patients may map to one customer
- Cannot proceed without patient_id

**APIs**
- POST /patients
- GET /patients/{id}

---

### 3. PRESCRIPTION

**Primary Entity**
- `prescriptions`

**Relations**
- prescriptions.patient_id → patients.id

**Required Data Bindings**
- prescription_id
- prescription_type (manual / digital)
- eye_values (as per CATEGORY_ATTRIBUTE_MODEL)
- prescribed_by
- prescription_date
- expiry_date

**Rules**
- Mandatory before Lens selection
- Must pass clinical abuse checks (read-only enforcement)
- Locked after confirmation

**APIs**
- POST /prescriptions
- GET /prescriptions/{id}

---

### 4. LENS

**Primary Entity**
- `order_items` (category = LENS)

**Relations**
- order_items.prescription_id → prescriptions.id
- order_items.order_id → orders.id

**Required Data Bindings**
- product_id
- category = LENS
- attribute_payload (validated via CATEGORY_ATTRIBUTE_MODEL)
- pricing_snapshot

**Rules**
- Lens selection is prescription-bound
- Category attribute enforcement is mandatory
- Cannot apply discounts exceeding lens rules

**APIs**
- POST /orders/{order_id}/items (LENS only)

---

### 5. FRAME

**Primary Entity**
- `order_items` (category = FRAME)

**Relations**
- order_items.order_id → orders.id

**Required Data Bindings**
- product_id
- category = FRAME
- size_attributes
- pricing_snapshot

**Rules**
- Frame is optional but sequential (after Lens)
- Frame discounts governed separately from Lens
- Stock reservation triggered here (read-only)

**APIs**
- POST /orders/{order_id}/items (FRAME only)

---

### 6. PRICING

**Primary Entities**
- `orders`
- `order_items`
- `discount_applications`

**Required Data Bindings**
- item_level_price
- tax_components
- discount_requests
- discount_approvals (if any)

**Rules**
- Pricing is computed, not edited
- Discount logic pulled from DISCOUNT_LOGIC_BY_CATEGORY
- All overrides require role-based approval trails

**APIs**
- POST /orders/{order_id}/price-review

---

### 7. BILLING

**Primary Entity**
- `bills`

**Relations**
- bills.order_id → orders.id

**Required Data Bindings**
- bill_id
- final_amount
- tax_summary
- payable_amount

**Rules**
- Bill is immutable after generation
- No product edits allowed post-bill

**APIs**
- POST /bills
- GET /bills/{id}

---

### 8. PAYMENT

**Primary Entity**
- `payments`

**Relations**
- payments.bill_id → bills.id

**Required Data Bindings**
- payment_id
- payment_mode
- amount
- transaction_reference
- payment_status

**Rules**
- Partial payments allowed if enabled by role
- Failed payments are logged, not overwritten

**APIs**
- POST /payments
- GET /payments/{id}

---

### 9. INVOICE

**Primary Entity**
- `invoices`

**Relations**
- invoices.bill_id → bills.id

**Required Data Bindings**
- invoice_number
- issue_date
- compliance_metadata

**Rules**
- Invoice generation is terminal
- No reverse edits allowed
- Credit notes handled via separate flow (out of scope)

**APIs**
- POST /invoices
- GET /invoices/{id}

---

## ENFORCEMENT HOOKS (DATA-LEVEL)

### Category Enforcement
- Triggered at `order_items` insert
- Validates against CATEGORY_ATTRIBUTE_MODEL
- Hard-fail on missing mandatory attributes

### Discount Enforcement
- Triggered during Pricing step
- Uses DISCOUNT_LOGIC_BY_CATEGORY
- Logs every attempt (approved / rejected)

### Audit & Abuse Controls
- All transitions are timestamped
- Role context captured per action
- No silent mutations allowed

---

## AI GOVERNANCE

- AI may READ:
  - customer summary
  - pricing breakdown
- AI may NOT:
  - create / edit entities
  - suggest discounts
  - override flow order

Superadmin-only advisory visibility.

---

## LOCK NOTE

This document:
- Does NOT define UI
- Does NOT define calculations
- Does NOT redefine business rules
- Exists solely to bind **flow → data → enforcement**

Any deviation is a SYSTEM_INTENT violation.
