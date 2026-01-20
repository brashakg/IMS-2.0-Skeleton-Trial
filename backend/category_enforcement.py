from database import products_collection, prescriptions_collection, patients_collection
from fastapi import HTTPException
from datetime import datetime
from typing import Dict, Any, List, Optional


# Category mandatory attributes (from CATEGORY_ATTRIBUTE_MODEL.md)
CATEGORY_MANDATORY_ATTRIBUTES: Dict[str, List[str]] = {
    "FRAME": ["frame_type", "gender", "frame_shape", "frame_material", "frame_colour", "size", "rim_type", "frame_category", "country_of_origin"],
    "OPTICAL_LENS": ["lens_type", "material", "index", "coating_type", "power_range_supported", "lens_category"],
    "CONTACT_LENS": ["wear_type", "power_range", "base_curve", "diameter", "pack_size", "expiry_tracking", "batch_required"],
    "ACCESSORIES": ["accessory_type", "material", "usage_type"],
    "SERVICES": ["service_type", "applicable_category", "one_time_repeatable", "duration"],
    "WATCHES": ["watch_type", "strap_material", "dial_size", "water_resistance", "warranty_period", "battery_type"],
}

# Categories requiring prescription
PRESCRIPTION_REQUIRED_CATEGORIES = ["OPTICAL_LENS", "CONTACT_LENS"]


class CategoryEnforcementService:
    """
    Category-driven product enforcement
    Source: 04_category_driven_product_enforcement.md
    Source: CATEGORY_ATTRIBUTE_MODEL.md
    """
    
    @staticmethod
    def validate_item_attributes(product_id: str, attributes: Dict[str, Any], prescription_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Validate order item against category rules
        Returns: validation result with category info
        Raises: HTTPException on enforcement failure
        """
        # Fetch product
        product = products_collection.find_one({"id": product_id})
        if not product:
            raise HTTPException(
                status_code=404,
                detail={
                    "error": True,
                    "reason_code": "ENTITY_NOT_FOUND",
                    "message": f"Product {product_id} not found"
                }
            )
        
        category = product.get("category", "").upper()
        
        # Check mandatory attributes for category
        mandatory_attrs = CATEGORY_MANDATORY_ATTRIBUTES.get(category, [])
        missing_attrs = []
        
        for attr in mandatory_attrs:
            if attr not in attributes or attributes[attr] is None or attributes[attr] == "":
                missing_attrs.append(attr)
        
        if missing_attrs:
            raise HTTPException(
                status_code=400,
                detail={
                    "error": True,
                    "reason_code": "CATEGORY_ENFORCEMENT_FAILED",
                    "message": f"Missing mandatory attributes for category {category}",
                    "category": category,
                    "missing_attributes": missing_attrs,
                    "required_attributes": mandatory_attrs
                }
            )
        
        # Prescription requirement check
        if category in PRESCRIPTION_REQUIRED_CATEGORIES:
            if not prescription_id:
                raise HTTPException(
                    status_code=400,
                    detail={
                        "error": True,
                        "reason_code": "PRESCRIPTION_REQUIRED",
                        "message": f"Prescription required for {category} category"
                    }
                )
        
        return {
            "category": category,
            "validation_passed": True,
            "prescription_required": category in PRESCRIPTION_REQUIRED_CATEGORIES
        }
    
    @staticmethod
    def validate_prescription(prescription_id: str, patient_id: str) -> Dict[str, Any]:
        """
        Validate prescription for lens item
        Checks: existence, expiry, patient linkage
        Returns: prescription data
        Raises: HTTPException on validation failure
        """
        # Fetch prescription
        prescription = prescriptions_collection.find_one({"id": prescription_id})
        if not prescription:
            raise HTTPException(
                status_code=404,
                detail={
                    "error": True,
                    "reason_code": "ENTITY_NOT_FOUND",
                    "message": f"Prescription {prescription_id} not found"
                }
            )
        
        # Check expiry
        expiry_date = prescription.get("expiry_date")
        if isinstance(expiry_date, str):
            expiry_date = datetime.fromisoformat(expiry_date)
        
        if expiry_date and expiry_date < datetime.utcnow():
            raise HTTPException(
                status_code=400,
                detail={
                    "error": True,
                    "reason_code": "PRESCRIPTION_EXPIRED",
                    "message": f"Prescription expired on {expiry_date.date()}",
                    "expiry_date": str(expiry_date.date())
                }
            )
        
        # Check patient linkage
        if prescription.get("patient_id") != patient_id:
            raise HTTPException(
                status_code=409,
                detail={
                    "error": True,
                    "reason_code": "PRESCRIPTION_PATIENT_MISMATCH",
                    "message": "Prescription does not belong to order patient",
                    "prescription_patient_id": prescription.get("patient_id"),
                    "order_patient_id": patient_id
                }
            )
        
        return prescription
