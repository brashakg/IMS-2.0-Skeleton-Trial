# POS OPTICAL FLOW CORRECTION — IMS 2.0
Authority: SYSTEM_INTENT.md

This document corrects missing optical-specific flow in Build Pass 2 POS.

---

## REQUIRED POS FLOW (OPTICAL SALES)

### STEP 1 — SELECT CUSTOMER & PATIENT
- Customer selected
- Patient selected (mandatory for optical)

---

### STEP 2 — SELECT PRESCRIPTION

System must allow:
- Select Existing Prescription
- Create New Prescription (if role allowed)

Prescription is LOCKED once order progresses.

---

### STEP 3 — SELECT FRAME (Optional)
- Frame barcode scan or search
- Display frame attributes (size, material, luxury flag)

---

### STEP 4 — SELECT LENS (MANDATORY FOR OPTICAL)

Lens selection must:
- Pull prescription values automatically
- Validate lens compatibility
- Show pricing per eye
- Apply coating logic
- Respect category discount rules

Lens cannot be added without prescription.

---

### STEP 5 — ORDER SUMMARY

Summary must show:
- Frame (if any)
- Lens (Left / Right)
- Prescription reference ID
- Price breakup (Frame / Lens / Tax)

---

## HARD RULES

- ❌ No lens without prescription
- ❌ No prescription editing after lens selection
- ❌ No silent substitution of lens
- ✅ All selections auditable

---

## NEXT BUILD REQUIREMENT

Build Pass 3 MUST:
- Add Prescription Selector Component
- Add Lens Builder Component
- Bind both to POS flow

END POS OPTICAL FLOW CORRECTION
