# DB SCHEMA — POS CORE TABLES
IMS 2.0

---

## 1. ORDERS

Fields:
- id (UUID, PK)
- order_number
- customer_id
- patient_id
- location_id
- order_status
- created_by
- created_at

---

## 2. ORDER_ITEMS

Fields:
- id (UUID, PK)
- order_id
- product_id
- quantity
- unit_price
- discount_applied
- final_price
- linked_prescription_id (nullable)

RULE:
- Lens items MUST link prescription_id

---

## 3. PAYMENTS

Fields:
- id (UUID, PK)
- order_id
- payment_mode
- amount
- status
- collected_at

---

END POS CORE TABLES
