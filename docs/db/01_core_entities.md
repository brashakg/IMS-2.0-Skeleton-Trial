# CORE ENTITIES — DATABASE SCHEMA (DESIGN ONLY)
Build Pass 3 – Step 1  
Authority: SYSTEM_INTENT.md

---

## IMPORTANT
- This document defines **logical schema only**
- ❌ No DB engine assumed
- ❌ No migrations
- ❌ No indexes unless explicitly stated
- ✅ This is canonical and overrides assumptions

---

## 1. ORGANIZATION

Represents the legal business entity.

### Table: organizations
| Field | Type | Rules |
|-----|-----|-----|
| id | UUID | Primary key |
| legal_name | String | Immutable |
| trade_name | String | Optional |
| gstin | String | Immutable once set |
| created_at | Timestamp | Auto |
| created_by | User ID | Audit |
| status | Enum | ACTIVE / SUSPENDED |

---

## 2. LOCATION (STORE / UNIT)

Every operation happens in a location context.

### Table: locations
| Field | Type | Rules |
|-----|-----|-----|
| id | UUID | Primary key |
| organization_id | UUID | FK → organizations |
| location_code | String | Immutable, unique |
| display_name | String | |
| city | String | |
| state | String | |
| is_hq | Boolean | Only one true per org |
| status | Enum | ACTIVE / INACTIVE |
| created_at | Timestamp | |
| created_by | User ID | Audit |

---

## 3. USERS

Authentication identity only (NOT role).

### Table: users
| Field | Type | Rules |
|-----|-----|-----|
| id | UUID | Primary key |
| username | String | Unique, immutable |
| email | String | |
| phone | String | |
| is_active | Boolean | |
| created_at | Timestamp | |
| created_by | User ID | |

---

## 4. ROLES

System-defined authority units.

### Table: roles
| Field | Type | Rules |
|-----|-----|-----|
| id | UUID | Primary key |
| role_code | String | Immutable (e.g. STORE_MANAGER) |
| description | String | |
| hierarchy_level | Integer | Lower = more power |
| created_at | Timestamp | |

---

## 5. USER ↔ ROLE ↔ LOCATION MAPPING

Multi-role, multi-location enforcement.

### Table: user_roles
| Field | Type | Rules |
|-----|-----|-----|
| id | UUID | Primary key |
| user_id | UUID | FK → users |
| role_id | UUID | FK → roles |
| location_id | UUID | FK → locations |
| active | Boolean | |
| assigned_at | Timestamp | |
| assigned_by | User ID | Audit |

---

## 6. AUDIT LOG (GLOBAL)

Mandatory for ALL critical actions.

### Table: audit_logs
| Field | Type | Rules |
|-----|-----|-----|
| id | UUID | Primary key |
| entity_type | String | e.g. ORDER, PRODUCT |
| entity_id | UUID | |
| action | String | CREATE / UPDATE / APPROVE |
| previous_value | JSON | Nullable |
| new_value | JSON | Nullable |
| performed_by | User ID | |
| performed_at | Timestamp | |
| location_id | UUID | FK → locations |

---

## NON-NEGOTIABLE RULES

- ❌ No hard deletes
- ❌ No role without location
- ❌ No action without audit entry
- ❌ No user authority inferred implicitly
- ✅ Everything traceable to a user + location

---

END CORE ENTITIES
