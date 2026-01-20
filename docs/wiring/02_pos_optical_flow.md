# POS — OPTICAL FLOW WIRING (Prescription → Lens → Pricing)
## docs/wiring/02_pos_optical_flow.md
Purpose: Exact UI → API → DB wiring for optical sales in POS. This corrects the missing linkage between prescriptions and lens selection, ensures category-driven validation, and hooks discount validation.

---

## High-level flow (user)
1. Select Customer
2. Select Patient (or create new patient)
3. Select/Attach Prescription (existing / upload / manual entry)
4. Choose Product Type: Frame only | Frame + Lens | Lens only | Contact Lens
5. If Lens involved: Lens Type selection → Power binding (auto from prescription) → Coatings / Add-ons
6. Pricing & Discount validation (category-aware)
7. Save Order → Create Order + Order Items + Payments (if any)
8. Generate Tasks/Remakes if checks fail

---

## UI screens / widgets (POS)
- Customer selector (search by phone / name)
- Patient selector (list + add)
- Prescription panel:
  - Show list of patient's prescriptions (date, optometrist, preview)
  - Buttons: Use, Upload, Enter Manually
  - Prescription preview expands showing SPH/CYL/AXIS/ADD etc for L/R
- Lens chooser (visible if sale type includes lenses):
  - Lens family dropdown (Single Vision / Progressive / Bifocal / Specialty)
  - Lens SKU search (driven by category attributes)
  - Power auto-fill from selected prescription (with editable override only for allowed roles)
  - Coating / Tint / Extras toggles (each maps to attribute metadata)
  - Quantity and store-location stock check
- Frame chooser:
  - Barcode scan / SKU search (category-coded)
  - Show frame attributes (size, color code) and recommended lens compatibility
- Pricing summary:
  - MRP, Offer Price, Line discounts, GST, Total
  - Warnings (if MRP < Offer or Offer > MRP) — block or highlight per SYSTEM_INTENT
- Discount input:
  - Role-aware discount input
  - If override needed → route to Approve flow (POST /pos/request-discount-approval)
- Buttons: Save Order, Save & Print Token, Save & Take Advance

---

## Key UI/UX rules
- Prescription must be attached before lens-selection final commit (unless product type is Frame-only)
- Power & Axis auto-populate when prescription attached; allow editing only if role permits (edit logged)
- If lens requires ranges not present in inventory (e.g., custom lens), UI shows "Order via vendor" flow
- All user actions generate audit log entries (who, what, when, old vs new)
- All warnings are explicit (modal) and require acknowledgement for any override.

---

## API endpoints (UI → API)
- GET /customers?query=
- GET /customers/{id}/patients
- GET /patients/{id}/prescriptions
- POST /patients/{id}/prescriptions/upload
- POST /pos/validate-prescription-binding  (validates prescription → lens rules)
- GET /catalog/sku?category={}&filters={}
- GET /inventory/stock?sku={}&location={}&availability=true
- POST /pos/create-sale
- POST /pos/request-discount-approval
- POST /tasks/create (for exceptions/escalations)
- GET /users/{id}/roles (for discount gating and edit permissions)

---

## API → DB mapping (writes)
**POST /pos/create-sale** writes to:
- orders {id, order_no, customer_id, patient_id, total_amount, status, created_by, store_id, timestamps}
- order_items {order_id, sku_id, qty, unit_price, item_type(frame/lens/accessory), prescription_id (nullable), attributes JSON}
- payments (if advance/collect) {order_id, payment_type, amount, txn_id, created_by}
- audit_logs {entity_type, entity_id, action, user_id, previous, new, timestamp}
- stock_movements {sku_id, qty, from_location, to_location (if reserved), order_id}
**Also reads**: products catalog, category attributes, pricing rules, discount caps.

---

## Validation rules (enforced at API)
- Prescription presence:
  - If product_type requires prescription (category attribute `requires_prescription = true`) → reject with 400: "Prescription required for selected product type."
- Power mapping:
  - Auto-map prescription SPH/CYL/AXIS to lens item attributes; if prescription out of SKU available range → respond 409 with suggested vendor order flow.
- MRP / Offer logic:
  - If Offer Price > MRP → BLOCK and return 422 with message "Offer price cannot be greater than MRP."
  - If Offer Price < MRP → allow but apply category/role discount caps.
- Discount gating:
  - Call discount validation flow (POST /pos/validate-discount) before finalizing sale. Return status: allowed | requires_approval | blocked
- Stock reserve:
  - Reserve stock on successful create-sale; if stock insufficient → create backorder and task.
- Audit:
  - All overrides (discount, prescription edit, price edit) require a justification string and are logged.

---

## Error messages (examples)
- 400: "Prescription required for lens sale."
- 409: "Selected lens power not available in inventory; create vendor order?"
- 422: "Offer price cannot be greater than MRP."
- 403: "You do not have permission to edit prescription data."
- 409: "Discount above role cap; please request approval."

---

## Task generation rules
- If manual override of prescription occurs → create task: "Prescription override review" assigned to Store Manager
- If discount requires approval → create task and notification to approver role
- If stock shortage → create "Vendor order" task assigned to Catalog Manager
- If MRP vs Offer conflict attempted → block and log incident; if override attempted by Admin → create audit task

---

## Example JSON payloads (POST /pos/create-sale)
### Request (simplified)
```json
{
  "customer_id": "C123",
  "patient_id": "P456",
  "store_id": "S01",
  "items": [
    {
      "sku_id": "FRM-RB-3025-58",
      "qty": 1,
      "type": "frame",
      "attributes": {"color_code":"BLK","size":"58-14-135"}
    },
    {
      "sku_id": "LNS-SV-1.5-A",
      "qty": 2,
      "type": "lens",
      "prescription_id": "RX789",
      "attributes": {"eye":"R","sph":-1.25,"cyl":-0.75,"axis":90,"coating":["antireflective","hard"]}
    }
  ],
  "payments": [{"type":"advance","amount":2000}],
  "discounts": [{"type":"line","amount":150,"user_id":"U12"}],
  "notes": "Customer wants blue tint"
}
SUCCESSFUL RESPONSE:
{
  "order_id":"O1234",
  "order_no":"BV-2026-0001",
  "status":"CONFIRMED",
  "reserved_stock":[{"sku_id":"FRM-RB-3025-58","qty":1}]
}
Integration points (to hook later)
Catalog attribute service (provides requires_prescription, is_luxury, allowed_power_range)
AI advisory (read-only) for unusual patterns (prescription edits, discount near cap)
Marketplace sync (for lens SKUs that are sellable online or backordered)
Implementation notes for Emergent / dev
POS front-end must call GET /patients/{id}/prescriptions on selection and show a compact preview
Selecting a prescription should trigger POST /pos/validate-prescription-binding to get compatibility and availability suggestions
All validation must be server-side too (front-end validations are UX only)
Keep authorization checks strict; any override UI must route via approval endpoints
END OF FILE
