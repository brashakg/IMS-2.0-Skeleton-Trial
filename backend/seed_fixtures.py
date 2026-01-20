"""
Phase 2 Test Fixtures
Seed data for Phase 2 testing
Source: PHASE_2_BLOCKER_ANALYSIS.md
"""

from database import (
    users_collection,
    roles_collection,
    user_roles_collection,
    locations_collection,
    products_collection,
    prescriptions_collection,
    customers_collection,
    patients_collection,
    discount_rules_collection
)
from datetime import datetime, timedelta
from uuid import uuid4


def seed_test_data():
    """Seed all test fixtures for Phase 2"""
    
    print("Seeding Phase 2 test data...")
    
    # Clear existing test data
    users_collection.delete_many({})
    roles_collection.delete_many({})
    user_roles_collection.delete_many({})
    locations_collection.delete_many({})
    products_collection.delete_many({})
    prescriptions_collection.delete_many({})
    customers_collection.delete_many({})
    patients_collection.delete_many({})
    discount_rules_collection.delete_many({})
    
    # 1. Seed Roles
    roles_data = [
        {"id": "role_sales", "role_code": "SALES_STAFF", "description": "Sales Staff", "hierarchy_level": 5},
        {"id": "role_manager", "role_code": "STORE_MANAGER", "description": "Store Manager", "hierarchy_level": 3},
        {"id": "role_admin", "role_code": "ADMIN", "description": "Admin", "hierarchy_level": 1},
        {"id": "role_superadmin", "role_code": "SUPERADMIN", "description": "Superadmin", "hierarchy_level": 0},
    ]
    roles_collection.insert_many(roles_data)
    print("✓ Roles seeded")
    
    # 2. Seed Locations
    locations_data = [
        {"id": "loc_store1", "organization_id": "org1", "location_code": "STR001", "display_name": "Store 1", "city": "Mumbai", "state": "Maharashtra", "is_hq": False, "status": "ACTIVE"},
        {"id": "loc_hq", "organization_id": "org1", "location_code": "HQ001", "display_name": "HQ", "city": "Mumbai", "state": "Maharashtra", "is_hq": True, "status": "ACTIVE"},
    ]
    locations_collection.insert_many(locations_data)
    print("✓ Locations seeded")
    
    # 3. Seed Users
    users_data = [
        {"id": "user_sales1", "username": "sales1", "email": "sales1@test.com", "phone": "9876543210", "is_active": True},
        {"id": "user_manager1", "username": "manager1", "email": "manager1@test.com", "phone": "9876543211", "is_active": True},
        {"id": "user_admin1", "username": "admin1", "email": "admin1@test.com", "phone": "9876543212", "is_active": True},
    ]
    users_collection.insert_many(users_data)
    print("✓ Users seeded")
    
    # 4. Seed User-Role Assignments
    user_roles_data = [
        {"id": str(uuid4()), "user_id": "user_sales1", "role_id": "role_sales", "location_id": "loc_store1", "active": True},
        {"id": str(uuid4()), "user_id": "user_manager1", "role_id": "role_manager", "location_id": "loc_store1", "active": True},
        {"id": str(uuid4()), "user_id": "user_admin1", "role_id": "role_admin", "location_id": "loc_hq", "active": True},
    ]
    user_roles_collection.insert_many(user_roles_data)
    print("✓ User-Role assignments seeded")
    
    # 5. Seed Discount Rules (from DISCOUNT_LOGIC_BY_CATEGORY.md)
    discount_rules_data = [
        # Sales Staff rules
        {"id": str(uuid4()), "role_id": "role_sales", "category_classification": "MASS", "max_discount_percent": 10.0, "approval_required": False},
        {"id": str(uuid4()), "role_id": "role_sales", "category_classification": "PREMIUM", "max_discount_percent": 8.0, "approval_required": False},
        {"id": str(uuid4()), "role_id": "role_sales", "category_classification": "LUXURY", "max_discount_percent": 0.0, "approval_required": True},
        
        # Store Manager rules
        {"id": str(uuid4()), "role_id": "role_manager", "category_classification": "MASS", "max_discount_percent": 20.0, "approval_required": False},
        {"id": str(uuid4()), "role_id": "role_manager", "category_classification": "PREMIUM", "max_discount_percent": 15.0, "approval_required": False},
        {"id": str(uuid4()), "role_id": "role_manager", "category_classification": "LUXURY", "max_discount_percent": 5.0, "approval_required": False},
        
        # Admin rules
        {"id": str(uuid4()), "role_id": "role_admin", "category_classification": "MASS", "max_discount_percent": 100.0, "approval_required": False},
        {"id": str(uuid4()), "role_id": "role_admin", "category_classification": "PREMIUM", "max_discount_percent": 100.0, "approval_required": False},
        {"id": str(uuid4()), "role_id": "role_admin", "category_classification": "LUXURY", "max_discount_percent": 100.0, "approval_required": False},
    ]
    discount_rules_collection.insert_many(discount_rules_data)
    print("✓ Discount rules seeded")
    
    # 6. Seed Products
    products_data = [
        # Frame - Mass
        {"id": "prod_frame_mass1", "name": "Basic Frame BF-101", "category": "FRAME", "category_classification": "MASS", "mrp": 1000.0, "offer_price": 1000.0, "gst_rate": 18.0, "status": "ACTIVE"},
        
        # Frame - Luxury
        {"id": "prod_frame_luxury1", "name": "Luxury Frame LX-500", "category": "FRAME", "category_classification": "LUXURY", "mrp": 5000.0, "offer_price": 5000.0, "gst_rate": 18.0, "status": "ACTIVE"},
        
        # Frame - Offer < MRP (no discount eligible)
        {"id": "prod_frame_discounted", "name": "Pre-Discounted Frame PD-200", "category": "FRAME", "category_classification": "MASS", "mrp": 1500.0, "offer_price": 1200.0, "gst_rate": 18.0, "status": "ACTIVE"},
        
        # Optical Lens - Standard
        {"id": "prod_lens_std1", "name": "Standard Lens SV-1.5", "category": "OPTICAL_LENS", "category_classification": "PREMIUM", "mrp": 2000.0, "offer_price": 2000.0, "gst_rate": 18.0, "status": "ACTIVE"},
        
        # Optical Lens - Premium
        {"id": "prod_lens_premium1", "name": "Premium Progressive PP-1.67", "category": "OPTICAL_LENS", "category_classification": "PREMIUM", "mrp": 4000.0, "offer_price": 4000.0, "gst_rate": 18.0, "status": "ACTIVE"},
        
        # Accessories
        {"id": "prod_acc1", "name": "Lens Cleaner Spray", "category": "ACCESSORIES", "category_classification": "MASS", "mrp": 200.0, "offer_price": 200.0, "gst_rate": 18.0, "status": "ACTIVE"},
    ]
    products_collection.insert_many(products_data)
    print("✓ Products seeded")
    
    # 7. Seed Customers
    customers_data = [
        {"id": "cust1", "name": "Test Customer 1", "mobile": "9876543210", "email": "cust1@test.com", "created_at": datetime.utcnow()},
        {"id": "cust2", "name": "Test Customer 2", "mobile": "9876543211", "email": "cust2@test.com", "created_at": datetime.utcnow()},
    ]
    customers_collection.insert_many(customers_data)
    print("✓ Customers seeded")
    
    # 8. Seed Patients
    patients_data = [
        {"id": "patient1", "customer_id": "cust1", "name": "Patient 1", "age": 35, "gender": "M", "created_at": datetime.utcnow()},
        {"id": "patient2", "customer_id": "cust2", "name": "Patient 2", "age": 28, "gender": "F", "created_at": datetime.utcnow()},
    ]
    patients_collection.insert_many(patients_data)
    print("✓ Patients seeded")
    
    # 9. Seed Prescriptions
    prescriptions_data = [
        # Valid prescription
        {
            "id": "rx_valid1",
            "patient_id": "patient1",
            "prescription_type": "digital",
            "sph_r": -1.25,
            "cyl_r": -0.75,
            "axis_r": 90,
            "sph_l": -1.50,
            "cyl_l": -0.50,
            "axis_l": 85,
            "prescribed_by": "Dr. Optom 1",
            "prescription_date": datetime.utcnow() - timedelta(days=30),
            "expiry_date": datetime.utcnow() + timedelta(days=150),  # Valid for 6 months
            "created_at": datetime.utcnow() - timedelta(days=30)
        },
        
        # Expired prescription (for negative testing)
        {
            "id": "rx_expired1",
            "patient_id": "patient1",
            "prescription_type": "manual",
            "sph_r": -2.00,
            "cyl_r": -1.00,
            "axis_r": 180,
            "sph_l": -2.25,
            "cyl_l": -0.75,
            "axis_l": 175,
            "prescribed_by": "Dr. Optom 2",
            "prescription_date": datetime.utcnow() - timedelta(days=200),
            "expiry_date": datetime.utcnow() - timedelta(days=10),  # Expired 10 days ago
            "created_at": datetime.utcnow() - timedelta(days=200)
        },
        
        # Prescription for patient2
        {
            "id": "rx_patient2",
            "patient_id": "patient2",
            "prescription_type": "digital",
            "sph_r": -0.75,
            "cyl_r": 0.00,
            "axis_r": 0,
            "sph_l": -1.00,
            "cyl_l": 0.00,
            "axis_l": 0,
            "prescribed_by": "Dr. Optom 1",
            "prescription_date": datetime.utcnow() - timedelta(days=15),
            "expiry_date": datetime.utcnow() + timedelta(days=165),
            "created_at": datetime.utcnow() - timedelta(days=15)
        },
    ]
    prescriptions_collection.insert_many(prescriptions_data)
    print("✓ Prescriptions seeded")
    
    print("\n✅ Phase 2 test data seeding complete!")
    print("\nTest User IDs:")
    print("  Sales Staff: user_sales1")
    print("  Store Manager: user_manager1")
    print("  Admin: user_admin1")
    print("\nTest Data IDs:")
    print("  Customer: cust1, cust2")
    print("  Patient: patient1 (linked to cust1), patient2 (linked to cust2)")
    print("  Prescription (valid): rx_valid1 (patient1)")
    print("  Prescription (expired): rx_expired1 (patient1)")
    print("  Products: prod_frame_mass1, prod_frame_luxury1, prod_lens_std1, etc.")


if __name__ == "__main__":
    seed_test_data()
