## Architectural Layers & Responsibility

IMS 2.0 follows a layered responsibility model.

Presentation Layer:
- Dashboards
- POS screens
- Inventory views
- Forms and workflows
- Role-based UI rendering

This layer contains no business rules.

Application Logic Layer:
- Workflow orchestration
- Permission enforcement
- Validation checks
- Escalation triggering
- State transitions

Rules are enforced here, not in UI.

Domain Rules Layer:
- Pricing logic
- Discount eligibility
- Inventory lifecycle rules
- Clinical authority limits
- HR and finance constraints

All domain rules are defined in SYSTEM_INTENT.md.

Intelligence Layer:
- Pattern detection
- Risk flags
- Recommendations
- Change proposals

This layer is strictly read-only unless approved by Superadmin.

Infrastructure Layer:
- Database
- Integrations
- Event handling
- Audit logging

This layer must never encode business policy.