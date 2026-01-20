# CATEGORY ATTRIBUTE MODEL — IMS 2.0

## Purpose
Define a **category-driven product schema** so the system:
- Supports optical + non-optical categories
- Enforces mandatory attributes per category
- Enables correct SKU generation
- Prevents category misuse (discount, reporting, inventory)

This model is **authoritative** for:
- Product creation
- Inventory
- POS validation
- Discount rules
- Reporting

---

## CORE PRINCIPLES

1. Every product belongs to **exactly one category**
2. Category defines:
   - Mandatory attributes
   - Optional attributes
   - SKU structure
3. No generic “catch-all” products
4. Missing mandatory attribute = HARD BLOCK
5. Additional Details is the ONLY optional field

---

## GLOBAL ATTRIBUTES (ALL CATEGORIES)

Mandatory for all products:
- Brand
- Sub-brand (if applicable)
- Model Name / Number
- Category
- Cost Price
- MRP
- GST Rate
- Launch Year
- Status (Active / Inactive)

Optional:
- Additional Details (free text)

---

## CATEGORY DEFINITIONS & ATTRIBUTES

### 1. FRAME / SUNGLASS

Mandatory:
- Frame Type (Optical / Sunglass)
- Gender
- Frame Shape
- Frame Material
- Frame Colour
- Size (Lens / Bridge / Temple)
- Rim Type
- Frame Category (Luxury / Premium / Mass)
- Country of Origin

Optional:
- Additional Details

SKU Logic:
`FRM-{BRAND}-{MODEL}-{COLOR}-{SIZE}`

---

### 2. OPTICAL LENS

Mandatory:
- Lens Type (Single Vision / Bifocal / Progressive)
- Material
- Index
- Coating Type
- Power Range Supported
- Prescription Required (Yes)
- Lens Category (Standard / Premium)

Optional:
- Additional Details

SKU Logic:
`LENS-{TYPE}-{INDEX}-{COATING}`

---

### 3. CONTACT LENS

Mandatory:
- Wear Type (Daily / Monthly / Yearly)
- Power Range
- Base Curve
- Diameter
- Pack Size
- Expiry Tracking (Yes)
- Batch Required (Yes)

Optional:
- Additional Details

SKU Logic:
`CL-{BRAND}-{POWER}-{PACK}`

---

### 4. ACCESSORIES

Mandatory:
- Accessory Type (Case / Cleaner / Cloth / Chain)
- Material
- Usage Type

Optional:
- Additional Details

SKU Logic:
`ACC-{TYPE}-{BRAND}`

---

### 5. SERVICES (FITTING / REPAIR)

Mandatory:
- Service Type
- Applicable Category (Frame / Lens / Both)
- One-Time / Repeatable
- Duration

Optional:
- Additional Details

SKU Logic:
`SVC-{TYPE}`

---

### 6. WATCHES / SMART WATCHES

Mandatory:
- Watch Type (Analog / Digital / Smart)
- Strap Material
- Dial Size
- Water Resistance
- Warranty Period
- Battery Type

Optional:
- Additional Details

SKU Logic:
`WCH-{BRAND}-{MODEL}`

---

## ATTRIBUTE ENFORCEMENT RULES

- Attributes enforced at:
  - Product creation
  - Bulk upload
  - API validation
- Category change AFTER creation:
  - ❌ Not allowed
  - Requires product recreation

---

## GOVERNANCE

- Category definitions editable ONLY by Superadmin
- Attribute removal is forbidden if data exists
- Attribute additions allowed (future-proofing)

---

END CATEGORY ATTRIBUTE MODEL
