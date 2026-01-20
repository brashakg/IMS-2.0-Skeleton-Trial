from models import OrderState
from typing import Dict, List
from fastapi import HTTPException


class StateMachineValidator:
    """
    Order state machine validator (Phase 2)
    Enforces irreversible state progression
    Source: 06_transaction_state_machine_and_immutability.md
    """
    
    # Allowed state transitions (forward only, no backward)
    ALLOWED_TRANSITIONS: Dict[OrderState, List[OrderState]] = {
        OrderState.CREATED: [OrderState.ITEMS_ATTACHED],
        OrderState.ITEMS_ATTACHED: [OrderState.PRICING_REVIEWED],
        OrderState.PRICING_REVIEWED: [OrderState.PRICING_LOCKED],
        OrderState.PRICING_LOCKED: [OrderState.BILLED],  # Phase 4
        OrderState.BILLED: [OrderState.CLOSED],  # Phase 4 (after invoice)
        OrderState.CLOSED: [],  # Terminal
    }
    
    # Actions allowed per state
    STATE_PERMISSIONS: Dict[OrderState, List[str]] = {
        OrderState.CREATED: ["attach_items"],
        OrderState.ITEMS_ATTACHED: ["attach_items", "review_pricing"],
        OrderState.PRICING_REVIEWED: ["request_discount", "lock_pricing"],
        OrderState.PRICING_LOCKED: ["create_bill"],  # Phase 4
        OrderState.BILLED: ["record_payment", "generate_invoice"],  # Phase 4
        OrderState.CLOSED: [],  # Terminal - immutable
    }
    
    @staticmethod
    def validate_transition(current_state: OrderState, target_state: OrderState) -> bool:
        """
        Validate if state transition is allowed
        Returns: True if allowed, raises HTTPException if not
        """
        if target_state not in StateMachineValidator.ALLOWED_TRANSITIONS.get(current_state, []):
            raise HTTPException(
                status_code=409,
                detail={
                    "error": True,
                    "reason_code": "INVALID_STATE_TRANSITION",
                    "message": f"Cannot transition from {current_state} to {target_state}",
                    "current_state": current_state,
                    "attempted_state": target_state
                }
            )
        return True
    
    @staticmethod
    def validate_action_allowed(current_state: OrderState, action: str) -> bool:
        """
        Validate if action is allowed in current state
        Returns: True if allowed, raises HTTPException if not
        """
        if action not in StateMachineValidator.STATE_PERMISSIONS.get(current_state, []):
            raise HTTPException(
                status_code=409,
                detail={
                    "error": True,
                    "reason_code": "INVALID_STATE_FOR_ACTION",
                    "message": f"Action '{action}' not allowed in state {current_state}",
                    "current_state": current_state,
                    "attempted_action": action,
                    "allowed_actions": StateMachineValidator.STATE_PERMISSIONS.get(current_state, [])
                }
            )
        return True
    
    @staticmethod
    def check_immutability(current_state: OrderState, action: str) -> None:
        """
        Check if order is in immutable state (PRICING_LOCKED)
        Raises HTTPException if attempting to mutate locked order
        """
        if current_state == OrderState.PRICING_LOCKED:
            raise HTTPException(
                status_code=409,
                detail={
                    "error": True,
                    "reason_code": "ORDER_LOCKED",
                    "message": "Order is locked, no edits allowed",
                    "current_state": current_state
                }
            )
