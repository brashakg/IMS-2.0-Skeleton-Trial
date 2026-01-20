# Role, Permission & Approval Wiring (IMS 2.0)

STATUS: DESIGN-ONLY (READ-ONLY)
BUILD PASS: 3
STEP: 8
LOCK LEVEL: VERY HIGH (governance & control)
AUTHORITY: SYSTEM_INTENT.md

---

## PURPOSE

This document defines the **authoritative data-level wiring** between:
- Roles
- Permissions
- Approval authority
- Enforcement hooks across POS, Clinical, Finance, Inventory

It ensures that:
- Power is explicitly bounded
- Approvals are contextual, not absolute
- No role can silently exceed its authority

NO UI  
NO CODE  
NO CALCULATIONS  
NO BUSINESS RULE RE-DEFINITION  

---

## CORE PRINCIPLES (LOCKED)

1. **Roles grant capability, not immunity**
2. **Permissions are contextual**
3. **Approvals are bounded events**
4. **Authority is captured at action time**

---

## ROLE MODEL (AUTHORITATIVE)

**Primary Entities**
- `roles`
- `users`
- `user_roles`

### Rules
- A user may have multiple roles
- Effective role is resolved per action
- Role escalation is never implicit
- Temporary roles must be time-bound and logged

---

## PERMISSION MODEL

**Primary Entities**
- `permissions`
- `role_permissions`

### Permission Characteristics
- Permissions are atomic
- Bound to:
  - action
  - entity_type
  - context (POS / Admin / System)
- Permissions do not imply approval authority

---

## APPROVAL AUTHORITY MODEL

**Primary Entities**
- `approval_policies`
- `approval_limits`

### Approval Policy Bindings
- role_id
- category_id (nullable where applicable)
- approval_type (discount / override / void)
- max_value / scope
- escalation_required (boolean)

Approval authority is **quantified and bounded**.

---

## ENFORCEMENT TOUCHPOINTS

### 1. POS ACTIONS

Examples:
- Item addition
- Pricing review
- Discount request

**Rules**
- Permission required to initiate
- Approval policy evaluated if thresholds exceeded
- All attempts logged regardless of outcome

---

### 2. CLINICAL ACTIONS

Examples:
- Prescription creation
- Prescription locking
- Clinical overrides

**Rules**
- Clinical roles only
- Cross-role action forbidden
- Violations logged as clinical abuse attempts

---

### 3. FINANCIAL ACTIONS

Examples:
- Discount approval
- Bill void
- Payment reversal request

**Rules**
- Dual validation: permission + approval limit
- Post-bill actions heavily restricted
- Superadmin actions always logged with reason

---

### 4. INVENTORY ACTIONS

Examples:
- Stock adjustment
- Manual loss entry

**Rules**
- Category-sensitive permission checks
- Threshold-based escalation
- Repeated attempts trigger abuse monitoring

---

## ROLE CONTEXT RESOLUTION (CRITICAL)

At every enforcement point, the system captures:
- user_id
- active_role_id
- permission_set snapshot
- approval_limits snapshot

Snapshots are immutable and stored with the event.

---

## CONFLICT & ESCALATION RULES

- If multiple roles apply, **most restrictive rule wins**
- If approval limit is exceeded:
  - Action is blocked
  - Escalation event generated
- No fallback to higher role without explicit reassignment

---

## AUDIT REQUIREMENTS

Every permission or approval interaction logs:
- user_id
- role_id
- permission_id
- approval_policy_id (if evaluated)
- decision (allowed / blocked / escalated)
- timestamp

No silent permission grants. No retroactive edits.

---

## AI GOVERNANCE

AI may:
- Explain why an action is blocked
- Summarize role authority

AI may NOT:
- Recommend role switching
- Suggest approval workarounds
- Escalate authority

AI reads generate audit events.

---

## LOCK NOTE

This document:
- Defines how **power flows** inside IMS 2.0
- Prevents privilege creep and silent abuse
- Is mandatory for governance integrity

Any relaxation requires SYSTEM_INTENT revision.
