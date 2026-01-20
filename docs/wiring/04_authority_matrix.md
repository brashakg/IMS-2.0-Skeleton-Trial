# AUTHORITY MATRIX — IMS 2.0

Defines **who can perform which actions**.

---

## DISCOUNT AUTHORITY

| Role | Max Discount |
|-----|--------------|
| Sales Staff | Configurable |
| Store Manager | Configurable |
| Area Manager | Configurable |
| Admin | Full |
| Superadmin | Unlimited |

Category-wise caps enforced.

---

## STOCK AUTHORITY

| Action | Role |
|------|------|
Accept Stock | Store Manager |
Escalate Mismatch | Store Manager |
Correct Catalog | HQ |
Override Acceptance | Superadmin |

---

## FINANCE AUTHORITY

| Action | Role |
|------|------|
Approve Expense | Finance |
Approve Advance | Finance |
Lock Period | Admin |
Unlock Period | Superadmin |

---

## TASK AUTHORITY

| Action | Role |
|------|------|
Create Task | Manager+ |
Close Task | Owner |
Force Close | Superadmin |
Edit Priority | Admin+ |

---

## AI AUTHORITY

| Action | Role |
|------|------|
View Insights | Superadmin |
Approve Change | Superadmin |
Execute Change | ❌ Not allowed |

---

END AUTHORITY MATRIX
