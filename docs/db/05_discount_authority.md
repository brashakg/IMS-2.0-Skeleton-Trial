# DB SCHEMA — DISCOUNT AUTHORITY
IMS 2.0

---

## 1. DISCOUNT_RULES

Fields:
- id (UUID, PK)
- role_id
- category_classification
- max_discount_percent
- approval_required (true/false)

---

## 2. DISCOUNT_APPROVALS

Fields:
- id (UUID, PK)
- order_item_id
- requested_discount
- approved_by
- approval_reason
- approved_at

---

END DISCOUNT AUTHORITY
