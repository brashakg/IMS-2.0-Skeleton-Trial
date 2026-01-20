# HR & ATTENDANCE ABUSE SIMULATION — IMS 2.0

## Purpose
Prevent attendance, leave, and shift manipulation.

---

## PATTERN 1 — LATE MARK CLUSTERING

Pattern:
- Late punches near grace window

Detection:
- Time clustering analysis

Action:
- HR insight
- No auto-penalty

---

## PATTERN 2 — MANUAL ATTENDANCE OVERRIDES

Pattern:
- Same manager editing attendance repeatedly

Detection:
- Edit frequency per approver

Action:
- Admin visibility

---

## PATTERN 3 — SHIFT SWAP LOOPING

Pattern:
- Repeated shift swaps to avoid penalties

Detection:
- Swap graph tracking

Action:
- Flag to HR

---

## PATTERN 4 — LEAVE STACKING

Pattern:
- Leaves attached to weekends/holidays repeatedly

Detection:
- Calendar adjacency analysis

Action:
- HR review suggestion

---

## GOVERNANCE
- ❌ No salary auto-hold
- ❌ No staff alerting
- ✅ Audit-first
