# IMS 2.0 — API Contracts & Authority Gates
(Build Pass 3 – Step 2)

This folder defines **how the frontend is allowed to talk to the system**.

These are:
- Logical API contracts
- Authority requirements
- Explicit denials
- Escalation triggers

This is NOT implementation code.
This is NOT tied to REST / GraphQL.
This is SYSTEM GOVERNANCE.

---

## Core Rules

- No endpoint is public
- Every request is role-validated
- Every mutation is authority-checked
- Every denial is explainable
- Every override is logged

---

## API TYPES

1. READ APIs (safe, non-mutating)
2. WRITE APIs (mutating, gated)
3. APPROVAL APIs (two-step)
4. OVERRIDE APIs (Superadmin only)

---

END OF API OVERVIEW
