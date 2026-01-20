# DEVICE MISUSE SIMULATION — IMS 2.0

## Purpose
Prevent misuse of personal/mobile devices.

---

## PATTERN 1 — MULTI-LOGIN
Pattern:
- Same user logged in across devices

Detection:
- Session overlap

Action:
- Admin alert

---

## PATTERN 2 — GEO VIOLATION
Pattern:
- Login outside store radius

Detection:
- Geo-fence breach

Action:
- Hard block
- Audit log
