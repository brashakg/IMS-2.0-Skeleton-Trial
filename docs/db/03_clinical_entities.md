# DB SCHEMA — CLINICAL ENTITIES
IMS 2.0

Supports optical prescription lifecycle.

---

## 1. PATIENTS

Fields:
- id (UUID, PK)
- customer_id
- name
- dob
- gender
- created_at

---

## 2. PRESCRIPTIONS

Fields:
- id (UUID, PK)
- patient_id
- optometrist_id
- source (IN_STORE / DOCTOR)
- remarks
- created_at
- valid_till

---

## 3. PRESCRIPTION_VALUES

Fields:
- id (UUID, PK)
- prescription_id
- eye (LEFT / RIGHT)
- sph
- cyl
- axis
- add_power
- prism
- base

RULE:
- Immutable once used in sale (only override via audit).

---

END CLINICAL ENTITIES
