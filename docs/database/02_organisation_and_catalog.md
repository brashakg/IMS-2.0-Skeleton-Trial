# 02 — Organisation & Catalog Tables

## STORES
Represents physical or logical stores.

Fields:
- store_id
- store_code (unique)
- store_name
- city
- status (active / suspended)
- created_at

Rules:
- Stores are never deleted
- Suspension locks transactions

---

## STORE_HIERARCHY
Defines reporting structure.

Fields:
- mapping_id
- child_store_id
- parent_store_id
- level (store / area / hq)

---

## PRODUCT_CATEGORY
Defines product segmentation.

Fields:
- category_id
- category_name
- is_luxury (boolean)
- discount_policy_code

Rules:
- Luxury flag is SYSTEM truth
- Cannot be overridden at store level

---

## PRODUCT_MASTER
Canonical SKU definition.

Fields:
- product_id
- sku_code (global unique)
- category_id
- brand
- model
- attributes (JSON)
- mrp
- offer_price
- status

Rules:
- If offer_price > mrp → BLOCK
- If mrp > offer_price → discount locked
- Price changes require HQ approval

---

## STORE_PRODUCT_MAPPING
Store-specific placement.

Fields:
- mapping_id
- product_id
- store_id
- display_location_code
- barcode

Rules:
- Barcode printed at store
- Location change creates new barcode
- Old barcode remains in audit

---

END OF ORGANISATION & CATALOG
