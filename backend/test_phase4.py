"""
Phase 4 API Tests - Billing, Payments, Invoice
Build Pass 7 - Phase 4
"""

import requests
import json

BASE_URL = "http://localhost:8001/api"


def print_test(name, passed, details=""):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} | {name}")
    if details and not passed:
        print(f"     Details: {details}")


def create_test_order_to_locked():
    """Helper: Create order and lock pricing"""
    # Create order
    resp = requests.post(f"{BASE_URL}/orders", json={
        "customer_id": "cust1",
        "patient_id": "patient1",
        "location_id": "loc_store1",
        "created_by": "user_sales1"
    })
    
    if resp.status_code != 201:
        return None, None
    
    order_id = resp.json()["order_id"]
    
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
    
    # Lock pricing
    resp_lock = requests.post(f"{BASE_URL}/orders/{order_id}/pricing/lock", json={"locked_by": "user_sales1"})
    
    if resp_lock.status_code == 200:
        pricing_snapshot = resp_lock.json()["pricing_snapshot"]
        return order_id, pricing_snapshot.get("grand_total", 0.0)
    
    return None, None


def test_create_bill_happy_path():
    """TEST 4.1: Create Bill from PRICING_LOCKED Order"""
    print("\n=== TEST 4.1: Happy Path - Create Bill ===\n")
    
    order_id, total = create_test_order_to_locked()
    
    if order_id:
        # Create bill
        resp = requests.post(f"{BASE_URL}/bills", json={
            "order_id": order_id,
            "created_by": "user_sales1"
        })
        
        passed = resp.status_code == 201
        print_test("Create Bill from PRICING_LOCKED", passed)
        
        if passed:
            bill_data = resp.json()
            print(f"     Bill ID: {bill_data['bill_id']}")
            print(f"     Bill Number: {bill_data['bill_number']}")
            print(f"     Total Amount: ₹{bill_data['total_amount']}")
            print(f"     Outstanding: ₹{bill_data['outstanding_balance']}")
            print(f"     Immutable: {bill_data['immutable']}")
            
            return bill_data['bill_id'], bill_data['total_amount']
    
    return None, None


def test_billing_before_lock():
    """TEST 4.2: Block Billing Before PRICING_LOCKED"""
    print("\n=== TEST 4.2: Enforcement - Block Billing Before Lock ===\n")
    
    # Create order but don't lock
    resp = requests.post(f"{BASE_URL}/orders", json={
        "customer_id": "cust1",
        "patient_id": "patient1",
        "location_id": "loc_store1",
        "created_by": "user_sales1"
    })
    
    if resp.status_code == 201:
        order_id = resp.json()["order_id"]
        
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
        
        # Attempt to bill without locking
        bill_resp = requests.post(f"{BASE_URL}/bills", json={
            "order_id": order_id,
            "created_by": "user_sales1"
        })
        
        passed = bill_resp.status_code == 409
        if passed:
            error_data = bill_resp.json()
            passed = error_data.get("detail", {}).get("reason_code") == "BILLING_BEFORE_LOCK"
        
        print_test("Block billing before PRICING_LOCKED", passed)


def test_payment_recording():
    """TEST 4.3: Record Payment (Full Payment)"""
    print("\n=== TEST 4.3: Happy Path - Record Full Payment ===\n")
    
    # Create bill
    bill_id, total = test_create_bill_happy_path()
    
    if bill_id:
        # Record full payment
        resp = requests.post(f"{BASE_URL}/bills/{bill_id}/payments", json={
            "payment_mode": "CASH",
            "amount": total,
            "collected_by": "user_sales1"
        })
        
        passed = resp.status_code == 201
        print_test("Record full payment", passed)
        
        if passed:
            payment_data = resp.json()
            print(f"     Payment ID: {payment_data['payment_id']}")
            print(f"     Amount: ₹{payment_data['amount']}")
            print(f"     Mode: {payment_data['payment_mode']}")
            print(f"     Outstanding After: ₹{payment_data['outstanding_after_payment']}")
            
            return bill_id


def test_partial_payment():
    """TEST 4.4: Record Partial Payment"""
    print("\n=== TEST 4.4: Happy Path - Partial Payment ===\n")
    
    order_id, total = create_test_order_to_locked()
    
    if order_id:
        # Create bill
        bill_resp = requests.post(f"{BASE_URL}/bills", json={"order_id": order_id, "created_by": "user_sales1"})
        bill_id = bill_resp.json()["bill_id"]
        
        # Record partial payment (50%)
        partial_amount = total * 0.5
        resp = requests.post(f"{BASE_URL}/bills/{bill_id}/payments", json={
            "payment_mode": "UPI",
            "amount": partial_amount,
            "reference": "UPI123456",
            "collected_by": "user_sales1"
        })
        
        passed = resp.status_code == 201
        print_test("Record partial payment (50%)", passed)
        
        if passed:
            payment_data = resp.json()
            expected_outstanding = total - partial_amount
            actual_outstanding = payment_data['outstanding_after_payment']
            
            balance_correct = abs(actual_outstanding - expected_outstanding) < 0.01
            print_test("Outstanding balance calculated correctly", balance_correct)
            print(f"     Paid: ₹{partial_amount}, Remaining: ₹{actual_outstanding}")


