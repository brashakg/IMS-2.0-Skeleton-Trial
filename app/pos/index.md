# POS Screens Index

This file represents the root entry for all Point of Sale (POS) related screens.

The POS module governs the complete in-store and assisted sales journey, including:

- Product selection across frames, lenses, accessories, services, and add-ons
- Enforcement of pricing logic using MRP, Offer Price, and role-based discounts
- Discount caps by role with explicit HQ override requirements
- Gift card application independent of discount eligibility
- Advance, partial, and balance payment handling
- Multi-visit order lifecycle (order creation → follow-up → delivery → closure)
- Prescription attachment and validation during sale
- Barcode scanning and resolution at item and order level
- Mandatory audit trails for overrides, edits, and exceptions
- Error handling with task and escalation triggers instead of silent failures

Design principles:
- No silent overrides
- No price manipulation outside defined rules
- No staff-side bypasses
- All exceptions are visible, logged, and traceable

All POS workflows, limits, and edge cases are authoritatively defined in
`docs/SYSTEM_INTENT.md`.
