# Build Pass #2 — UI & Flow Wiring Only

## Objective
Wire screen navigation, role visibility, and empty states
WITHOUT implementing business logic or data mutation.

## Included
- Role-based routing
- Sidebar + header navigation
- Permission-based visibility (show but disable when unauthorized)
- Empty states for all screens
- Read-only data placeholders

## Explicitly Excluded
- Pricing logic
- Discount rules
- Inventory mutation
- Financial calculations
- AI execution
- Backend APIs
- Database schemas

## Rule
If any screen requires business logic → STOP and flag.