def test_mixed_payments():
    """TEST 4.5: Mixed Payment Modes"""
    print("\n=== TEST 4.5: Happy Path - Mixed Payments ===\n")
    
    order_id, total = create_test_order_to_locked()
    
    if order_id:
        # Create bill
        bill_resp = requests.post(f"{BASE_URL}/bills", json={"order_id": order_id, "created_by": "user_sales1"})
        bill_id = bill_resp.json()["bill_id"]
        
        # Payment 1: Cash
        requests.post(f"{BASE_URL}/bills/{bill_id}/payments", json={
            "payment_mode": "CASH",
            "amount": total * 0.4,
            "collected_by": "user_sales1"
        })
        
        # Payment 2: UPI
        requests.post(f"{BASE_URL}/bills/{bill_id}/payments", json={
            "payment_mode": "UPI",
            "amount": total * 0.3,
            "reference": "UPI789",
            "collected_by": "user_sales1"
        })
        
        # Payment 3: Card
        resp3 = requests.post(f"{BASE_URL}/bills/{bill_id}/payments", json={
            "payment_mode": "CARD",
            "amount": total * 0.3,
            "reference": "CARD456",
            "collected_by": "user_sales1"
        })
        
        print_test("Mixed payments recorded", resp3.status_code == 201)
        
        if resp3.status_code == 201:
            final_outstanding = resp3.json()['outstanding_after_payment']
            print(f"     Final Outstanding: ₹{final_outstanding}")


def test_invoice_generation_happy_path():
    """TEST 4.6: Generate Invoice After Full Payment"""
    print("\n=== TEST 4.6: Happy Path - Generate Invoice ===\n")
    
    # Create and pay bill
    bill_id = test_payment_recording()
    
    if bill_id:
        # Generate invoice
        resp = requests.post(f"{BASE_URL}/invoices", json={
            "bill_id": bill_id,
            "generated_by": "user_sales1"
        })
        
        passed = resp.status_code == 201
        print_test("Generate invoice after full payment", passed)
        
        if passed:
            invoice_data = resp.json()
            print(f"     Invoice ID: {invoice_data['invoice_id']}")
            print(f"     Invoice Number: {invoice_data['invoice_number']}")
            print(f"     Total Amount: ₹{invoice_data['total_amount']}")
            print(f"     Immutable: {invoice_data['immutable']}")


def test_invoice_before_full_payment():
    """TEST 4.7: Block Invoice with Outstanding Balance"""
    print("\n=== TEST 4.7: Enforcement - Block Invoice with Outstanding ===\n")
    
    order_id, total = create_test_order_to_locked()
    
    if order_id:
        # Create bill
        bill_resp = requests.post(f"{BASE_URL}/bills", json={"order_id": order_id, "created_by": "user_sales1"})
        bill_id = bill_resp.json()["bill_id"]
        
        # Record partial payment only
        requests.post(f"{BASE_URL}/bills/{bill_id}/payments", json={
            "payment_mode": "CASH",
            "amount": total * 0.5,  # Only 50% paid
            "collected_by": "user_sales1"
        })
        
        # Attempt invoice generation
        invoice_resp = requests.post(f"{BASE_URL}/invoices", json={
            "bill_id": bill_id,
            "generated_by": "user_sales1"
        })
        
        passed = invoice_resp.status_code == 409
        if passed:
            error_data = invoice_resp.json()
            passed = error_data.get("detail", {}).get("reason_code") == "OUTSTANDING_BALANCE"
        
        print_test("Block invoice with outstanding balance", passed)


def test_payment_exceeds_outstanding():
    """TEST 4.8: Block Payment Exceeding Outstanding"""
    print("\n=== TEST 4.8: Enforcement - Payment Exceeds Outstanding ===\n")
    
    order_id, total = create_test_order_to_locked()
    
    if order_id:
        # Create bill
        bill_resp = requests.post(f"{BASE_URL}/bills", json={"order_id": order_id, "created_by": "user_sales1"})
        bill_id = bill_resp.json()["bill_id"]
        
        # Attempt payment exceeding outstanding
        resp = requests.post(f"{BASE_URL}/bills/{bill_id}/payments", json={
            "payment_mode": "CASH",
            "amount": total * 1.5,  # 150% of bill amount
            "collected_by": "user_sales1"
        })
        
        passed = resp.status_code == 400
        if passed:
            error_data = resp.json()
            passed = error_data.get("detail", {}).get("reason_code") == "PAYMENT_EXCEEDS_OUTSTANDING"
        
        print_test("Block payment exceeding outstanding", passed)


def run_all_tests():
    """Run all Phase 4 tests"""
    print("\n" + "="*80)
    print("PHASE 4 — BILLING, PAYMENTS & INVOICE TESTS")
    print("BUILD PASS 7 — PHASE 4")
    print("="*80)
    
    try:
        test_create_bill_happy_path()
        test_billing_before_lock()
        test_payment_recording()
        test_partial_payment()
        test_mixed_payments()
        test_invoice_generation_happy_path()
        test_invoice_before_full_payment()
        test_payment_exceeds_outstanding()
        
        print("\n" + "="*80)
        print("TEST EXECUTION COMPLETE")
        print("="*80 + "\n")
        
    except Exception as e:
        print(f"\n❌ Test execution failed: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    run_all_tests()
