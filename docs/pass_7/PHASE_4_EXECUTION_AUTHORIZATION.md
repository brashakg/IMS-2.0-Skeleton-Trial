# Phase 4 Execution Authorization — Billing, Payments & Invoice (IMS 2.0)

STATUS: AUTHORIZED
BUILD PASS: 7
PHASE: 4

## AUTHORIZATION
Phase 4 execution is officially authorized.

Development may proceed strictly within the locked
Phase 4 scope and APIs.

## IN-SCOPE EXECUTION
- Bill creation from PRICING_LOCKED orders
- Payment recording (cash, UPI, card)
- Partial and mixed payments
- Outstanding balance tracking
- Invoice generation after full payment
- Printable invoice artifact
- Audit emission for all billing actions

## STRICT RULES
- Phase 2 and Phase 3 outputs are immutable
- No pricing or discount changes
- No inventory movement
- No refunds or credit notes
- No enquiry conversion
- No UI redesign
- Backend authority only

## ACCEPTANCE CRITERIA
Phase 4 is complete only when:
- All Phase 4 APIs are implemented
- Billing blocks invalid state transitions
- Payments reconcile correctly
- Invoice generation enforces full payment
- Audit events are emitted and verified
- No post-bill mutations are possible

## NEXT PHASE
Phase 5 may begin ONLY after
Phase 4 completion is formally declared.
