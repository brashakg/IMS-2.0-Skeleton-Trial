# Coding & Execution Laws (IMS 2.0)

STATUS: EXECUTION (CODE-AUTHORIZING)
BUILD PASS: 6
LOCK LEVEL: ABSOLUTE
AUTHORITY: SYSTEM_INTENT.md + PASSES 3, 4, 5

---

## PURPOSE

This document defines the **non-negotiable laws** under which all code for IMS 2.0 is written.

If code violates this document, it is invalid — even if it “works”.

---

## CORE EXECUTION LAWS

1. Data authority > code convenience
2. Backend decides, frontend reflects
3. No silent mutations
4. No implicit state changes
5. Every enforcement must be explicit
6. Every rejection must be explainable
7. Audit precedes success

---

## CODE OWNERSHIP LAW

Each domain owns its data and logic:

- Identity & Roles
- Orders & POS
- Pricing & Discounts
- Clinical
- Inventory
- Billing & Payments
- Audit & Reporting

Rules:
- No cross-domain table writes
- No shared “utility” logic that mutates state
- Integration only via explicit contracts

---

## STATE MACHINE ENFORCEMENT (MANDATORY)

- State transitions must be coded explicitly
- Invalid transitions must hard-fail
- No “skip”, “force”, or “override” paths
- State checks must exist in service layer (not UI)

---

## CATEGORY & DISCOUNT ENFORCEMENT

Code must:
- Validate category attributes at write time
- Reject incomplete or invalid payloads
- Enforce discount limits before pricing lock
- Block post-bill mutations unconditionally

No exception flags allowed.

---

## AUDIT LAW

Every one of the following MUST emit an audit event:

- State change
- Discount request / approval / rejection
- Enforcement failure
- Role violation
- Payment attempt
- Invoice issuance
- AI read of protected data

Audit failures = build failure.

---

## ERROR HANDLING LAW

All errors must return:
- error_type
- reason_code
- reference_id

No generic 500s for business violations.

Frontend must surface errors verbatim.

---

## AI IN CODE (STRICT)

AI-generated code:
- Must follow same laws
- Cannot bypass enforcement
- Cannot introduce shortcuts
- Cannot weaken audit

AI suggestions are reviewed like human PRs.

---

## PROHIBITED PATTERNS

- Soft deletes
- “Admin override” flags
- Price edits post-lock
- Client-side permission inference
- Background silent fixes
- Schema changes without migration

---

## LOCK NOTE

This document governs **every line of code** written for IMS 2.0.

Violations are not bugs — they are system breaches.
