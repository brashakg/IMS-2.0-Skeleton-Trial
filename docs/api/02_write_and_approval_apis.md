# 02 — WRITE & APPROVAL APIs

## Core Principle
NO WRITE without authority.

---

## POST /pos/create-sale

Access:
- Sales Staff
- Store Manager

Checks:
- Discount authority
- Category rules
- Offer vs MRP logic
- Stock availability

Hard Stops:
- Offer price > MRP → BLOCK
- Luxury category discount beyond cap → BLOCK

Escalation:
- Near-limit discount → silent signal

---

## POST /inventory/accept-stock

Access:
- Store Manager only

Checks:
- Quantity match
- SKU match
- Price integrity

If mismatch:
- Task auto-created
- HQ notified
- Acceptance blocked

---

## POST /expense/submit

Access:
- All employees

Rules:
- Bill mandatory (unless policy)
- No edit after submit

---

## POST /expense/approve

Access:
- Role-based (Manager / Finance / Admin)

Rules:
- Cannot approve own expense
- Cannot bypass hierarchy

---

## POST /override/action

Access:
- Superadmin ONLY

Rules:
- Mandatory reason
- Permanent audit log
- Visible in governance dashboard

---

END OF WRITE & APPROVAL APIs
