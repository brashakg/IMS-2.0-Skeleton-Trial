import os
import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from database import users_collection, user_roles_collection
from typing import Optional, Dict, Any

JWT_SECRET = os.getenv("JWT_SECRET", "temp_dev_secret_change_in_production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

security = HTTPBearer()


def create_access_token(user_id: str, roles: list, location_id: str) -> str:
    """Generate JWT token"""
    payload = {
        "user_id": user_id,
        "roles": roles,
        "location_id": location_id,
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS),
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def verify_token(token: str) -> Dict[str, Any]:
    """Verify and decode JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail={"error": True, "reason_code": "TOKEN_EXPIRED", "message": "Authentication token has expired"}
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail={"error": True, "reason_code": "INVALID_TOKEN", "message": "Invalid authentication token"}
        )


def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)) -> Dict[str, Any]:
    """Extract user context from JWT token"""
    token = credentials.credentials
    return verify_token(token)


def require_role(allowed_roles: list):
    """Dependency factory for role-based access control"""
    def role_checker(user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
        user_roles = user.get("roles", [])
        if not any(role in allowed_roles for role in user_roles):
            raise HTTPException(
                status_code=403,
                detail={
                    "error": True,
                    "reason_code": "INSUFFICIENT_PERMISSIONS",
                    "message": f"Requires one of: {', '.join(allowed_roles)}",
                    "user_roles": user_roles
                }
            )
        return user
    return role_checker


def authenticate_user(username: str, password: str, location_id: str) -> Optional[Dict[str, Any]]:
    """Authenticate user and return user data with roles"""
    user = users_collection.find_one({"username": username, "is_active": True})
    
    if not user:
        return None
    
    # TODO: Add password hashing verification in production
    # For now, accepting any password for development
    
    # Fetch user roles at location
    user_role_docs = list(user_roles_collection.find({
        "user_id": user["id"],
        "location_id": location_id,
        "active": True
    }))
    
    if not user_role_docs:
        return None
    
    # Fetch role codes
    from database import roles_collection
    role_ids = [ur["role_id"] for ur in user_role_docs]
    role_docs = list(roles_collection.find({"id": {"$in": role_ids}}))
    role_codes = [r["role_code"] for r in role_docs]
    
    return {
        "user_id": user["id"],
        "username": user["username"],
        "email": user.get("email"),
        "roles": role_codes,
        "location_id": location_id
    }
