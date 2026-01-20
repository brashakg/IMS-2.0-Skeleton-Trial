# POS RULES — IMS 2.0

## Purpose
This document defines **non-negotiable business rules** governing POS behaviour.
These rules override convenience, speed, and user discretion.

System philosophy: **Control > Convenience**

---

## 1. PRICE HIERARCHY RULES (GLOBAL)

Each product has:
- MRP
- Offer Price (optional)
- Category
- Luxury Flag (true/false)

### Rule 1.1 — Offer Price vs MRP
- If **Offer Price < MRP**
  - ❌ NO additional discounts allowed
  - ❌ NO schemes applicable
  - ✅ Gift Cards allowed
- If **Offer Price = MRP**
  - ✅ Role-based discounts apply
- If **Offer Price > MRP**
  - 🚫 BLOCK order creation (hard stop)

Only **HQ Admin / Superadmin** may override Rule 1.1.

---

## 2. DISCOUNT AUTHORITY (ROLE + CATEGORY BASED)

Discount authority is controlled by **Superadmin Settings**.

### Discount caps depend on:
- Employee role
- Product category
- Luxury flag
- Store type

Example:
- Sales Staff: max 10%
- Store Manager: max 20%
- Area Manager: max 25%
- Admin / Superadmin: configurable (including full override)

System must:
- Auto-calculate allowed discount
- Block excess discount attempts
- Log every override with reason

---

## 3. LUXURY PRODUCT IDENTIFICATION

A product is considered **Luxury** if ANY of the following is true:
- Brand is marked `luxury = true`
- Category is mapped to Luxury Group
- Price band exceeds Superadmin-defined threshold
- Manually flagged by HQ Catalog Manager

Luxury products:
- Have lower discount caps
- Require approval beyond certain thresholds
- Are tracked separately for abuse detection

---

## 4. PAYMENT RULES

Supported:
- Cash
- UPI
- Card
- EMI
- Bank Transfer
- Gift Cards
- Store Credit (exchange only)

Rules:
- Partial payments allowed
- Outstanding balance tracked automatically
- Delivery blocked if rules violated (configurable)

---

## 5. GIFT CARD RULES

- Gift Cards can be applied regardless of:
  - MRP
  - Offer Price
  - Discount eligibility
- Gift Cards cannot be refunded as cash
- Gift Card usage is logged per order

---

## 6. ORDER FINALIZATION RULES

An order CANNOT be saved if:
- Discount exceeds authority
- MRP / Offer logic violated
- Mandatory fields missing
- Required approvals pending

---

## 7. AUDIT & LOGGING (MANDATORY)

Every POS action logs:
- User
- Role
- Store
- Timestamp
- Old value → New value
- Approval reference (if any)

Logs are immutable.

---

END OF POS RULES
