"""
Phase 2 API Tests
Executes test specifications from PHASE_2_TEST_SPECIFICATIONS.md
"""

import requests
import json
from typing import Dict, Any

BASE_URL = "http://localhost:8001/api"


def print_test(name: str, passed: bool, details: str = ""):
    """Print test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} | {name}")
    if details and not passed:
        print(f"     Details: {details}")


def test_happy_path_complete_flow():
    """TEST 1.1: Complete Order Flow (Frame + Lens with Prescription)"""
    print("\n=== TEST 1.1: Happy Path - Complete Optical Order Flow ===\n")
    
    # Step 1: Create order
    create_resp = requests.post(f"{BASE_URL}/orders", json={
        "customer_id": "cust1",
        "patient_id": "patient1",
        "location_id": "loc_store1",
        "created_by": "user_sales1"
    })
    
    print_test("Create Order", create_resp.status_code == 201)
    if create_resp.status_code == 201:
        order_data = create_resp.json()
        order_id = order_data["order_id"]
        print(f"     Order ID: {order_id}, State: {order_data['state']}")
        
        # Step 2: Attach LENS item (with prescription)
        lens_resp = requests.post(f"{BASE_URL}/orders/{order_id}/items", json={
            "product_id": "prod_lens_std1",
            "quantity": 2,
            "prescription_id": "rx_valid1",
            "attributes": {
                "lens_type": "Single Vision",
                "material": "Plastic",
                "index": "1.5",
                "coating_type": "Anti-reflective",
                "power_range_supported": "-6.00 to +6.00",
                "lens_category": "Standard"
            }
        })
        
        print_test("Attach LENS item", lens_resp.status_code == 201)
        
        # Step 3: Attach FRAME item
        frame_resp = requests.post(f"{BASE_URL}/orders/{order_id}/items", json={
            "product_id": "prod_frame_mass1",
            "quantity": 1,
            "attributes": {
                "frame_type": "Optical",
                "gender": "Unisex",
                "frame_shape": "Rectangle",
                "frame_material": "Acetate",
                "frame_colour": "Black",
                "size": "52-18-140",
                "rim_type": "Full Rim",
                "frame_category": "Mass",
                "country_of_origin": "India"
            }
        })
        
        print_test("Attach FRAME item", frame_resp.status_code == 201)
        
        # Step 4: Review Pricing
        pricing_resp = requests.post(f"{BASE_URL}/orders/{order_id}/pricing/review", json={
            "requested_by": "user_sales1"
        })
        
        print_test("Review Pricing", pricing_resp.status_code == 200)
        if pricing_resp.status_code == 200:
            pricing_data = pricing_resp.json()
            print(f"     State: {pricing_data['state']}, Grand Total: ₹{pricing_data['pricing_snapshot']['grand_total']}")
        
        # Step 5: Lock Pricing
        lock_resp = requests.post(f"{BASE_URL}/orders/{order_id}/pricing/lock", json={
            "locked_by": "user_sales1"
        })
        
        print_test("Lock Pricing", lock_resp.status_code == 200)
        if lock_resp.status_code == 200:
            lock_data = lock_resp.json()
            print(f"     State: {lock_data['state']}, Immutable: {lock_data['immutable']}")
        
        return order_id
    
    return None


def test_lens_without_prescription():
    """TEST 2.1: LENS Without Prescription (HARD BLOCK)"""
    print("\n=== TEST 2.1: Enforcement - LENS Without Prescription ===\n")
    
    # Create order
    create_resp = requests.post(f"{BASE_URL}/orders", json={
        "customer_id": "cust1",
        "patient_id": "patient1",
        "location_id": "loc_store1",
        "created_by": "user_sales1"
    })
    
    if create_resp.status_code == 201:
        order_id = create_resp.json()["order_id"]
        
        # Attempt to attach LENS without prescription
        lens_resp = requests.post(f"{BASE_URL}/orders/{order_id}/items", json={
            "product_id": "prod_lens_std1",
            "quantity": 2,
            # NO prescription_id
            "attributes": {
                "lens_type": "Single Vision",
                "material": "Plastic",
                "index": "1.5",
                "coating_type": "Anti-reflective",
                "power_range_supported": "-6.00 to +6.00",
                "lens_category": "Standard"
            }
        })
        
        passed = lens_resp.status_code == 400
        if passed:
            error_data = lens_resp.json()
            passed = error_data.get("detail", {}).get("reason_code") == "PRESCRIPTION_REQUIRED"
        
        print_test("Block LENS without prescription", passed, json.dumps(lens_resp.json() if not passed else {}))


def test_offer_exceeds_mrp():
    """TEST 2.2: Offer Price > MRP (HARD BLOCK)"""
    print("\n=== TEST 2.2: Enforcement - Offer Price > MRP ===\n")
    
    # Create test product with Offer > MRP (violates SYSTEM_INTENT)
    from database import products_collection
    test_product = {
        "id": "prod_invalid_offer",
        "name": "Invalid Offer Product",
        "category": "FRAME",
        "category_classification": "MASS",
        "mrp": 1000.0,
        "offer_price": 1200.0,  # Offer > MRP (violation)
        "gst_rate": 18.0,
        "status": "ACTIVE"
    }
    products_collection.insert_one(test_product)
    
    # Create order and attach item
    create_resp = requests.post(f"{BASE_URL}/orders", json={
        "customer_id": "cust1",
        "patient_id": "patient1",
        "location_id": "loc_store1",
        "created_by": "user_sales1"
    })
    
    if create_resp.status_code == 201:
        order_id = create_resp.json()["order_id"]
        
        # Attach item with invalid pricing
        item_resp = requests.post(f"{BASE_URL}/orders/{order_id}/items", json={
            "product_id": "prod_invalid_offer",
            "quantity": 1,
            "attributes": {
                "frame_type": "Optical",
                "gender": "Unisex",
                "frame_shape": "Rectangle",
                "frame_material": "Acetate",
                "frame_colour": "Black",
                "size": "52-18-140",
                "rim_type": "Full Rim",
                "frame_category": "Mass",
                "country_of_origin": "India"
            }
        })
        
        if item_resp.status_code == 201:
            # Attempt pricing review (should fail)
            pricing_resp = requests.post(f"{BASE_URL}/orders/{order_id}/pricing/review", json={
                "requested_by": "user_sales1"
            })
            
            passed = pricing_resp.status_code == 422
            if passed:
                error_data = pricing_resp.json()
                passed = error_data.get("detail", {}).get("reason_code") == "OFFER_PRICE_EXCEEDS_MRP"
            
            print_test("Block Offer > MRP", passed, json.dumps(pricing_resp.json() if not passed else {}))


def test_discount_within_cap_auto_approved():
    """TEST 1.2: Auto-Approved Discount (Within Limits)"""
    print("\n=== TEST 1.2: Happy Path - Auto-Approved Discount ===\n")
    
    # Create order with frame
    create_resp = requests.post(f"{BASE_URL}/orders", json={
        "customer_id": "cust1",
        "patient_id": "patient1",
        "location_id": "loc_store1",
        "created_by": "user_sales1"
    })
    
    if create_resp.status_code == 201:
        order_id = create_resp.json()["order_id"]
        
        # Attach frame
        requests.post(f"{BASE_URL}/orders/{order_id}/items", json={
            "product_id": "prod_frame_mass1",
            "quantity": 1,
            "attributes": {
                "frame_type": "Optical",
                "gender": "Unisex",
                "frame_shape": "Rectangle",
                "frame_material": "Acetate",
                "frame_colour": "Black",
                "size": "52-18-140",
                "rim_type": "Full Rim",
                "frame_category": "Mass",
                "country_of_origin": "India"
            }
        })
        
        # Review pricing
        pricing_resp = requests.post(f"{BASE_URL}/orders/{order_id}/pricing/review", json={"requested_by": "user_sales1"})
        
        if pricing_resp.status_code == 200:
            pricing_data = pricing_resp.json()
            item_id = pricing_data["discount_eligible_items"][0] if pricing_data["discount_eligible_items"] else None
            
            if item_id:
                # Request 8% discount (cap is 10% for Sales Staff on Mass category)
                discount_resp = requests.post(f"{BASE_URL}/orders/{order_id}/discounts/request", json={
                    "order_item_id": item_id,
                    "requested_discount_percent": 8.0,
                    "reason": "Customer request",
                    "requested_by": "user_sales1"
                })
                
                passed = discount_resp.status_code == 200
                if passed:
                    discount_data = discount_resp.json()
                    passed = discount_data.get("status") == "AUTO_APPROVED"
                    print_test("Discount auto-approved (8% within 10% cap)", passed)
                    if passed:
                        print(f"     Discount: {discount_data.get('approved_discount_percent')}%")
                else:
                    print_test("Discount auto-approved", False, discount_resp.text)


def test_discount_exceeds_cap_requires_approval():
    """TEST 2.4: Discount Exceeding Role Cap"""
    print("\n=== TEST 2.4: Enforcement - Discount Exceeds Cap ===\n")
    
    # Create order
    create_resp = requests.post(f"{BASE_URL}/orders", json={
        "customer_id": "cust1",
        "patient_id": "patient1",
        "location_id": "loc_store1",
        "created_by": "user_sales1"
    })
    
    if create_resp.status_code == 201:
        order_id = create_resp.json()["order_id"]
        
        # Attach frame
        requests.post(f"{BASE_URL}/orders/{order_id}/items", json={
            "product_id": "prod_frame_mass1",
            "quantity": 1,
            "attributes": {
                "frame_type": "Optical",
                "gender": "Unisex",
                "frame_shape": "Rectangle",
                "frame_material": "Acetate",
                "frame_colour": "Black",
                "size": "52-18-140",
                "rim_type": "Full Rim",
                "frame_category": "Mass",
                "country_of_origin": "India"
            }
        })
        
        # Review pricing
        requests.post(f"{BASE_URL}/orders/{order_id}/pricing/review", json={"requested_by": "user_sales1"})
        
        # Get order state to find item ID
        state_resp = requests.get(f"{BASE_URL}/orders/{order_id}/state")
        if state_resp.status_code == 200:
            # Get items
            from database import order_items_collection
            items = list(order_items_collection.find({"order_id": order_id}))
            item_id = items[0]["id"] if items else None
            
            if item_id:
                # Request 15% discount (exceeds 10% cap)
                discount_resp = requests.post(f"{BASE_URL}/orders/{order_id}/discounts/request", json={
                    "order_item_id": item_id,
                    "requested_discount_percent": 15.0,
                    "reason": "Customer request for bulk order",
                    "requested_by": "user_sales1"
                })
                
                passed = discount_resp.status_code == 200
                if passed:
                    discount_data = discount_resp.json()
                    passed = discount_data.get("status") == "REQUIRES_APPROVAL"
                    print_test("Discount requires approval (15% exceeds 10% cap)", passed)
                    if passed:
                        print(f"     Status: {discount_data.get('status')}")
                        print(f"     Approver Required: {discount_data.get('approver_role_required')}")
                else:
                    print_test("Discount enforcement", False, discount_resp.text)


def test_luxury_category_always_requires_approval():
    """TEST 2.5: Luxury Category Discount"""
    print("\n=== TEST 2.5: Enforcement - Luxury Always Requires Approval ===\n")
    
    # Create order
    create_resp = requests.post(f"{BASE_URL}/orders", json={
        "customer_id": "cust1",
        "patient_id": "patient1",
        "location_id": "loc_store1",
        "created_by": "user_sales1"
    })
    
    if create_resp.status_code == 201:
        order_id = create_resp.json()["order_id"]
        
        # Attach luxury frame
        requests.post(f"{BASE_URL}/orders/{order_id}/items", json={
            "product_id": "prod_frame_luxury1",
            "quantity": 1,
            "attributes": {
                "frame_type": "Optical",
                "gender": "Unisex",
                "frame_shape": "Aviator",
                "frame_material": "Titanium",
                "frame_colour": "Gold",
                "size": "58-16-145",
                "rim_type": "Full Rim",
                "frame_category": "Luxury",
                "country_of_origin": "Italy"
            }
        })
        
        # Review pricing
        requests.post(f"{BASE_URL}/orders/{order_id}/pricing/review", json={"requested_by": "user_sales1"})
        
        # Get item ID
        from database import order_items_collection
        items = list(order_items_collection.find({"order_id": order_id}))
        item_id = items[0]["id"] if items else None
        
        if item_id:
            # Request 1% discount on luxury (within 2% cap but luxury always requires approval)
            discount_resp = requests.post(f"{BASE_URL}/orders/{order_id}/discounts/request", json={
                "order_item_id": item_id,
                "requested_discount_percent": 1.0,
                "reason": "VIP customer",
                "requested_by": "user_sales1"
            })
            
            passed = discount_resp.status_code == 200
            if passed:
                discount_data = discount_resp.json()
                passed = discount_data.get("status") == "REQUIRES_APPROVAL"
                print_test("Luxury requires approval (even 1%)", passed)
                if passed:
                    print(f"     Status: {discount_data.get('status')}")
                    print(f"     Luxury Enforcement: Active")


def test_edit_after_pricing_lock():
    """TEST 2.7: Edit After Pricing Lock (Immutability)"""
    print("\n=== TEST 2.7: Immutability - Edit After Lock ===\n")
    
    # Create order
    create_resp = requests.post(f"{BASE_URL}/orders", json={
        "customer_id": "cust1",
        "patient_id": "patient1",
        "location_id": "loc_store1",
        "created_by": "user_sales1"
    })
    
    if create_resp.status_code == 201:
        order_id = create_resp.json()["order_id"]
        
        # Attach item, review, lock
        requests.post(f"{BASE_URL}/orders/{order_id}/items", json={
            "product_id": "prod_frame_mass1",
            "quantity": 1,
            "attributes": {
                "frame_type": "Optical",
                "gender": "Unisex",
                "frame_shape": "Rectangle",
                "frame_material": "Acetate",
                "frame_colour": "Black",
                "size": "52-18-140",
                "rim_type": "Full Rim",
                "frame_category": "Mass",
                "country_of_origin": "India"
            }
        })
        
        requests.post(f"{BASE_URL}/orders/{order_id}/pricing/review", json={"requested_by": "user_sales1"})
        requests.post(f"{BASE_URL}/orders/{order_id}/pricing/lock", json={"locked_by": "user_sales1"})
        
        # Attempt to add item after lock (should fail)
        edit_resp = requests.post(f"{BASE_URL}/orders/{order_id}/items", json={
            "product_id": "prod_acc1",
            "quantity": 1,
            "attributes": {
                "accessory_type": "Case",
                "material": "Leather",
                "usage_type": "Storage"
            }
        })
        
        passed = edit_resp.status_code == 409
        if passed:
            error_data = edit_resp.json()
            passed = error_data.get("detail", {}).get("reason_code") == "INVALID_STATE_FOR_ACTION"
        
        print_test("Block edit after lock", passed, edit_resp.text if not passed else "")


def test_audit_event_completeness():
    """TEST 5.1: Audit Event Completeness"""
    print("\n=== TEST 5.1: Audit - Event Completeness ===\n")
    
    from database import audit_logs_collection
    
    # Create complete order flow
    create_resp = requests.post(f"{BASE_URL}/orders", json={
        "customer_id": "cust1",
        "patient_id": "patient1",
        "location_id": "loc_store1",
        "created_by": "user_sales1"
    })
    
    if create_resp.status_code == 201:
        order_id = create_resp.json()["order_id"]
        
        # Attach item
        requests.post(f"{BASE_URL}/orders/{order_id}/items", json={
            "product_id": "prod_frame_mass1",
            "quantity": 1,
            "attributes": {
                "frame_type": "Optical",
                "gender": "Unisex",
                "frame_shape": "Rectangle",
                "frame_material": "Acetate",
                "frame_colour": "Black",
                "size": "52-18-140",
                "rim_type": "Full Rim",
                "frame_category": "Mass",
                "country_of_origin": "India"
            }
        })
        
        # Review pricing
        requests.post(f"{BASE_URL}/orders/{order_id}/pricing/review", json={"requested_by": "user_sales1"})
        
        # Lock pricing
        requests.post(f"{BASE_URL}/orders/{order_id}/pricing/lock", json={"locked_by": "user_sales1"})
        
        # Query audit logs
        audit_events = list(audit_logs_collection.find({"entity_id": order_id}).sort("timestamp", 1))
        
        expected_events = ["ORDER_CREATED", "PRICING_REVIEWED", "PRICING_LOCKED"]
        found_events = [event["event_type"] for event in audit_events if event["entity_type"] == "ORDER"]
        
        passed = all(evt in found_events for evt in expected_events)
        print_test("All audit events present", passed)
        if passed:
            print(f"     Events: {', '.join(found_events)}")
        
        # Verify audit event structure
        if audit_events:
            first_event = audit_events[0]
            required_fields = ["event_id", "event_type", "entity_type", "entity_id", "action", "role_context", "actor_id", "timestamp"]
            missing_fields = [field for field in required_fields if field not in first_event]
            
            print_test("Audit event structure complete", len(missing_fields) == 0, f"Missing: {missing_fields}" if missing_fields else "")


def run_all_tests():
    """Run all Phase 2 tests"""
    print("\n" + "="*80)
    print("PHASE 2 — API TESTS")
    print("BUILD PASS 6 — PHASE 2 (POS Core)")
    print("="*80)
    
    try:
        test_happy_path_complete_flow()
        test_lens_without_prescription()
        test_offer_exceeds_mrp()
        test_discount_within_cap_auto_approved()
        test_discount_exceeds_cap_requires_approval()
        test_luxury_category_always_requires_approval()
        test_edit_after_pricing_lock()
        test_audit_event_completeness()
        
        print("\n" + "="*80)
        print("TEST EXECUTION COMPLETE")
        print("="*80 + "\n")
        
    except Exception as e:
        print(f"\n❌ Test execution failed with error: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    run_all_tests()
