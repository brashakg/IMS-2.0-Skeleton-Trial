# POS MODULE — UI ↔ API ↔ DB MAP

## Screen: New Sale (POS)

UI Actions:
- Select customer
- Select patient
- Add product(s)
- Apply discount
- Save order

---

### UI → API

- Save Order
  → POST /pos/create-sale

- Validate Discount
  → POST /pos/validate-discount (internal call)

- Fetch Stock
  → GET /inventory/stock

---

### API → DB

POST /pos/create-sale writes to:
- orders
- order_items
- payments (if advance)
- audit_logs

Reads from:
- products
- pricing_rules
- discount_authority
- stock_units

---

### Authority Gates

- Discount > role cap → BLOCK
- Luxury category beyond cap → BLOCK
- Near-limit discount → Silent flag

---

### Auto Side Effects (Logged)

- Task created if:
  - Manual override attempted
  - Discount justification required

---

## Screen: Order View

UI Actions:
- View order
- Print invoice
- Collect payment

UI → API:
- GET /orders/{id}
- POST /payments/collect

API → DB:
- payments
- ledger_entries
- audit_logs

---

END POS WIRING
