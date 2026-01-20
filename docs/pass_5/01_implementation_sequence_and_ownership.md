# Implementation Sequence & Ownership (IMS 2.0)

STATUS: EXECUTION-COORDINATION
BUILD PASS: 5
LOCK LEVEL: HIGH
AUTHORITY: SYSTEM_INTENT.md + PASSES 3 & 4

---

## PURPOSE

Defines:
- Build order
- Module ownership
- Parallelization boundaries
- What must exist before what

NO CODE  
NO DESIGN  
NO LOGIC REDEFINITION  

---

## BUILD SEQUENCE (NON-NEGOTIABLE)

### PHASE 1 — FOUNDATIONAL
Must be completed first:
- Identity & Roles
- Audit & Event Logging
- Core Entities (orders, order_items, bills)

Nothing else may ship before this.

---

### PHASE 2 — TRANSACTIONAL CORE
Depends on Phase 1:
- POS Order Flow
- Pricing & Discount Engine
- State Machines & Locks

---

### PHASE 3 — CLINICAL & INVENTORY
Depends on Phase 2:
- Prescription handling
- Inventory movements
- Stock reservation

---

### PHASE 4 — PAYMENTS & INVOICING
Depends on Phase 2:
- Payments
- Invoice generation
- Financial finality

---

### PHASE 5 — REPORTING & OBSERVABILITY
Depends on all above:
- Reports
- Exports
- Monitoring

---

## OWNERSHIP RULES

Each domain must have:
- One owning team or agent
- Clear mutation authority
- No cross-domain writes

Ownership conflicts are escalated, not resolved ad-hoc.

---

## PARALLELIZATION RULE

Teams may work in parallel **only if**:
- They share no write-path entities
- They integrate via declared contracts

---

LOCKED.
