# DB SCHEMA — PRODUCT CATEGORY MODEL
IMS 2.0

Defines category-driven product structure.

---

## 1. PRODUCT_CATEGORIES

Locked system categories.

Fields:
- id (UUID, PK)
- category_code (FRAME, LENS, CL, ACCESSORY, SERVICE, WATCH)
- category_name
- classification (MASS / PREMIUM / LUXURY / SERVICE / NON_DISCOUNTABLE)
- is_active

RULE:
- Category cannot be deleted once used.

---

## 2. CATEGORY_ATTRIBUTES

Defines mandatory attributes per category.

Fields:
- id (UUID, PK)
- category_id (FK → PRODUCT_CATEGORIES)
- attribute_code
- attribute_name
- data_type (STRING / NUMBER / ENUM / BOOLEAN)
- is_mandatory (true/false)
- allowed_values (JSON, nullable)
- display_order

RULE:
- All attributes mandatory except `additional_details`.

---

## 3. PRODUCTS

Base product record.

Fields:
- id (UUID, PK)
- sku (unique)
- category_id (FK → PRODUCT_CATEGORIES)
- name
- brand
- mrp
- offer_price
- status (ACTIVE / INACTIVE)
- created_at

RULES:
- Product belongs to exactly ONE category
- Category change NOT allowed

---

## 4. PRODUCT_ATTRIBUTES

Actual attribute values for a product.

Fields:
- id (UUID, PK)
- product_id (FK → PRODUCTS)
- attribute_code
- value

---

END PRODUCT CATEGORY MODEL
