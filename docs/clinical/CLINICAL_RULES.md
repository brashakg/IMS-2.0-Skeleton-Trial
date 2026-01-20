# CLINICAL & OPTOMETRY RULES — IMS 2.0

## Purpose
To ensure clinical accuracy, legal safety, accountability, and continuity of care.
Clinical data is **medical data**, not sales data.

No silent edits. No overwrites. No shortcuts.

---

## 1. PATIENT vs CUSTOMER

Definitions:
- **Customer** = Paying entity
- **Patient** = Person whose eyes are tested

Rules:
- One customer can have multiple patients
- Every prescription is tied to ONE patient
- Orders must reference a valid patient

---

## 2. PRESCRIPTION CREATION AUTHORITY

Prescriptions can be created by:
- Optometrist (tested at store)
- Sales staff (only if “External Doctor” selected)

Restrictions:
- Only Optometrist can mark “Tested at Store”
- Optometrist identity is mandatory for in-store tests

---

## 3. PRESCRIPTION STRUCTURE (MANDATORY)

Each prescription must include:
- Right Eye (OD)
- Left Eye (OS)
- SPH, CYL, AXIS (Axis must be whole number 1–180)
- ADD (if applicable)
- Prism (if applicable)
- Remarks (mandatory)

System must block saving if:
- Axis is decimal
- Axis out of range
- Required values missing

---

## 4. PRESCRIPTION VERSIONING

Rules:
- Prescriptions are **immutable**
- Editing creates a **new version**
- Old versions remain visible (read-only)

Audit trail:
- Who created
- Who edited
- When
- Why (mandatory note)

---

## 5. PRESCRIPTION VALIDITY

Validity:
- Set by Optometrist at time of test
- Different validity allowed per patient case

System behavior:
- Expired prescriptions cannot be used for new orders
- Override allowed ONLY by Admin / Superadmin
- Override is logged

---

## 6. CLINICAL vs SALES BOUNDARY

Rules:
- Sales staff cannot modify clinical values
- Clinical screen is read-only once saved
- Any change requires optometrist or admin flow

---

## 7. CLINICAL LIABILITY PROTECTION

System must:
- Store original readings
- Store final prescription separately
- Record patient consent (implicit by order)

This protects:
- Optometrist
- Store
- Company

---

## 8. HOME EYE TESTS (IF ENABLED)

Rules:
- Appointment must be pre-logged
- Optometrist identity mandatory
- Geo-location captured
- Results treated same as store test

---

## 9. CLINICAL REPORTING

Track:
- Tests per optometrist
- Redo rates
- Complaint-linked prescriptions
- Time between test and sale

Visible to:
- Admin
- Superadmin
(Not staff)

---

## 10. DATA PRIVACY & ACCESS

- Clinical data visible only to:
  - Optometrist
  - Store Manager
  - Admin / Superadmin
- Never visible in public dashboards
- Never exported casually

---

END OF CLINICAL RULES
