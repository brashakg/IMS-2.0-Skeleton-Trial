# 01 — Identity & Authority Tables

## USERS
Represents a physical human being.

Fields:
- user_id (UUID, immutable)
- full_name
- mobile_number (unique)
- email (optional)
- status (active / inactive / terminated)
- created_at
- deactivated_at

Rules:
- Users are NEVER deleted
- Termination = status change only

---

## ROLES
Defines functional roles.

Fields:
- role_id
- role_name (Sales, Store Manager, Optometrist, Admin, Superadmin, etc.)
- scope_level (store / area / hq / global)

Rules:
- Roles are predefined
- Role names cannot be edited after creation

---

## USER_ROLE_MAPPING
Allows multi-role users.

Fields:
- user_role_id
- user_id
- role_id
- assigned_by
- assigned_at
- revoked_at (nullable)

Rules:
- Role removal never deletes history
- One user can hold multiple roles simultaneously

---

## AUTHORITY_MATRIX
Defines permissions.

Fields:
- authority_id
- role_id
- action_code
- allowed (true/false)
- approval_required (true/false)
- escalation_role (if any)

Rules:
- No default allow
- Everything explicit
- Changes require Superadmin approval

---

END OF IDENTITY & AUTHORITY
