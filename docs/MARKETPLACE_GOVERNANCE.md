# MARKETPLACE & SALES CHANNEL GOVERNANCE — IMS 2.0
Retail Operating System (Channel-Orchestrated, Not Channel-Dependent)

## Purpose
To ensure **one source of truth** while selling across:
- Physical stores
- Shopify (D2C)
- Marketplaces (Amazon, Flipkart, etc.)
- WhatsApp / Assisted Commerce

This system prevents:
- Price mismatch
- Inventory leakage
- Channel abuse
- SLA blindness
- Staff confusion

---

## CORE PRINCIPLES

1. IMS is the **brain**, channels are **mouths**
2. Pricing authority always lies with HQ
3. Inventory truth always lies with IMS
4. Channels never decide logic
5. SLAs are enforced, not assumed

---

## SUPPORTED SALES CHANNELS

### Primary
- In-Store POS
- Shopify (Customer Frontend)

### Secondary (Adapters)
- Amazon
- Flipkart
- Future marketplaces (extensible)

Each channel has:
- Adapter
- Sync rules
- SLA expectations
- Failure handling

---

## PRODUCT SYNC GOVERNANCE

### Product Creation Authority
- Only Catalog Manager / Admin / Superadmin
- Created once in IMS
- Never created inside marketplaces

### Sync Rules
When product is marked active on channels:
- SKU → unified
- MRP → identical across all channels
- Offer Price → identical across all channels
- Stock → deducted centrally

❌ Channel-level price edits blocked  
❌ Channel-only SKU creation blocked  

---

## INVENTORY GOVERNANCE ACROSS CHANNELS

Inventory states:
- Available
- Reserved (order placed)
- In transit
- Damaged
- Returned
- Quarantined

### Rules
- Online orders reserve stock instantly
- Offline sales override online reservations only with approval
- Failed sync auto-pauses channel sales

---

## ORDER FLOW (ONLINE)

1. Order placed on channel
2. IMS receives webhook
3. Stock reserved
4. Store / HQ assigned for fulfillment
5. SLA timer starts
6. Customer notified automatically

---

## SLA ENGINE (CRITICAL)

### SLA Types
- Order acknowledgement
- Dispatch time
- Delivery confirmation
- Return processing

Each SLA has:
- Clock
- Escalation ladder
- Visibility

### Breach Handling
- Task auto-created
- Store / HQ notified
- Repeated breaches flagged (read-only insight)

---

## MARKETPLACE RETURN GOVERNANCE

### Customer Return
- Initiated on channel
- Reflected in IMS
- Inventory marked quarantined
- Finance notified

### Vendor Return
- Only via IMS
- Tracking mandatory
- Credit note linked

---

## PRICE & DISCOUNT SAFETY

Channel pricing must obey:
- MRP rules
- Offer price rules
- Discount caps
- Luxury category restrictions

Violations:
- Block sync
- Raise audit task
- Superadmin visibility

---

## WHATSAPP COMMERCE

Allowed:
- Order status updates
- Prescription access (OTP protected)
- Delivery notifications
- Payment links

Not allowed:
- Manual price negotiation
- Off-system order creation

---

## AI ROLE (READ-ONLY)

AI may:
- Detect channel price drift
- Spot inventory leakage
- Identify SLA bottlenecks
- Recommend channel pause

AI cannot:
- Change prices
- Pause channels
- Accept orders

---

## FAILURE MODE SIMULATIONS

### Pattern 1 — Channel Overselling
Action:
- Auto-pause channel
- Escalate to Admin

### Pattern 2 — Staff Diverting Online Stock
Action:
- Task created
- Behavioural pattern flagged

### Pattern 3 — Silent Price Mismatch
Action:
- Sync blocked
- Audit alert

---

## GOVERNANCE GUARANTEES

- ❌ No channel autonomy
- ❌ No silent sync failures
- ❌ No price divergence
- ✅ IMS always wins
- ✅ Customer experience preserved

---

END OF MARKETPLACE GOVERNANCE
