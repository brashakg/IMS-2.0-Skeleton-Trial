# Clinical & Optometry Screens Index

This file represents the root entry for all clinical and optometry-related screens.

The Clinical module governs:

- Eye test creation and clinical data capture
- Prescription generation, edits, and version history
- Optometrist-controlled prescription validity selection
- Patient linking (single-patient or family-based)
- Clinical compliance and audit requirements
- Role-based visibility and access control
- Prescription usage across POS and order lifecycle

Design priorities:
- Clinical accuracy over speed
- Full accountability for changes
- Zero loss of historical data
- Practical usability for optometrists

Clinical workflows and enforcement rules are defined in
`docs/SYSTEM_INTENT.md`.
