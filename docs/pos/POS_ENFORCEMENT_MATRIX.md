# POS ENFORCEMENT MATRIX
IMS 2.0 Retail Operating System

## Purpose
Central matrix defining **what the system allows, blocks, or escalates**
during POS execution.

---

## 1. PRESCRIPTION ENFORCEMENT

| Action | Rule |
|------|------|
Lens added without prescription | HARD BLOCK |
Prescription expired | HARD BLOCK |
Prescription edited | Logged + Task |
Prescription overridden | Approval + Audit |

---

## 2. CATEGORY ENFORCEMENT

| Category | Rule |
|--------|-----|
Frame/Sunglass | Discount subject to category cap |
Optical Lens | Prescription mandatory |
Contact Lens | Batch + Expiry mandatory |
Accessories | Category discount rules apply |
Services | Non-discountable by default |
Watches | Luxury rules apply |

---

## 3. PRICING ENFORCEMENT

| Condition | Outcome |
|---------|--------|
MRP < Offer Price | HARD BLOCK |
MRP > Offer Price | Discount DISABLED |
MRP == Offer Price | Discount eligible |

---

## 4. DISCOUNT ENFORCEMENT

| Scenario | Action |
|--------|-------|
Discount > role cap | BLOCK |
Luxury discount | Approval mandatory |
Near-limit behavior | Silent flag |
Repeated overrides | Admin insight |

---

## 5. STOCK ENFORCEMENT

| Scenario | Action |
|--------|-------|
Out of stock | BLOCK |
Low stock | Warning |
Manual override | Task + Audit |

---

## 6. PAYMENT ENFORCEMENT

| Scenario | Action |
|--------|-------|
Partial payment | Allowed + Ledger |
Advance used | Linked to order |
Mismatch | Task generated |

---

## 7. AI GOVERNANCE

AI MAY:
- Detect patterns
- Raise insights
- Suggest review

AI MAY NOT:
- Block sales
- Approve discounts
- Modify orders

---

END POS ENFORCEMENT MATRIX
