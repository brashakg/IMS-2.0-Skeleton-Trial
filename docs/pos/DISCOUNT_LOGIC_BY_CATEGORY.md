# DISCOUNT LOGIC BY CATEGORY — IMS 2.0

## Purpose
Bind **discount authority, limits, and behavior**
to **product category**, not just user role.

This prevents:
- Luxury abuse
- Category hopping
- Hidden discounting
- Staff manipulation

---

## CORE RULES

1. Discount = Role × Category × Context
2. Category rules override role convenience
3. Luxury categories are STRICT
4. No silent overrides
5. Every exception is logged

---

## CATEGORY CLASSIFICATION

Each category is tagged as one of:

- MASS
- PREMIUM
- LUXURY
- SERVICE
- NON-DISCOUNTABLE

Configured by Superadmin.

---

## DISCOUNT MATRIX (EXAMPLE)

| Category | Default Cap | Approval Required | AI Monitoring |
|--------|------------|------------------|---------------|
| Frame (Mass) | 10% | >10% | Yes |
| Frame (Luxury) | 0–2% | Any discount | High |
| Lens (Standard) | 15% | >15% | Yes |
| Lens (Premium) | 8% | >8% | Yes |
| Accessories | 20% | >20% | Medium |
| Services | Fixed only | Any override | Yes |
| Gift Cards | 0% | Always blocked | N/A |

---

## POS VALIDATION FLOW

At POS:
1. Product added
2. Category detected
3. Discount attempted
4. System checks:
   - Role limit
   - Category cap
   - Time context
   - Past behavior

If violation:
- HARD BLOCK
- OR Approval required
- OR Justification required

---

## LUXURY CATEGORY HARD RULES

- Discounts above cap → BLOCK
- No “accessory compensation”
- No manual price edits
- Approval cannot exceed max cap

---

## NEAR-LIMIT BEHAVIOR

Pattern:
- Repeated discounts at 9.8%, 7.9%, etc.

Action:
- Silent flag
- Admin & Superadmin visibility
- No POS interruption

---

## APPROVAL LOGIC

Approval requires:
- Approver role ≥ defined minimum
- Reason mandatory
- Audit entry immutable

Approval abuse is tracked separately.

---

## AI ROLE (READ-ONLY)

AI may:
- Detect patterns
- Suggest tighter caps
- Flag risky staff-category pairs

AI cannot:
- Approve discounts
- Change pricing
- Block sales

---

## AUDIT REQUIREMENTS

Every discount logs:
- Original price
- Discount %
- Category
- Role
- Approval chain (if any)
- Timestamp

---

END DISCOUNT LOGIC BY CATEGORY
