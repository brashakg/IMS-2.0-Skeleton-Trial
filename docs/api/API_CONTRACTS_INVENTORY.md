# INVENTORY API CONTRACTS
(Build Pass 3 — Step 2)

## Purpose
Define inventory-related API contracts covering:
- Stock visibility
- Stock reservation
- Stock validation during POS flow
- No mutation logic here (structure only)

---

## API: Fetch Available Stock
GET /inventory/stock

### Request (Query Params)

{
  "store_id": "string",
  "sku_id": "string"
}

### Response

{
  "sku_id": "string",
  "store_id": "string",
  "available_units": "number",
  "reserved_units": "number",
  "sellable_units": "number",
  "status": "AVAILABLE | LOW_STOCK | OUT_OF_STOCK"
}

---

## API: Reserve Stock (POS Flow)
POST /inventory/reserve

### Purpose
Temporarily reserve stock during POS order creation.
Reservation expires automatically if order not completed.

### Request Body

{
  "order_id": "string",
  "store_id": "string",
  "items": [
    {
      "sku_id": "string",
      "quantity": "number"
    }
  ]
}

### Response — SUCCESS

{
  "status": "RESERVED",
  "reservation_id": "string",
  "expires_at": "ISO-8601"
}

---

## Response — FAILURE

{
  "status": "FAILED",
  "reason": "INSUFFICIENT_STOCK | SKU_NOT_FOUND | STORE_MISMATCH"
}

---

## API: Release Stock Reservation
POST /inventory/release

### Request Body

{
  "reservation_id": "string",
  "reason": "ORDER_CANCELLED | SESSION_EXPIRED"
}

### Response

{
  "status": "RELEASED"
}

---

## HARD RULES

- Stock reservation MUST occur before order save
- Reservation expiration MUST be time-bound
- No direct stock decrement from POS
- All stock mutations must be auditable
- Silent auto-adjustments are forbidden

---

END INVENTORY API CONTRACTS
