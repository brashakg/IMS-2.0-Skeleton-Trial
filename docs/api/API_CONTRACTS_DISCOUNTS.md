# DISCOUNT GOVERNANCE API CONTRACTS
(Build Pass 3 — Step 2)

## Purpose
Define APIs governing:
- Discount authority
- Approval workflow initiation
- Audit visibility
- AI read-only insights hook

---

## API: Request Discount Approval
POST /discounts/request-approval

### Request Body

{
  "order_id": "string",
  "requested_by_user_id": "string",
  "store_id": "string",
  "product_context": {
    "sku_id": "string",
    "category": "FRAME | OPTICAL_LENS | CONTACT_LENS | ACCESSORY | SERVICE | WATCH",
    "category_class": "MASS | PREMIUM | LUXURY"
  },
  "discount": {
    "type": "PERCENT | FLAT",
    "value": "number"
  },
  "reason": "string"
}

---

## Response

{
  "status": "PENDING_APPROVAL",
  "approval_task_id": "string",
  "required_role": "MANAGER | ADMIN | SUPERADMIN"
}

---

## API: Approve Discount
POST /discounts/approve

### Request Body

{
  "approval_task_id": "string",
  "approver_user_id": "string",
  "decision": "APPROVED | REJECTED",
  "remarks": "string"
}

---

## Response

{
  "status": "FINALIZED",
  "decision": "APPROVED | REJECTED"
}

---

## API: Discount Intelligence (READ-ONLY)
GET /discounts/intelligence

### Purpose
Provide pattern-based insights only.

### Response

{
  "flags": [
    {
      "type": "NEAR_LIMIT | CATEGORY_HOPPING | TIME_BASED",
      "severity": "LOW | MEDIUM | HIGH",
      "description": "string"
    }
  ],
  "visibility": "ADMIN | SUPERADMIN"
}

---

## HARD GOVERNANCE RULES

- No auto-approval
- No AI decision authority
- Approval history immutable
- Discount decision MUST be logged
- Role escalation cannot be bypassed

---

END DISCOUNT API CONTRACTS
