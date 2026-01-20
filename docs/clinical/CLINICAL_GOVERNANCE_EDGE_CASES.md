# CLINICAL GOVERNANCE — EDGE CASES & FAILURE MODES
IMS 2.0

## Purpose
This document defines non-obvious clinical failure scenarios that arise
from workflow gaps, system misuse, or operational shortcuts —
and how IMS 2.0 structurally prevents them.

This is NOT behaviour policing.
This is system-level risk control.

---

## EDGE CASE 1 — PRESCRIPTION WITHOUT CONTEXT

Scenario:
- Valid numerical prescription exists
- But clinical remarks are empty or vague
- Lens ordered later causes discomfort or dispute

System Controls:
- Mandatory clinical remarks (non-empty, min length)
- Prescription cannot be saved without remarks
- Remarks are immutable after order conversion

Audit Impact:
- Legal defensibility preserved
- Doctor intent is documented

---

## EDGE CASE 2 — SALES FLOW BYPASSING CLINICAL FLOW

Scenario:
- Customer arrives with urgency
- Sales tries to push order without test
- Old or external prescription reused silently

System Controls:
- Active prescription MUST be explicitly selected
- System warns on old prescriptions (age threshold)
- External prescriptions auto-flagged (informational)

Result:
- No “silent carry-forward” of clinical data

---

## EDGE CASE 3 — MULTIPLE PRESCRIPTIONS, WRONG SELECTION

Scenario:
- Patient has multiple prescriptions
- Wrong one selected unintentionally
- Error detected only after fitting

System Controls:
- Active prescription badge shown in POS
- Age + validity shown inline
- Confirmation required when selecting non-latest prescription

---

## EDGE CASE 4 — POST-SALE PRESCRIPTION EDITS

Scenario:
- Prescription edited after order is placed
- Creates mismatch between product and medical record

System Controls:
- Prescription locks once linked to order
- New version required for any change
- Old version preserved permanently

---

## EDGE CASE 5 — HOME EYE TEST LIABILITY

Scenario:
- Home test conducted
- Equipment/environment differs
- Dispute arises later

System Controls:
- Home Test flag mandatory
- Location captured
- Optometrist acknowledgement required
- Separate validity defaults for home tests

---

## EDGE CASE 6 — JUNIOR OPTOMETRIST OVERREACH

Scenario:
- Less experienced optometrist issues long validity
- Or handles complex prescription repeatedly

System Controls:
- Role-based validity ceilings
- Complexity scoring (future-ready)
- Advisory visibility to Admin (no alerts to staff)

---

## EDGE CASE 7 — CLINICAL DATA USED FOR MARKETING

Scenario:
- Prescription trends misused for upselling
- Ethical boundary crossed

System Controls:
- Clinical module has NO pricing
- AI insights are aggregate-only
- No patient-level clinical data exposed to sales

---

## EDGE CASE 8 — DOCTOR ATTRIBUTION DISPUTE

Scenario:
- Prescription disputed
- Optometrist identity unclear

System Controls:
- Optometrist identity locked at creation
- No reassignment allowed
- Audit trail immutable

---

## EDGE CASE 9 — BULK DAY PRESSURE

Scenario:
- High patient load
- Risk of shortcuts

System Controls:
- Workload visibility to Admin
- No speed-based blocking
- Post-facto quality review possible

---

## GOVERNANCE PRINCIPLES

- ❌ No auto-punishment
- ❌ No staff-facing flags
- ✅ Structural prevention
- ✅ Post-event auditability
- ✅ Human review always final

---

END CLINICAL GOVERNANCE — EDGE CASES
