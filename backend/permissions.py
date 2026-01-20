"""
Role-based permission enforcement
Source: ROLE_AUTHORITY_MATRIX.md, SYSTEM_INTENT.md
"""

ROLE_HIERARCHY = {
    "SUPERADMIN": 0,
    "ADMIN": 1,
    "STORE_MANAGER": 3,
    "AREA_MANAGER": 3,
    "CATALOG_MANAGER": 4,
    "ACCOUNTANT": 4,
    "OPTOMETRIST": 5,
    "SALES_STAFF": 5,
    "CASHIER": 5,
    "WORKSHOP_STAFF": 6
}

# Permission matrix (action → allowed roles)
PERMISSIONS = {
    # Orders & POS
    "create_order": ["SALES_STAFF", "CASHIER", "OPTOMETRIST", "STORE_MANAGER", "ADMIN", "SUPERADMIN"],
    "attach_items": ["SALES_STAFF", "CASHIER", "OPTOMETRIST", "STORE_MANAGER", "ADMIN", "SUPERADMIN"],
    "review_pricing": ["SALES_STAFF", "CASHIER", "OPTOMETRIST", "STORE_MANAGER", "ADMIN", "SUPERADMIN"],
    "lock_pricing": ["SALES_STAFF", "CASHIER", "OPTOMETRIST", "STORE_MANAGER", "ADMIN", "SUPERADMIN"],
    
    # Billing
    "create_bill": ["CASHIER", "STORE_MANAGER", "ADMIN", "SUPERADMIN"],
    "record_payment": ["CASHIER", "STORE_MANAGER", "ADMIN", "SUPERADMIN"],
    "generate_invoice": ["CASHIER", "STORE_MANAGER", "ADMIN", "SUPERADMIN"],
    
    # Discounts
    "request_discount": ["SALES_STAFF", "STORE_MANAGER", "ADMIN", "SUPERADMIN"],
    "approve_discount": ["STORE_MANAGER", "AREA_MANAGER", "ADMIN", "SUPERADMIN"],
    
    # Clinical
    "create_prescription": ["OPTOMETRIST", "ADMIN", "SUPERADMIN"],
    "edit_prescription": ["OPTOMETRIST", "ADMIN", "SUPERADMIN"],
    
    # Inventory
    "accept_stock": ["STORE_MANAGER", "ADMIN", "SUPERADMIN"],
    "adjust_stock": ["STORE_MANAGER", "ADMIN", "SUPERADMIN"],
    
    # Admin
    "manage_users": ["ADMIN", "SUPERADMIN"],
    "manage_roles": ["SUPERADMIN"],
    "view_audit_logs": ["STORE_MANAGER", "ADMIN", "SUPERADMIN"],
}


def check_permission(user_roles: list, action: str) -> bool:
    """Check if any user role has permission for action"""
    allowed_roles = PERMISSIONS.get(action, [])
    return any(role in allowed_roles for role in user_roles)


def get_user_hierarchy_level(user_roles: list) -> int:
    """Get highest authority level (lowest number) from user roles"""
    levels = [ROLE_HIERARCHY.get(role, 999) for role in user_roles]
    return min(levels) if levels else 999
