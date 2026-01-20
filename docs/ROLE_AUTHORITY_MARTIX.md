# Role Authority Matrix

## Core Principle
Authority is configurable by Superadmin, but NEVER implicit.

## Discount Authority
- Defined per role
- Further restricted by:
  - Category
  - Product tier (Luxury / Regular)
  - Store
- Default: DENY

## Overrides
- Only Admin / Superadmin
- Must log:
  - Who
  - Why
  - What changed
  - Duration

## Visibility Rule
Lower roles can SEE limits but cannot infer logic.
