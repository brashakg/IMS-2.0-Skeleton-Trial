# TASKS, SOPs & ESCALATION ENGINE — IMS 2.0

## Purpose
To enforce accountability, timelines, SOP compliance,
and escalation discipline across the organization.

No task is informal.
No miss is silent.
No delay is invisible.

---

## 1. TASK TYPES

Tasks can be created by:
- System (auto-generated)
- Human (role-based)

Task categories:
- SOP Mandatory
- SOP Optional
- Operational
- Finance
- Clinical
- Inventory
- HR
- Escalation
- AI Advisory Follow-up

---

## 2. TASK PRIORITY LEVELS

Priority Levels:
1. Critical (Red)
2. High (Orange)
3. Medium (Yellow)
4. Low (Blue)

Rules:
- Color system is enforced (non-customizable)
- Priority affects escalation time
- Priority affects visibility

---

## 3. TASK ATTRIBUTES (MANDATORY)

Every task has:
- Task Type
- Priority
- Due Date
- Assigned Role/User
- Origin (System / User / AI)
- Linked Entity (Order / GRN / Employee / Store / SKU)
- Escalation Matrix
- Audit Trail

No task can be created without due date.

---

## 4. SOP TASKS

SOP tasks are:
- Mandatory or Optional
- Time-bound
- Non-deletable

Examples:
- Daily Cash Closing
- Stock Acceptance
- Prescription Validation
- Expense Approval
- Attendance Approval

Rules:
- Mandatory SOP tasks cannot be skipped
- Delay auto-triggers escalation

---

## 5. TASK LIFECYCLE

States:
1. Created
2. In Progress
3. Completed
4. Overdue
5. Escalated
6. Closed (Audit complete)

Completion requires:
- Evidence (if required)
- Comment
- Timestamp

---

## 6. ESCALATION ENGINE

Escalation is automatic.

Triggers:
- Missed deadline
- Incorrect completion
- Data mismatch
- Repeated behavior patterns

Escalation Levels:
- Level 1 → Store Manager
- Level 2 → Area Manager
- Level 3 → Admin (HQ)
- Level 4 → Superadmin

Escalations cannot be dismissed without resolution.

---

## 7. CROSS-MODULE AUTO TASKS

Examples:
- Stock mismatch → Inventory Task
- Discount override → Finance Task
- Prescription edit → Clinical Task
- Attendance anomaly → HR Task
- GST unlock → Finance + Audit Task

---

## 8. AI-GENERATED TASKS (READ-ONLY)

AI can:
- Recommend tasks
- Flag suspicious behavior
- Suggest SOP changes

AI cannot:
❌ Assign tasks directly  
❌ Close tasks  
❌ Override SOPs  

Human approval required.

---

## 9. VISIBILITY RULES

- Staff → Only their tasks
- Manager → Team tasks
- Area → Multi-store tasks
- Admin → All except Superadmin-only
- Superadmin → Everything

---

## 10. AUDIT & LOGGING

Every task logs:
- Creator
- Assignee
- Status changes
- Escalations
- Resolution notes

Audit logs are immutable.

END TASKS & SOP ENGINE
