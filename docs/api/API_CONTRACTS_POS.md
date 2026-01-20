# IMS 2.0 — API Contracts & Authority Gates
(Build Pass 3 – Step 2)

This folder defines **how the frontend is allowed to talk to the system**.

These are:
- Logical API contracts
- Authority requirements
- Explicit denials
- Escalation triggers

This is NOT implementation code.
This is NOT tied to REST / GraphQL.
This is SYSTEM GOVERNANCE.

---

## Core Rules

- No endpoint is public
- Every request is role-validated
- Every mutation is authority-checked
- Every denial is explainable
- Every override is logged

---

## API TYPES

1. READ APIs (safe, non-mutating)
2. WRITE APIs (mutating, gated)
3. APPROVAL APIs (two-step)
4. OVERRIDE APIs (Superadmin only)

---
2. FETCH PATIENTS FOR CUSTOMER
Endpoint GET /api/customers/{customer_id}/patients
Response
{
  "patients": [
    {
      "patient_id": "PAT456",
      "name": "Ananya Sharma",
      "dob": "1998-06-12"
    }
  ]
}
3. FETCH PRESCRIPTIONS FOR PATIENT
Endpoint GET /api/prescriptions/{patient_id}
Response
{
  "prescriptions": [
    {
      "prescription_id": "RX789",
      "created_at": "2025-01-10",
      "right_eye": { "sph": -1.25, "cyl": -0.5, "axis": 90 },
      "left_eye": { "sph": -1.0, "cyl": -0.25, "axis": 85 },
      "source": "IN_STORE | DOCTOR"
    }
  ]
}
4. VALIDATE PRESCRIPTION BINDING (OPTICAL FLOW)
Endpoint POST /api/pos/validate-prescription
Request
{
  "patient_id": "PAT456",
  "prescription_id": "RX789",
  "product_type": "OPTICAL_LENS | FRAME_AND_LENS"
}
Response
{
  "valid": true,
  "locked_fields": ["sph", "cyl", "axis"],
  "editable_by_role": ["MANAGER", "ADMIN"]
}
5. SEARCH PRODUCTS (CATEGORY-AWARE)
Endpoint GET /api/products/search
Query Params
category (FRAME | OPTICAL_LENS | CONTACT_LENS | ACCESSORY | SERVICE | WATCH)
query (string)
Response
{
  "products": [
    {
      "sku": "FR-RB-3025-BLK",
      "name": "Ray-Ban Aviator",
      "category": "FRAME",
      "price": 12999,
      "luxury_level": "LUXURY"
    }
  ]
}
6. VALIDATE DISCOUNT (CRITICAL AUTHORITY GATE)
Endpoint POST /api/pos/validate-discount
Request
{
  "sku": "FR-RB-3025-BLK",
  "category": "FRAME",
  "mrp": 12999,
  "selling_price": 12499,
  "requested_discount_percent": 3,
  "user_role": "STORE_STAFF",
  "store_id": "STORE01"
}
Response — ALLOWED
{
  "status": "ALLOWED",
  "approval_required": false
}
Response — BLOCKED
{
  "status": "BLOCKED",
  "reason": "Discount exceeds category limit"
}
Response — APPROVAL REQUIRED
{
  "status": "APPROVAL_REQUIRED",
  "required_role": "MANAGER",
  "task_created": true
}


7. CREATE SALE (FINAL COMMIT)
Endpoint POST /api/pos/create-sale
Request
{
  "customer_id": "CUST123",
  "patient_id": "PAT456",
  "prescription_id": "RX789",
  "items": [
    {
      "sku": "FR-RB-3025-BLK",
      "category": "FRAME",
      "price": 12499
    }
  ],
  "payments": [
    {
      "mode": "UPI",
      "amount": 5000
    }
  ]
}
Response
{
  "order_id": "ORD10021",
  "status": "CONFIRMED"
}
GOVERNANCE RULES
❌ No order without category validation
❌ No lens sale without prescription
❌ No discount bypass
✅ All failures logged
✅ Tasks auto-created where needed
✅ AI NOT involved in approval


END OF POS API CONTRACT
END OF API OVERVIEW




