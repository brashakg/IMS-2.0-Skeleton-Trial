# Execution Rules — Backend, Frontend, Testing & Deployment (IMS 2.0)

STATUS: EXECUTION-RULES (NO CODE)
BUILD PASS: 4
COVERS: Steps 2–6 (Merged)
LOCK LEVEL: VERY HIGH (execution authority)
AUTHORITY: SYSTEM_INTENT.md + BUILD PASS 3 + PASS 4 STEP 1

---

## PURPOSE

This document consolidates **all remaining Build Pass 4 execution rules** into a single source.

It defines:
- Backend service boundaries
- Frontend mutation constraints
- Validation and error-surface rules
- Test case derivation from enforcement & abuse
- Deployment and rollout constraints

NO CODE  
NO UI MOCKS  
NO BUSINESS LOGIC REDEFINITION  

---

## 1. BACKEND SERVICE BOUNDARY RULES

Backend services must be **segregated by authority**, not convenience.

### Mandatory Service Domains
- Identity & Roles
- POS & Orders
- Clinical
- Inventory
- Pricing & Discounts
- Billing & Payments
- Audit & Reporting

Rules:
- No service may directly mutate another service’s core entity
- Cross-service actions happen via validated requests
- Enforcement always executes in owning service

Frontend never talks to more than one domain per action.

---

## 2. FRONTEND STATE & MUTATION CONSTRAINTS

Frontend state is **ephemeral** and **derived**.

Frontend MUST NOT:
- Store pricing logic
- Cache discount decisions
- Infer permissions
- Reconstruct state transitions

Frontend MAY:
- Reflect backend state
- Show pending / blocked / approved states
- Retry only idempotent actions

All state truth lives server-side.

---

## 3. VALIDATION & ERROR-SURFACE RULES

Every backend rejection must return:
- Error category (STATE / ROLE / ENFORCEMENT / SYSTEM)
- Human-readable reason
- Reference ID

Frontend must:
- Display rejection verbatim
- Block forward flow
- Never auto-correct or auto-retry violations

Silent failure is forbidden.

---

## 4. TEST CASE DERIVATION (MANDATORY)

Test cases must be generated from:
- Category enforcement rules
- Discount abuse simulations
- State machine violations
- Role overreach scenarios

Minimum test classes:
- Happy path
- Boundary limits
- Repeated abuse attempts
- Cross-category conflicts
- Post-lock mutation attempts

If a test cannot be derived, the rule is incomplete.

---

## 5. DEPLOYMENT & ROLLOUT CONSTRAINTS

Deployment must respect:
- Backward compatibility of locked entities
- Append-only migrations
- Feature flags for new flows only

Rules:
- No destructive migrations
- No silent schema changes
- Rollback must preserve audit integrity

POS rollout must allow:
- Parallel old/new flow only if audit-safe
- No mixed-state orders

---

## 6. OBSERVABILITY & SAFETY

System must expose:
- State stuck detection
- Repeated enforcement failures
- Discount attempt frequency
- Role violation spikes

These feed monitoring dashboards (out of scope here).

---

## AI GOVERNANCE (PASS 4)

AI may:
- Explain errors
- Summarize execution rules
- Assist debugging (read-only)

AI may NOT:
- Suggest bypasses
- Generate test overrides
- Modify execution paths

---

## LOCK NOTE

This file completes **Build Pass 4 execution authority**.

No further Build Pass 4 documents are required.
Any change beyond this point requires a new Build Pass.
