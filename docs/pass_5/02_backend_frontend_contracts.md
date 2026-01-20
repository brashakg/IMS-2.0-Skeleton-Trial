# Backend–Frontend Contracts (IMS 2.0)

STATUS: EXECUTION-COORDINATION
BUILD PASS: 5
LOCK LEVEL: VERY HIGH
AUTHORITY: PASSES 3 & 4

---

## PURPOSE

Defines how frontend and backend interact during implementation.

This prevents:
- UI-led logic
- Backend ambiguity
- Contract drift

---

## CONTRACT PRINCIPLES

- Backend owns truth
- Frontend sends intent
- Responses are authoritative
- Errors are final

---

## API CONTRACT RULES

- Contracts must match Pass 3 shapes exactly
- No optional fields unless explicitly declared
- Backward compatibility is mandatory

Breaking changes require new endpoints.

---

## FRONTEND EXPECTATIONS

Frontend must:
- Render backend state verbatim
- Never infer permissions
- Never simulate pricing or discounts

Frontend must not:
- Cache decisions
- Retry forbidden actions
- Hide enforcement failures

---

## ERROR CONTRACT

Every error response must include:
- error_type
- reason_code
- reference_id

Frontend must surface all three.

---

LOCKED.
