# EMERGENT EXECUTION PROMPTS — IMS 2.0
(Build Pass 3 — Step 5)

This file defines HOW Emergent must execute the build.
This is NOT feature documentation.
This is a STRICT build contract.

---

## GLOBAL BUILD RULES

1. This system is a **Retail Operating System**, not a POS.
2. Control > Convenience.
3. No assumptions.
4. No silent defaults.
5. If unclear → STOP and ASK.
6. Every screen must respect role authority.
7. Every action must be auditable.
8. AI is READ-ONLY and Superadmin-only.
9. No auto-execution by AI.
10. No demo/sample data.

---

## BUILD ORDER (MANDATORY)

Emergent MUST follow this sequence:

### PHASE 1 — NAVIGATION & SHELL
- Build sidebar navigation
- Build role-based route guards
- Build empty page shells
- No logic, no data

### PHASE 2 — SCREEN STRUCTURE ONLY
- Create screens exactly as per SCREENS.md
- Headings, sections, placeholders only
- NO business logic
- NO validations
- NO calculations

### PHASE 3 — ROLE VISIBILITY
- Hide/show screens by role
- Multi-role users must get role selector
- Superadmin sees all

### PHASE 4 — FORM STRUCTURE
- Create form fields
- Labels + helper text only
- No submission logic

### PHASE 5 — STATE LOCKING (VISUAL ONLY)
- Disabled states
- Locked indicators
- Approval-required banners

---

## FORBIDDEN ACTIONS (CRITICAL)

❌ Do NOT:
- Invent fields
- Combine roles
- Auto-fill values
- Auto-approve anything
- Implement business logic
- Implement AI actions
- Optimize UX shortcuts

Violation = rebuild.

---

## MODULE-SPECIFIC CONSTRAINTS

### POS
- Must follow workflow order strictly
- Discount overrides always block flow
- Payment split visible but locked

### INVENTORY
- No stock editable post-acceptance
- Barcode printing disabled until acceptance

### CLINICAL
- Prescription immutable after sale
- Validity mandatory

### FINANCE
- Locked periods non-editable
- Manual override Superadmin-only

### TASKS
- Tasks cannot be deleted
- Escalation timers visible

---

## AI EXECUTION RULES

AI MAY:
- Display insights
- Show patterns
- Suggest changes

AI MAY NOT:
- Modify UI
- Modify logic
- Execute workflows
- Approve anything

All AI output = advisory only.

---

## ERROR HANDLING

If Emergent encounters:
- Missing file
- Conflicting rule
- Ambiguous authority

It must:
1. Pause build
2. Ask Superadmin
3. Document question

---

## BUILD COMPLETION CRITERIA

A build is considered successful ONLY if:
- All screens exist
- All navigation works
- No logic exists
- No data exists
- No assumptions exist

---

END OF EXECUTION PROMPTS
