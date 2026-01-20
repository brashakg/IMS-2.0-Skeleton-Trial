from database import discount_rules_collection, user_roles_collection
from models import DiscountRequestStatus, CategoryClassification
from fastapi import HTTPException
from typing import Dict, Tuple, Any


class DiscountEnforcementService:
    """
    Discount enforcement (Role × Category × Context)
    Source: DISCOUNT_LOGIC_BY_CATEGORY.md
    Source: 05_discount_enforcement_hooks.md
    """
    
    @staticmethod
    def evaluate_discount_request(
        requested_discount_percent: float,
        user_id: str,
        active_role_id: str,
        category: str,
        category_classification: CategoryClassification,
        mrp: float,
        offer_price: float
    ) -> Tuple[DiscountRequestStatus, Dict[str, Any]]:
        """
        Evaluate discount request against Role × Category × Context rules
        
        Returns: (status, details)
          status: AUTO_APPROVED | REQUIRES_APPROVAL | BLOCKED
          details: caps, approver required, etc.
        """
        
        # RULE 1: Check discount eligibility (MRP vs Offer Price)
        if offer_price < mrp:
            # Offer Price < MRP → No discount allowed (SYSTEM_INTENT.md)
            return (
                DiscountRequestStatus.BLOCKED,
                {
                    "reason": "Offer Price < MRP, no discount allowed",
                    "mrp": mrp,
                    "offer_price": offer_price
                }
            )
        
        # RULE 2: Fetch role discount cap
        role_cap = DiscountEnforcementService._get_role_discount_cap(active_role_id, category_classification)
        
        # RULE 3: Fetch category discount cap
        category_cap = DiscountEnforcementService._get_category_discount_cap(category_classification)
        
        # RULE 4: Effective cap is minimum of role cap and category cap
        effective_cap = min(role_cap, category_cap)
        
        # RULE 5: Luxury category ALWAYS requires approval (even if within cap)
        if category_classification == CategoryClassification.LUXURY:
            if requested_discount_percent > 0:
                return (
                    DiscountRequestStatus.PENDING_APPROVAL,
                    {
                        "reason": "Luxury category requires approval for any discount",
                        "role_cap": role_cap,
                        "category_cap": category_cap,
                        "effective_cap": effective_cap,
                        "approver_role_required": "STORE_MANAGER",
                        "luxury_enforcement": True
                    }
                )
        
        # RULE 6: NON_DISCOUNTABLE category
        if category_classification == CategoryClassification.NON_DISCOUNTABLE:
            return (
                DiscountRequestStatus.BLOCKED,
                {
                    "reason": "Category does not allow discounts",
                    "category_classification": category_classification
                }
            )
        
        # RULE 7: Check if discount within limits
        if requested_discount_percent <= effective_cap:
            # Auto-approved (within limits)
            return (
                DiscountRequestStatus.AUTO_APPROVED,
                {
                    "reason": "Within role and category limits",
                    "role_cap": role_cap,
                    "category_cap": category_cap,
                    "effective_cap": effective_cap
                }
            )
        else:
            # Requires approval (exceeds limits)
            return (
                DiscountRequestStatus.REQUIRES_APPROVAL,
                {
                    "reason": "Discount exceeds limits, approval required",
                    "role_cap": role_cap,
                    "category_cap": category_cap,
                    "effective_cap": effective_cap,
                    "requested": requested_discount_percent,
                    "approver_role_required": "STORE_MANAGER"  # TODO: Dynamic based on hierarchy
                }
            )
    
    @staticmethod
    def _get_role_discount_cap(role_id: str, category_classification: CategoryClassification) -> float:
        """
        Fetch discount cap for role × category combination
        Returns: max_discount_percent (0-100)
        """
        # Query discount_rules table
        rule = discount_rules_collection.find_one({
            "role_id": role_id,
            "category_classification": category_classification
        })
        
        if rule:
            return rule.get("max_discount_percent", 0.0)
        
        # Default: no discount if rule not found
        return 0.0
    
    @staticmethod
    def _get_category_discount_cap(category_classification: CategoryClassification) -> float:
        """
        Fetch default category discount cap
        Returns: max_discount_percent
        """
        # Category-level defaults (from DISCOUNT_LOGIC_BY_CATEGORY.md)
        CATEGORY_DEFAULTS = {
            CategoryClassification.MASS: 10.0,
            CategoryClassification.PREMIUM: 8.0,
            CategoryClassification.LUXURY: 2.0,
            CategoryClassification.SERVICE: 0.0,
            CategoryClassification.NON_DISCOUNTABLE: 0.0,
        }
        
        return CATEGORY_DEFAULTS.get(category_classification, 0.0)
    
    @staticmethod
    def validate_approval_authority(approver_role_id: str, requested_discount_percent: float) -> bool:
        """
        Validate if approver has authority to approve requested discount
        Returns: True if authorized
        Raises: HTTPException if insufficient authority
        """
        # TODO: Implement role hierarchy check
        # For Phase 2: Allow Store Manager and above
        
        # Fetch approver role
        # Check if role.hierarchy_level >= required level
        
        # Simplified for Phase 2: assume all approvals valid if role exists
        # Full implementation in future phase
        
        return True
