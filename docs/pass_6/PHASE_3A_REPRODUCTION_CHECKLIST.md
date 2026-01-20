# PHASE 3A — REPRODUCTION CHECKLIST

## Prerequisites

**Services Running:**
- Backend: http://localhost:8001 (FastAPI)
- Frontend: http://localhost:3000 (React)
- MongoDB: localhost:27017

**Test Data Seeded:**
- Run: `cd /app/backend && python seed_fixtures.py`

---

## Launch Instructions

### Step 1: Start Services
```bash
sudo supervisorctl status
# Verify:
# - backend: RUNNING
# - frontend: RUNNING
# - mongodb: RUNNING
```

### Step 2: Access Application
- **URL:** http://localhost:3000
- **Login Credentials:**
  - Username: `sales1` or `manager1` or `admin1`
  - Password: `any` (mock login - no validation in Phase 3A)
  - **Mock Login:** Any credentials will log you in as Superadmin (showing all modules)

---

## POS Flow Navigation Steps

### Test Scenario: Complete Optical Order (Frame + Lens)

#### Step 1: Navigate to POS
1. Login to application
2. Click "POS / Sales" in sidebar
3. **Expected:** POS Home screen loads
4. **Expected:** Flow progress indicator shows: Customer (active) → Patient → Prescription → Products → Pricing

#### Step 2: Select Customer
1. **Screen:** Customer selection panel visible
2. Search for customer or select from list
3. Select "Test Customer 1"
4. **Expected:** Advances to Step 2 (Patient selection)
5. **Expected:** Progress indicator shows Patient as active step

#### Step 3: Select Patient
1. **Screen:** Patient selection panel visible
2. Patient list shows patients linked to selected customer
3. Select "Patient 1"
4. **Expected:** Advances to Step 3 (Prescription selection)
5. **Expected:** Progress indicator shows Prescription as active step

#### Step 4: Select Prescription (CRITICAL)
1. **Screen:** Prescription selection panel visible
2. **Visual Check:** Blue border on card (indicates critical step)
3. **Visual Check:** Warning message: "🔒 Prescription Required for Optical Sales"
4. Prescription list shows:
   - Valid prescriptions with green "Valid until..." badge
   - Expired prescriptions with red "Expired" badge (not selectable)
5. Select valid prescription (click on prescription card)
6. **Expected:** Advances to Step 4 (Product selection)
7. **Expected:** Order created (order_id shown in right panel)

#### Step 5: Product Selection - Verify ALL Categories
1. **Screen:** Product selection with category tabs
2. **Visual Check:** ALL 7 categories visible:
   - ✅ Optical Frames (icon: 👓)
   - ✅ Sunglasses (icon: 🕶️)
   - ✅ Optical Lenses 🔒 (icon: 🔬, lock icon if no prescription)
   - ✅ Contact Lenses 🔒 (icon: 👁️, lock icon if no prescription)
   - ✅ Accessories (icon: 🎒)
   - ✅ Watches (icon: ⌚)
   - ✅ Services (icon: 🔧)

3. **Visual Check:** Optical Lenses and Contact Lenses tabs:
   - Should NOT have lock icon (prescription already selected)
   - Should be clickable and active

4. Click "Optical Lenses" tab
5. **Expected:** Lens products displayed
6. Select a lens product (click on product card)
7. **Expected:** Lens added to cart (shown in right panel)

8. Click "Optical Frames" tab
9. Select a frame product
10. **Expected:** Frame added to cart

#### Step 6: Review Pricing
1. **Visual Check:** "Review Pricing" button visible below product grid
2. Click "Review Pricing" button
3. **Expected:** Advances to Step 5 (Pricing Review)
4. **Screen:** Pricing review card visible with:
   - Items table (product name, MRP, offer price, quantity, total)
   - Subtotal
   - GST breakdown (CGST, SGST)
   - Grand Total (highlighted in blue)
5. **Verification:** All prices computed server-side (no client calculations)

#### Step 7: Lock Pricing
1. **Visual Check:** "🔒 Lock Pricing (Irreversible)" button visible
2. **Visual Check:** Warning about immutability
3. Click "Lock Pricing" button
4. **Expected:** Success alert: "✅ Pricing locked successfully!"
5. **Expected:** Flow resets to Step 1 (ready for new sale)

---

## Prescription Gating Verification

### Test: Access Lens Without Prescription

1. Login and navigate to POS
2. Select Customer → Select Patient
3. **SKIP prescription selection** (click back or navigate away)
4. Navigate to Product selection (if possible)
5. Click "Optical Lenses" tab
6. **Expected:**
   - Tab shows 🔒 lock icon
   - Tab is grayed out / disabled
   - Tooltip or warning: "🔒 Prescription Required"
   - Products NOT displayed or disabled

**Result:** Lens category is GATED behind prescription

---

## Category Visibility Verification

### Manual Check:
Count visible category tabs in POS Product Selection:
- [ ] Optical Frames
- [ ] Sunglasses
- [ ] Optical Lenses
- [ ] Contact Lenses
- [ ] Accessories
- [ ] Watches
- [ ] Services

**Expected Count:** 7 categories

**NO category should be hidden.**

---

## Backend Isolation Verification

### Check Phase 2 APIs Unchanged:
```bash
# Compare Phase 2 endpoint count
curl -s http://localhost:8001/openapi.json | grep -o '"\/api\/orders' | wc -l
# Should show Phase 2 endpoints + Phase 3A stubs
```

### Verify No Phase 2 Logic Modified:
- State machine logic unchanged
- Category enforcement unchanged
- Discount enforcement unchanged
- Audit service unchanged

---

## Error Handling Verification

### Test: Invalid Prescription
1. Create order with customer + patient
2. Attempt to attach LENS without prescription_id
3. **Expected:** Backend returns 400 with reason_code: PRESCRIPTION_REQUIRED
4. **Expected:** Frontend shows error alert with exact message

### Test: Offer > MRP
1. Create order, attach items
2. Review pricing with product where Offer > MRP
3. **Expected:** Backend returns 422 with reason_code: OFFER_PRICE_EXCEEDS_MRP

---

## Screenshots Required

1. **Login Screen** - showing login form
2. **POS Home - Step 1** - Customer selection
3. **POS Home - Step 2** - Patient selection
4. **POS Home - Step 3** - **Prescription selection (CRITICAL)**
   - Must show prescription list
   - Must show valid vs expired badges
   - Must show blue border indicating critical step
5. **POS Home - Step 4** - Product selection with ALL 7 category tabs visible
   - Zoom to show all tab names and icons
   - Show lock icons on Lens tabs (if no prescription) OR unlocked (if prescription selected)
6. **POS Home - Step 5** - Pricing review with server-computed totals
7. **Success Alert** - Pricing locked confirmation

---

## Acceptance Criteria

Phase 3A can ONLY be marked complete if:
- [ ] All 7 categories visible in POS
- [ ] Prescription step exists and is mandatory
- [ ] Lens/Contact Lens gated behind prescription
- [ ] Complete flow navigable without crashes
- [ ] Backend errors surface with reason codes
- [ ] No Phase 2 logic modified
- [ ] Screenshots provided showing all above

---

END OF REPRODUCTION CHECKLIST
