# INVENTORY MODULE — UI ↔ API ↔ DB MAP

## Screen: Stock Acceptance

UI Actions:
- Scan items
- Verify quantity
- Accept / Escalate

UI → API:
- POST /inventory/accept-stock
- POST /tasks/create (if mismatch)

API → DB:
Writes:
- stock_units
- stock_acceptance
- tasks
- audit_logs

Reads:
- catalog_items
- pricing_rules

Rules:
- No barcode printing before acceptance
- Location code appended at store-level

---

## Screen: Stock Transfer

UI Actions:
- Initiate transfer
- Receive transfer

UI → API:
- POST /inventory/transfer-out
- POST /inventory/transfer-in

API → DB:
- stock_units (decrement/increment)
- transfers
- audit_logs

Rules:
- Inter-store transfers disabled unless enabled by Superadmin

---

END INVENTORY WIRING
