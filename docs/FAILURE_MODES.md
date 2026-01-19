# Failure Modes & Recovery – IMS 2.0

This document lists known and expected failure scenarios
and how the system should respond.

Failure Categories:
- Human error
- Vendor delays
- System misuse
- Partial data availability
- Network or device issues
- Policy violations

System Principles:
- Fail loudly, not silently
- Prefer blocking over corruption
- Always leave an audit trail
- Offer recovery paths, not dead ends
- Escalate before damage spreads

Every major module must define:
- Failure detection
- User messaging
- Recovery actions
- Escalation path

Detailed behaviors are defined in SYSTEM_INTENT.md.
