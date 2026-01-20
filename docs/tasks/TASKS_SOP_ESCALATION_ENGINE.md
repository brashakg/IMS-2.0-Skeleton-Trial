# TASKS, SOP & ESCALATION ENGINE — GOVERNANCE FRAMEWORK
IMS 2.0 Retail Operating System

## Purpose
To ensure **nothing operational relies on memory, follow-ups, or individuals**.

This system:
- Converts deviations into tasks
- Converts tasks into accountability
- Converts delays into escalations
- Converts chaos into traceable execution

---

## CORE PRINCIPLES

1. **Every deviation creates a task**
2. **Every task has a clock**
3. **Every clock has an escalation**
4. **No task disappears silently**
5. **Human judgement overrides, but never erases history**

---

## TASK TYPES

### 1. SYSTEM-GENERATED TASKS (Automatic)
Created by the system when:
- Stock mismatch detected
- Payment variance occurs
- Prescription redo triggered
- GRN discrepancy found
- Attendance anomaly detected
- SLA breached

These cannot be deleted.

---

### 2. USER-GENERATED TASKS
Created by:
- Store Manager
- Admin
- Superadmin

Rules:
- Must have category
- Must have priority
- Must have due time
- Must have assignee

---

### 3. SOP-BOUND TASKS
Tasks auto-created from SOPs:
- Daily opening checklist
- Closing till checklist
- Stock acceptance
- Order follow-up
- Customer callback

---

## TASK ATTRIBUTES (MANDATORY)

| Attribute | Rule |
|------|------|
Title | Required |
Category | Mandatory (dropdown + Other) |
Priority | System-defined |
Assigned To | Mandatory |
Due Time | Mandatory |
Escalation Path | Auto-attached |
Audit Trail | Immutable |

---

## PRIORITY SYSTEM (NON-CUSTOMIZABLE COLORS)

| Priority | Meaning | Color |
|-------|--------|------|
P0 | Business Risk | Dark Red |
P1 | Urgent | Red |
P2 | Important | Orange |
P3 | Normal | Yellow |
P4 | Informational | Blue |

---

## ESCALATION ENGINE

### Time-Based Escalation
If task is:
- Not acknowledged → escalate
- Not resolved → escalate further

Escalation ladder example:

No skipping unless explicitly approved.

---

### Silence Detection
If:
- Task opened but untouched
- Task repeatedly postponed

System:
- Raises escalation
- Flags behavioural pattern (read-only insight)

---

## SOP ENGINE

### SOP Definition
Each SOP has:
- Trigger
- Task sequence
- Responsible role
- Completion window
- Escalation chain

### Example SOP — Stock Acceptance
1. Verify count
2. Verify barcode
3. Verify MRP vs Offer Price
4. Accept / Escalate

Failure to complete step auto-generates escalation task.

---

## TASK MUTATION RULES

| Action | Allowed |
|----|----|
Edit title | Admin+ |
Change assignee | Manager+ |
Change priority | Admin+ |
Close task | Owner only |
Force close | Superadmin only |

Every mutation logged.

---

## FAILURE MODE SIMULATIONS

### Pattern 1 — Task Flooding
System detects excessive task creation by same user.

Action:
- Flag to Admin
- No auto-block

---

### Pattern 2 — Escalation Avoidance
Repeated reassignment without closure.

Action:
- Escalation lock
- Superadmin visibility

---

### Pattern 3 — Fake Closures
Task closed immediately after escalation.

Action:
- Reopen
- Add justification requirement

---

## USER EXPERIENCE RULES

- Tasks highlighted on dashboard
- Color changes as urgency increases
- Countdown timers visible
- Explanation shown below task (why it exists)

---

## AUDIT & LEGAL SAFETY

- No task deletion
- No silent resolution
- Historical timelines preserved
- Reason mandatory for overrides

---

## GOVERNANCE GUARANTEES

- ❌ No hidden suppression
- ❌ No role-based silence
- ✅ Every deviation traceable
- ✅ Human override allowed, not invisible

---

END TASKS, SOP & ESCALATION ENGINE
