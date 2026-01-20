# Execution Build Plan & Mandatory Checks (IMS 2.0)

STATUS: EXECUTION (BUILD PLAN)
BUILD PASS: 6
LOCK LEVEL: VERY HIGH
AUTHORITY: PASSES 3–6

---

## PURPOSE

This document defines:
- What is coded first
- What blocks what
- What must be checked before moving forward

This is the **only allowed execution order**.

---

## PHASE 1 — FOUNDATION (BLOCKING)

Must be completed first:

- User, role, permission models
- Audit event infrastructure
- Core entities (orders, order_items, bills)

BLOCKERS:
- No POS code before audit exists
- No pricing without state machine

---

## PHASE 2 — POS CORE

Includes:
- Order creation
- Item attachment
- State transitions
- Pricing lock

MANDATORY CHECKS:
- Invalid state transitions fail
- Pricing is computed server-side only
- Discounts cannot apply without approval

---

## PHASE 3 — CLINICAL & INVENTORY

Includes:
- Patient & prescription handling
- Prescription-bound lens enforcement
- Stock reservation & movement

MANDATORY CHECKS:
- Clinical data cannot bypass prescription
- Inventory cannot move without category rules
- Loss & adjustments are explicit

---

## PHASE 4 — PAYMENTS & INVOICING

Includes:
- Payment attempts
- Partial payments (if allowed)
- Invoice generation

MANDATORY CHECKS:
- Bill immutability enforced
- Payments append-only
- Invoice generated only after payment success

---

## PHASE 5 — REPORTING & OBSERVABILITY

Includes:
- Read-only reporting endpoints
- Export generation
- Compliance access

MANDATORY CHECKS:
- No report mutates data
- Exports are snapshots
- All access logged

---

## TESTING GATES (HARD)

A phase cannot be marked complete unless:
- Happy-path tests pass
- Abuse tests pass
- Enforcement failure tests pass
- Audit events verified

---

## RELEASE GATE

A release is blocked if:
- Any enforcement can be bypassed
- Any audit event is missing
- Any post-lock mutation is possible

---

## ROLLBACK RULE

Rollback must:
- Preserve audit history
- Preserve financial truth
- Never delete records

---

## LOCK NOTE

This document closes the loop between design and execution.

If build order or checks are skipped, the system is invalid.
