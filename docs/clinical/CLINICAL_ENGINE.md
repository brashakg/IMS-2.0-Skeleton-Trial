# CLINICAL / OPTOMETRY ENGINE — IMS 2.0

## Purpose
To manage eye tests, prescriptions, optometrist accountability,
medical validity, and controlled commercial usage of clinical data.

This module treats prescriptions as medical records, not sales tools.

---

## 1. CORE ENTITIES

- Patient
- Prescription
- Eye Test
- Optometrist
- Equipment (future)
- Prescription Validity

---

## 2. PRESCRIPTION CREATION RULES

Prescription Sources:
1. Tested at Store
2. External Doctor

Rules:
- "Tested at Store" REQUIRES optometrist selection
- External prescriptions require upload + remarks
- Manual entry allowed but flagged

Mandatory Fields:
- SPH, CYL, Axis (whole number 1–180)
- ADD (if applicable)
- PD (if applicable)
- Remarks (mandatory)
- Prescription date

---

## 3. OPTOMETRIST AUTHORITY & ACCOUNTABILITY

Each optometrist has:
- Registration ID (internal)
- Role assignment
- Prescription validity limits
- Override permissions (if any)

Tracking:
- Prescriptions issued per optometrist
- Rejection rate
- Sales conversion influence
- Repeat correction cases

---

## 4. PRESCRIPTION VALIDITY SYSTEM

Validity defined as:
- Default (HQ configurable)
- Optometrist-selected (within limits)
- Short-term / long-term flags

Rules:
- Expired prescriptions CANNOT be used for sales
- Overrides require Admin/Superadmin approval
- Expiry auto-triggers tasks & alerts

---

## 5. MULTIPLE PRESCRIPTIONS HANDLING

Allowed:
- Multiple prescriptions per patient
- Only ONE active prescription per order
- Historical prescriptions read-only

Rules:
- Active prescription must be selected explicitly
- System warns if older prescription is used

---

## 6. CLINICAL FLAGS & QUALITY CONTROLS

Auto Flags:
- Large prescription swings
- Frequent manual entries
- High remake percentage
- High rejection or correction rates

Flags generate:
- Internal alerts
- Review tasks
- Audit visibility (Admin+)

---

## 7. CLINICAL + SALES INTERACTION (CONTROLLED)

Rules:
- Sales staff CANNOT edit prescriptions
- Sales staff CANNOT reuse expired prescriptions
- Sales staff see prescription as read-only
- Upselling suggestions are advisory only

---

## 8. HOME EYE TEST SUPPORT (FUTURE-READY)

Attributes:
- Appointment ID
- Visiting optometrist
- Device used
- Location captured
- Prescription tagged as "Home Test"

---

## 9. AUDIT & LEGAL SAFETY

- Prescription edits logged permanently
- No deletion after save
- Version history maintained
- Doctor attribution locked

---

END CLINICAL ENGINE
