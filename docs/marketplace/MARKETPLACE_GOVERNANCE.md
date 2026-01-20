# MARKETPLACE GOVERNANCE — IMS 2.0

## Purpose
To control all external sales channels (Shopify, Amazon, Flipkart, WhatsApp, etc.)
WITHOUT losing authority, pricing discipline, or inventory truth.

IMS remains the **single source of truth**.

---

## CORE PRINCIPLES

1. IMS owns catalog, pricing, stock, tax logic
2. Marketplaces are execution channels, not authorities
3. No marketplace can override IMS rules
4. Sync is explicit, auditable, reversible
5. Failures degrade gracefully, never silently

---

## SUPPORTED CHANNEL TYPES

- D2C Website (Shopify)
- Marketplaces (Amazon, Flipkart)
- Assisted Commerce (WhatsApp)
- Future Channels (configurable)

Each channel is treated as an **adapter**, not a core system.

---

## CATALOG GOVERNANCE

Catalog is created ONLY in IMS.

For each product:
- Channel eligibility is explicitly selected
- Channel-specific fields allowed (title, images, description)
- Core attributes are locked:
  - SKU
  - MRP
  - Offer Price
  - GST
  - Category
  - Discount rules

If a product is not approved in IMS → it cannot exist on marketplace.

---

## PRICING GOVERNANCE

Rules:
- Marketplace price must respect IMS pricing law
- If Offer Price < MRP → no further discounts allowed
- Marketplace promotions must be approved in IMS
- Channel fees are tracked separately

Violations:
- Auto flag
- Sync paused
- Admin visibility

---

## INVENTORY GOVERNANCE

- IMS inventory is authoritative
- Marketplace stock is derived
- Buffer stock configurable per channel
- Overselling protection enforced

If mismatch detected:
- Marketplace stock frozen
- Task created
- Manual reconciliation required

---

## ORDER FLOW GOVERNANCE

Marketplace order lifecycle:
1. Order received
2. Validated against IMS rules
3. Inventory reserved
4. Order converted into IMS order
5. Fulfilment tracked
6. Settlement recorded

No direct marketplace → warehouse bypass allowed.

---

## FAILURE MODES

- API down → queue & retry
- Pricing mismatch → pause sync
- Inventory mismatch → block listing
- SLA breach → escalation

No silent failures allowed.

---

## AUDIT & COMPLIANCE

- Every sync logged
- Every override recorded
- Manual actions require reason
- Historical truth preserved

---

END OF MARKETPLACE GOVERNANCE
