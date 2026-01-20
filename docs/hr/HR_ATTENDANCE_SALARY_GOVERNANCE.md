# HR, ATTENDANCE, SALARY & INCENTIVES — GOVERNANCE FRAMEWORK
IMS 2.0

## Purpose
To create a **self-explanatory, dispute-resistant, auditable HR system**
where every employee — from staff to Superadmin — can clearly understand:
- Attendance
- Leaves
- Late marks
- Advances
- Salary
- Incentives

WITHOUT ambiguity, hidden rules, or manual dependency.

---

## CORE PRINCIPLES

1. **Visibility before enforcement**
2. **System-calculated, human-approved**
3. **No silent deductions**
4. **Employee sees what Finance sees (except others’ data)**

---

## ATTENDANCE GOVERNANCE

### Source of Truth
- Mobile app / Store device login
- Geo-fenced (store proximity)
- Timestamped and immutable

### Edge Case 1 — Late Login, Early Work
Scenario:
- Staff arrives early
- Logs in late due to rush

System Handling:
- Actual login time recorded
- Manual correction requires:
  - Reason
  - Store Manager approval
  - Audit log entry

No silent adjustments.

---

### Edge Case 2 — Proxy Attendance

Scenario:
- Colleague logs in for another staff

System Controls:
- Device + location fingerprinting
- Pattern analysis (non-blocking)
- Admin visibility only

---

### Edge Case 3 — Shift Change Mid-Week

Scenario:
- Shift changed due to swap/emergency

System Handling:
- Manager approval required
- Roster auto-adjusts
- Attendance recalculated dynamically
- Original plan preserved for audit

---

## LEAVE GOVERNANCE

### Leave Types
- Paid Leave
- Unpaid Leave
- Sick Leave
- Emergency Leave
- Comp-off (future)

### Rules
- Leave balance visible to employee
- Leave approval mandatory unless emergency flag used
- Retroactive leave requires Admin approval

---

## LATE MARKS & GRACE LOGIC

### Late Mark Definition
- Configurable per store/category
- Grace minutes visible to staff

### Edge Case — Abuse of Grace
System Handling:
- Grace usage trend tracked
- No auto-penalty
- Admin insight only

---

## SALARY GOVERNANCE

### Salary Components
- Fixed salary
- Variable pay
- Incentives
- Deductions
- Advances adjustment

### Rules
- Salary breakup visible in-app
- No lump-sum unexplained amounts
- Locked once payroll is closed

---

## ADVANCES GOVERNANCE

### Advance Rules
- Employee can request advance
- Amount visible only to:
  - Employee
  - Finance
  - Admin / Superadmin

### Adjustment Rules
- Auto-adjusted against salary
- Adjustment breakdown shown clearly
- No manual hidden offsets

---

## INCENTIVE GOVERNANCE

### Incentive Sources
- Sales targets
- Category-wise bonuses
- Campaign incentives
- Special overrides (Admin only)

### Edge Case — Incentive Dispute

System Handling:
- Incentive formula visible
- Source data clickable
- Override requires reason + approval

---

## TRANSPARENCY GUARANTEES (EMPLOYEE VIEW)

Employee ALWAYS sees:
- Attendance summary
- Leave balance
- Late marks
- Advances outstanding
- Incentives earned
- Salary calculation (read-only)

Employee NEVER sees:
- Other employees’ data
- Internal flags
- Pattern analysis

---

## GOVERNANCE SAFEGUARDS

- ❌ No silent salary edits
- ❌ No retro changes without approval
- ❌ No hidden penalties
- ✅ Full audit trail
- ✅ Clear explanations inline

---

## FAILURE MODE PREVENTION

| Risk | Prevention |
|----|----|
Salary confusion | In-app breakup |
Disputes | Click-through data |
Favouritism claims | Rule-based visibility |
Over-dependence on HR | Self-service clarity |

---

END HR & PAYROLL GOVERNANCE
