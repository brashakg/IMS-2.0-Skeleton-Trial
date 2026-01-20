# 03 — Transactions, Tasks & Audit

## SALES_TRANSACTION
Immutable sales record.

Fields:
- sale_id
- store_id
- user_id
- customer_id
- total_amount
- payment_breakup (JSON)
- created_at

Rules:
- No deletion
- No edit after invoice

---

## INVENTORY_MOVEMENT
Every stock change.

Fields:
- movement_id
- product_id
- from_store
- to_store
- quantity
- reason_code
- created_by
- created_at

Rules:
- No negative stock without escalation
- All mismatches create tasks

---

## TASKS
Unified task engine.

Fields:
- task_id
- task_type (system / manual / sop)
- priority (P0–P4)
- assigned_to
- due_at
- status
- created_at

Rules:
- Tasks never deleted
- Closure requires justification if escalated

---

## ESCALATIONS
Tracks escalation flow.

Fields:
- escalation_id
- task_id
- from_role
- to_role
- triggered_at
- resolved_at

---

## ABUSE_SIGNALS
Read-only intelligence.

Fields:
- signal_id
- signal_type (discount / clinical / finance)
- reference_id
- severity
- detected_at

Rules:
- No auto-block
- No staff visibility

---

## AUDIT_LOG
System-wide immutable log.

Fields:
- audit_id
- actor_id
- action
- entity_type
- entity_id
- timestamp

Rules:
- Cannot be edited
- Cannot be disabled

---

END OF TRANSACTIONS & AUDIT
