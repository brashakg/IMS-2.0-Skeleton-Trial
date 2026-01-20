# Testing, Validation & Release Rules (IMS 2.0)

STATUS: EXECUTION-COORDINATION
BUILD PASS: 5
LOCK LEVEL: HIGH
AUTHORITY: PASSES 3–5

---

## PURPOSE

Ensures the system is testable, defensible, and releasable.

---

## TEST SOURCES (MANDATORY)

Tests must be derived from:
- State machines
- Category enforcement
- Discount abuse simulations
- Role violations

If a rule exists, a test must exist.

---

## REQUIRED TEST TYPES

- Unit (pure logic)
- Contract (API shape)
- Flow (POS happy path)
- Abuse (intentional misuse)
- Regression (post-lock behavior)

---

## RELEASE GATES

A release is blocked if:
- Audit events missing
- Enforcement bypass possible
- Post-lock mutation allowed

No exceptions.

---

## ROLLBACK RULES

- Rollback must preserve audit logs
- Financial data is never reverted
- Partial orders must remain inspectable

---

LOCKED.
