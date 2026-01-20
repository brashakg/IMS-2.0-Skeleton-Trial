# POS Frontend Wiring Rules (IMS 2.0)

STATUS: EXECUTION-RULES (NO CODE)
BUILD PASS: 4
STEP: 1
LOCK LEVEL: VERY HIGH (UI cannot bypass system law)
AUTHORITY: SYSTEM_INTENT.md + BUILD PASS 3 (ALL)

---

## PURPOSE

This document defines **strict wiring rules** for the POS frontend.

Its role is to ensure:
- UI mirrors system state, never invents it
- No frontend path can bypass enforcement
- POS flows are linear, state-driven, and auditable

This document defines:
- What the frontend MAY do
- What the frontend MUST NOT do
- How frontend reacts to backend states

NO UI DESIGNS  
NO COMPONENT MOCKS  
NO CODE  

---

## CORE PRINCIPLE (LOCKED)

> **Frontend is a controlled surface, not a decision maker.**

Frontend:
- Requests
- Displays
- Confirms

Backend:
- Decides
- Enforces
- Rejects

---

## POS FLOW BINDING (NON-NEGOTIABLE)

Frontend must enforce **exact flow order**:

Customer  
→ Patient  
→ Prescription  
→ Lens  
→ Frame  
→ Pricing  
→ Billing  
→ Payment  
→ Invoice  

UI navigation **must hard-block** skipping steps.

---

## SCREEN → STATE BINDING RULE

Each POS screen must bind to:
- A **single backend entity**
- A **single allowed state set**

| Screen | Entity | Allowed State |
|------|------|-------------|
| Customer | customers | ANY |
| Patient | patients | ANY |
| Prescription | prescriptions | DRAFT only |
| Lens Selection | orders / order_items | CREATED / ITEMS_ATTACHED |
| Frame Selection | orders / order_items | ITEMS_ATTACHED |
| Pricing | orders | PRICING_REVIEWED |
| Billing | bills | GENERATED |
| Payment | payments | INITIATED |
| Invoice | invoices | ISSUED |

Frontend must **refuse render** if state mismatch occurs.

---

## DATA OWNERSHIP RULES

Frontend:
- Never calculates price
- Never calculates discount
- Never derives totals
- Never mutates state directly

Frontend MAY:
- Display snapshots
- Send intent (request / approve / confirm)
- Display rejection reasons verbatim

---

## DISCOUNT UI RULES

- UI may **request** discounts only
- UI may **display** approval status
- UI must not allow:
  - Manual price edits
  - Hidden discount fields
  - Discount stacking via UI tricks

All discount failures must surface **exact backend reason codes**.

---

## ERROR HANDLING RULES (CRITICAL)

If backend responds with:
- `ENFORCEMENT_FAILED`
- `STATE_VIOLATION`
- `ROLE_VIOLATION`

Frontend must:
1. Block forward navigation
2. Display reason (non-editable)
3. Log user acknowledgment
4. Offer return to last valid step

Silent retry is forbidden.

---

## ROLE-AWARE UI GATING

Frontend visibility:
- Is driven by backend role resolution
- Must not infer permissions client-side

If backend says:
- “Action not permitted”

UI must not:
- Hide the reason
- Offer workaround paths

---

## AI IN POS UI (STRICT)

AI (if visible in POS):
- Read-only explanations
- No suggestions
- No shortcuts
- No auto-actions

AI output must be labeled **“Advisory only”**.

---

## OFFLINE / FAILURE RULES

- No offline POS flow allowed for billing
- Payment requires confirmed backend state
- Failed network = frozen POS at last safe state

No optimistic UI for money or clinical steps.

---

## AUDIT VISIBILITY

Frontend must:
- Display reference IDs (order_id, bill_id)
- Never suppress audit-related messages
- Never mask enforcement failures

---

## LOCK NOTE

This document:
- Binds UI behavior to system law
- Prevents frontend-led abuse
- Is mandatory for POS correctness

Any UI freedom beyond this requires SYSTEM_INTENT revision.