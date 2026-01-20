# 01 — READ APIs (Non-Mutating)

## Purpose
Allow visibility without risk.

Rules:
- No state change
- No side effects
- Logged for audit if sensitive

---

## GET /dashboard/metrics

Access:
- Staff → Own data only
- Manager → Store data
- Admin → All stores
- Superadmin → Everything

Denials:
- No cross-store visibility without role

---

## GET /inventory/stock

Access:
- Staff → Read-only, store-scoped
- Manager → Store-level
- Admin → All stores
- Superadmin → Global

Filters allowed:
- Category
- Brand
- Price range

---

## GET /tasks/my

Access:
- Any logged-in user

Rules:
- Only own tasks unless role allows hierarchy view

---

## GET /audit/logs

Access:
- Admin (limited)
- Superadmin (full)

Rules:
- Immutable
- Cannot be filtered to hide actions

---

END OF READ APIs
