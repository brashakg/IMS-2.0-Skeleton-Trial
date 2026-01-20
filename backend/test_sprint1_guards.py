import requests

BASE = "http://localhost:8001/api"

# Login
token_resp = requests.post(f"{BASE}/auth/login", json={"username": "sales1", "password": "test", "location_id": "loc_store1"})
token = token_resp.json()["access_token"]
headers = {"Authorization": f"Bearer {token}"}

# Create order → lock
order = requests.post(f"{BASE}/orders", json={"customer_id": "cust1", "patient_id": "patient1", "location_id": "loc_store1", "created_by": "user_sales1"}, headers=headers).json()
oid = order["order_id"]
requests.post(f"{BASE}/orders/{oid}/items", json={"product_id": "prod_frame_mass1", "quantity": 1, "attributes": {"frame_type": "Optical", "gender": "Unisex", "frame_shape": "Rectangle", "frame_material": "Acetate", "frame_colour": "Black", "size": "52-18-140", "rim_type": "Full Rim", "frame_category": "Mass", "country_of_origin": "India"}}, headers=headers)
requests.post(f"{BASE}/orders/{oid}/pricing/review", json={"requested_by": "user_sales1"}, headers=headers)
requests.post(f"{BASE}/orders/{oid}/pricing/lock", json={"locked_by": "user_sales1"}, headers=headers)

# Create bill
bill1 = requests.post(f"{BASE}/bills", json={"order_id": oid, "created_by": "user_sales1"}, headers=headers)
print(f"✓ Create bill: {bill1.status_code}")

# TEST: Double billing (should block)
bill2 = requests.post(f"{BASE}/bills", json={"order_id": oid, "created_by": "user_sales1"}, headers=headers)
print(f"✓ Double billing blocked: {bill2.status_code == 409} (got {bill2.status_code})")

if bill1.status_code == 201:
    bid = bill1.json()["bill_id"]
    total = bill1.json()["total_amount"]
    
    # TEST: Payment exceeds outstanding
    pay_over = requests.post(f"{BASE}/bills/{bid}/payments", json={"payment_mode": "CASH", "amount": total * 2, "collected_by": "user_sales1"}, headers=headers)
    print(f"✓ Payment exceeds blocked: {pay_over.status_code == 400} (got {pay_over.status_code})")
    
    # Pay full
    pay = requests.post(f"{BASE}/bills/{bid}/payments", json={"payment_mode": "CASH", "amount": total, "collected_by": "user_sales1"}, headers=headers)
    print(f"✓ Full payment: {pay.status_code}")
    
    # Generate invoice
    inv = requests.post(f"{BASE}/invoices", json={"bill_id": bid, "generated_by": "user_sales1"}, headers=headers)
    print(f"✓ Invoice generated: {inv.status_code}")
    
    # TEST: Duplicate invoice
    inv2 = requests.post(f"{BASE}/invoices", json={"bill_id": bid, "generated_by": "user_sales1"}, headers=headers)
    print(f"✓ Duplicate invoice blocked: {inv2.status_code == 409} (got {inv2.status_code})")
    
    # TEST: Payment after invoice
    pay_post = requests.post(f"{BASE}/bills/{bid}/payments", json={"payment_mode": "CASH", "amount": 10, "collected_by": "user_sales1"}, headers=headers)
    print(f"✓ Payment after invoice blocked: {pay_post.status_code == 409} (got {pay_post.status_code})")

print("\n✅ Sprint 1 guards operational")
