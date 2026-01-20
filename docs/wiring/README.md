# IMS 2.0 — UI ↔ API ↔ DB Wiring Maps
(Build Pass 3 – Step 3)

This folder defines **how each screen connects to APIs and database tables**.

Purpose:
- Prevent Emergent from inventing flows
- Freeze authority gates
- Make UI, API, DB alignment explicit

Rules:
- No screen writes without mapped API
- No API exists without mapped DB tables
- No silent background mutations

This is the single source of truth for execution wiring.

END OF OVERVIEW
