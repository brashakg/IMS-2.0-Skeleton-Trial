# CATEGORY ATTRIBUTE MODEL — IMS 2.0
Authority: SYSTEM_INTENT.md

This document defines the **mandatory attribute schema per product category**.
Only fields listed for a category are applicable.
All listed fields are **MANDATORY unless marked Optional**.

No SKU can be created unless all mandatory attributes are provided.

---

## 1. FRAME / SUNGLASS

Mandatory Attributes:
- Brand Name
- Sub Brand
- Model No / Model Name
- Frame Type (Optical / Sunglass)
- Gender (Men / Women / Unisex)
- Frame Shape
- Frame Material
- Frame Colour Name
- Colour Code
- Size (Eye Size)
- Bridge Width
- Temple Length
- MRP
- Offer Price
- Country of Origin
- Year of Launch
- Luxury Flag (Yes / No)
- Display Category (Counter / Shelf / Cabinet)

Optional:
- Additional Detail 1
- Additional Detail 2

---

## 2. OPTICAL LENS

Mandatory Attributes:
- Brand Name
- Lens Type (Single Vision / Bifocal / Progressive)
- Index
- Material
- Coating Type
- Prescription Required (Yes)
- Lens Category (Clear / Blue Cut / Photochromic)
- MRP
- Offer Price

Optional:
- Additional Detail 1
- Additional Detail 2

---

## 3. CONTACT LENS

Mandatory Attributes:
- Brand Name
- Product Name
- Lens Type (Daily / Monthly / Yearly)
- SPH Power
- CYL Power
- Axis
- Add Power
- Pack Size
- Batch Tracking Required (Yes)
- Expiry Tracking Required (Yes)
- MRP
- Offer Price

Optional:
- Additional Detail 1
- Additional Detail 2

---

## 4. ACCESSORIES

Mandatory Attributes:
- Brand Name
- Product Name
- Accessory Type (Case / Cleaner / Cloth / Spray)
- Compatible Category (Frame / Sunglass / Lens)
- MRP
- Offer Price

Optional:
- Additional Detail 1
- Additional Detail 2

---

## 5. WATCHES / SMART WATCHES

Mandatory Attributes:
- Brand Name
- Model No
- Watch Type (Analog / Digital / Smart)
- Dial Colour
- Strap Type
- Strap Colour
- Dial Size
- Water Resistance
- Battery Type
- MRP
- Offer Price

Optional:
- Additional Detail 1
- Additional Detail 2

---

## GLOBAL ENFORCEMENTS

- Offer Price > MRP → BLOCK
- MRP > Offer Price → Discount rules disabled unless HQ override
- Luxury Flag = Yes → Category discount rules apply
- Additional Details are never used in pricing logic
- All pricing governed by Superadmin rules

END OF CATEGORY ATTRIBUTE MODEL
