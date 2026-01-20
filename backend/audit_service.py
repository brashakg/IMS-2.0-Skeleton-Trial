from database import audit_logs_collection
from models import AuditLogDocument, AuditEventType
from datetime import datetime
from typing import Any, Optional, Dict


class AuditService:
    """
    Audit logging service (mandatory for Phase 2)
    All critical actions must emit audit events
    Append-only, immutable
    """
    
    @staticmethod
    def emit_event(
        event_type: AuditEventType,
        entity_type: str,
        entity_id: str,
        action: str,
        actor_id: str,
        role_context: str,
        trigger_source: str = "POS",
        previous_state: Optional[Any] = None,
        new_state: Optional[Any] = None,
        payload_snapshot: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Emit audit event (append-only)
        Returns: audit_event_id
        """
        audit_log = AuditLogDocument(
            event_type=event_type,
            entity_type=entity_type,
            entity_id=entity_id,
            action=action,
            previous_state=previous_state,
            new_state=new_state,
            payload_snapshot=payload_snapshot or {},
            role_context=role_context,
            actor_id=actor_id,
            trigger_source=trigger_source,
            timestamp=datetime.utcnow()
        )
        
        # Insert into MongoDB (append-only)
        result = audit_logs_collection.insert_one(audit_log.model_dump())
        
        return audit_log.id
    
    @staticmethod
    def get_events_for_entity(entity_type: str, entity_id: str):
        """
        Retrieve all audit events for an entity
        """
        events = audit_logs_collection.find({
            "entity_type": entity_type,
            "entity_id": entity_id
        }).sort("timestamp", 1)  # Chronological order
        
        return list(events)
