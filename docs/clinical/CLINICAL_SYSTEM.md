# CLINICAL / OPTOMETRY SYSTEM — IMS 2.0

## Purpose
To ensure:
- Accurate eye testing
- Prescription integrity
- Legal traceability
- Zero manipulation after issuance
- Clear accountability of optometrists

Clinical data is **medical data**, not retail data.

---

## 1. CLINICAL ACTORS

- Optometrist
- Store Manager (oversight only)
- Admin / Superadmin (audit only)

Sales staff **cannot edit clinical data**.

---

## 2. CLINICAL WORKFLOWS

### 2.1 Prescription Creation
- Linked to Patient
- Linked to Optometrist
- Linked to Store
- Linked to Timestamp

Prescription sources:
- Tested at Store (Optometrist mandatory)
- From Doctor (Optometrist optional, document upload mandatory)

---

## 3. PRESCRIPTION STRUCTURE (LOCKED)

Each prescription includes:
- SPH (R/L)
- CYL (R/L)
- Axis (1–180, whole number only)
- ADD
- Prism
- Base
- Acuity
- Remarks (mandatory)

Once saved:
- Cannot be edited
- Only versioned replacement allowed

---

## 4. PRESCRIPTION VERSIONING

If correction required:
- New prescription version created
- Previous version archived
- Reason mandatory
- Audit trail preserved

No overwrites allowed.

---

## 5. CLINICAL VALIDATIONS

System enforces:
- Axis must be integer 1–180
- Optometrist mandatory if tested at store
- Patient identity locked
- Prescription date immutable

Violation → hard stop.

---

## 6. CLINICAL TASK INTEGRATION

Auto-generated tasks:
- Prescription pending validation
- Missing optometrist assignment
- Doctor prescription missing document

Escalation if unresolved.

---

## 7. CLINICAL SALES LINKAGE

- Sales can only reference prescriptions
- Prescription chosen at order creation
- Prescription cannot be modified during sale

This prevents “sale-driven manipulation”.

---

## 8. CLINICAL AUDIT & COMPLIANCE

Audit logs include:
- Who created
- Who viewed
- Who used in sale
- Version history

Superadmin only.

---

## 9. AI ROLE (READ-ONLY)

AI may:
- Detect abnormal prescription patterns
- Flag repeated corrections
- Suggest optometrist training needs

AI cannot:
- Modify prescriptions
- Suggest medical values

---

## 10. DATA RETENTION

- Prescriptions retained as per medical guidelines
- Never auto-deleted
- Export requires Superadmin approval

---

END OF CLINICAL SYSTEM
