# Inventory Screens Index

This file represents the root entry for all inventory and stock-related screens.

The Inventory module governs the complete lifecycle of products, including:

- HQ-level product cataloging and activation
- Store-level stock receipt, verification, and acceptance
- Mandatory mismatch detection with escalation to HQ
- Product placement mapping (counter, shelf, cabinet, display unit)
- Store-level barcode generation and re-printing
- Stock movement between stores (when enabled)
- Quarantine handling for defective or mismatched items
- Vendor return workflows with reminders and escalation
- SLA tracking for pending actions and unresolved cases
- Historical stock movement and audit visibility

Inventory rules are tightly integrated with:
- POS availability and blocking logic
- Marketplace stock sync
- Finance valuation and write-offs

All inventory behavior is deterministic and defined in
`docs/SYSTEM_INTENT.md`.
