# Emergent & Agent Usage Rules (IMS 2.0)

STATUS: EXECUTION-COORDINATION
BUILD PASS: 5
LOCK LEVEL: VERY HIGH
AUTHORITY: SYSTEM_INTENT.md

---

## PURPOSE

Defines how AI agents (including Emergent) may be used during implementation.

---

## PRIMARY AUTHORITY FILES (FOR AI)

Agents must prioritize:
1. SYSTEM_INTENT.md
2. POS_FLOW_AND_ENFORCEMENT (Pass 3 + 4)
3. EXECUTION RULES (Pass 4 + 5)

Other files are reference-only.

---

## ALLOWED AI ACTIONS

AI may:
- Explain rules
- Summarize contracts
- Generate boilerplate code (if allowed later)

AI may NOT:
- Invent flows
- Relax enforcement
- Merge roles or permissions

---

## CONTEXT OPTIMIZATION RULE

When using Emergent:
- Load only authority files
- Avoid loading abuse simulations unless testing
- Never load entire repo blindly

This reduces cost and hallucination risk.

---

LOCKED.
