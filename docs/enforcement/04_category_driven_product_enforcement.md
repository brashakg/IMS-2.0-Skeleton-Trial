# Category-Driven Product Enforcement — Data Hooks (IMS 2.0)

STATUS: DESIGN-ONLY
BUILD PASS: 3
STEP: 4
LOCK LEVEL: VERY HIGH
AUTHORITY: SYSTEM_INTENT.md

---

## PURPOSE

Enforces category as a control plane.
Products behave strictly by category rules.

NO UI
NO CODE
NO OVERRIDES

---

## CATEGORY AS LAW

- Category is immutable
- Attributes are mandatory
- Behavior is category-defined

---

## ENFORCEMENT POINTS

### PRODUCT CREATION
Entities: `products`, `product_attributes`

Rules:
- category_id mandatory
- Mandatory attributes enforced
- Hard fail on violation

---

### ORDER ITEM INSERT
Entity: `order_items`

Rules:
- Attribute payload validated
- Prescription binding mandatory where required

---

### INVENTORY MOVEMENT
Entity: `inventory_movements`

Rules:
- Category defines tracking logic
- Loss rules enforced

---

### PRICING & DISCOUNTS
Entities: `orders`, `discount_applications`

Rules:
- Category discount limits enforced
- Cross-category conflicts blocked

---

### PURCHASE & GRN
Entities: `purchase_items`, `goods_receipts`

Rules:
- Category compliance metadata mandatory

---

## AUDIT & ESCALATION

All violations logged.
Repeated violations escalate automatically.

---

## AI GOVERNANCE

AI may explain failures.
AI cannot suggest bypasses.

---

LOCKED.
