# PHASE 2 — TEST SPECIFICATION PACK
BUILD PASS 6 — PHASE 2 (POS Core)
IMS 2.0 Retail Operating System

---

## TEST CATEGORY 1: HAPPY PATH TESTS

### TEST 1.1: Complete Order Flow (Frame + Lens with Prescription)
**Scenario:** Sales staff creates optical order with prescription

**Steps:**
1. POST /orders with valid customer_id, patient_id, location_id
2. Verify response: state = CREATED, order_id returned
3. POST /orders/{id}/items with LENS item + prescription_id
4. Verify response: state = ITEMS_ATTACHED, prescription_bound = true
5. POST /orders/{id}/items with FRAME item
6. Verify response: item attached successfully
7. POST /orders/{id}/pricing/review
8. Verify response: pricing_snapshot computed, state = PRICING_REVIEWED
9. POST /orders/{id}/pricing/lock
10. Verify response: state = PRICING_LOCKED, immutable = true

**Expected Outcome:**
- ✅ All API calls succeed
- ✅ Order progresses: CREATED → ITEMS_ATTACHED → PRICING_REVIEWED → PRICING_LOCKED
- ✅ Audit events emitted for each step
- ✅ Pricing snapshot immutable after lock

**Audit Verification:**
- 7+ audit_logs entries
- Event sequence: ORDER_CREATED → ORDER_ITEM_ATTACHED (x2) → PRICING_REVIEWED → PRICING_LOCKED

---

### TEST 1.2: Auto-Approved Discount (Within Limits)
**Scenario:** Sales staff requests discount within role and category cap

**Steps:**
1. Create order and attach items (state = ITEMS_ATTACHED)
2. POST /orders/{id}/pricing/review (state = PRICING_REVIEWED)
3. POST /orders/{id}/discounts/request with:
   - order_item_id (Frame, Mass category)
   - requested_discount_percent = 8% (cap is 10%)
   - Role: Sales Staff (cap 10%)
4. Verify response: status = AUTO_APPROVED
5. POST /orders/{id}/pricing/lock
6. Verify: discount applied in pricing_snapshot

**Expected Outcome:**
- ✅ Discount auto-approved (no manual approval needed)
- ✅ Discount applied to pricing
- ✅ Order locks successfully
- ✅ Audit events: DISCOUNT_REQUESTED (status: AUTO_APPROVED) → DISCOUNT_APPLIED → PRICING_LOCKED

---

### TEST 1.3: Multiple Items with Different Categories
**Scenario:** Order with Frame, Lens, Accessories

**Steps:**
1. Create order
2. Attach LENS item (with prescription) - verify category enforcement
3. Attach FRAME item - verify category enforcement
4. Attach ACCESSORY item - verify category enforcement
5. Review pricing - verify each item's discount eligibility based on category
6. Lock pricing

**Expected Outcome:**
- ✅ Each item validated against its category rules
- ✅ Different discount caps applied per category
- ✅ All items in final pricing snapshot

---

## TEST CATEGORY 2: ENFORCEMENT FAILURE TESTS

### TEST 2.1: LENS Without Prescription (HARD BLOCK)
**Scenario:** Attempt to add lens without prescription_id

**Steps:**
1. Create order (state = CREATED)
2. POST /orders/{id}/items with:
   - product_id (category = LENS)
   - NO prescription_id in payload
3. Verify response

**Expected Outcome:**
- ❌ API returns 400 Bad Request
- ❌ reason_code: PRESCRIPTION_REQUIRED
- ❌ message: "Prescription required for LENS category"
- ✅ Order state unchanged (still CREATED)
- ✅ Audit event: CATEGORY_ENFORCEMENT_FAILED

---

### TEST 2.2: Offer Price > MRP (HARD BLOCK)
**Scenario:** Product has Offer Price exceeding MRP

**Setup:**
- Product: product_id = P123, MRP = 1000, Offer Price = 1200

**Steps:**
1. Create order
2. Attach item with product_id = P123
3. POST /orders/{id}/pricing/review

**Expected Outcome:**
- ❌ API returns 422 Unprocessable Entity
- ❌ reason_code: OFFER_PRICE_EXCEEDS_MRP
- ❌ message: "Offer price 1200 exceeds MRP 1000"
- ✅ State unchanged (ITEMS_ATTACHED)
- ✅ Audit event: PRICING_REVIEWED failed with violation details

---

### TEST 2.3: Discount on Non-Eligible Item (Offer < MRP)
**Scenario:** Attempt discount when Offer Price < MRP

**Setup:**
- Product: MRP = 1000, Offer Price = 800

**Steps:**
1. Create order, attach item, review pricing
2. POST /orders/{id}/discounts/request with discount_percent = 5%

**Expected Outcome:**
- ❌ API returns 403 Forbidden
- ❌ reason_code: DISCOUNT_NOT_ELIGIBLE
- ❌ message: "Offer Price < MRP, no discount allowed"
- ✅ Audit event: DISCOUNT_REQUESTED with status = BLOCKED

---

### TEST 2.4: Discount Exceeding Role Cap (Requires Approval)
**Scenario:** Sales staff requests 15% when cap is 10%

**Steps:**
1. Create order, attach item (Mass category, cap = 10%)
2. Review pricing
3. POST /orders/{id}/discounts/request with:
   - requested_discount_percent = 15%
   - Role: Sales Staff (cap 10%)

**Expected Outcome:**
- ✅ API returns 202 Accepted
- ✅ status: REQUIRES_APPROVAL
- ✅ discount_request created with status = PENDING_APPROVAL
- ✅ Approver role indicated (STORE_MANAGER)
- ✅ Audit event: DISCOUNT_REQUESTED (status: PENDING_APPROVAL)

---

### TEST 2.5: Luxury Category Discount (Always Requires Approval)
**Scenario:** Any discount on luxury frame

**Setup:**
- Product: Frame (Luxury), default cap = 2%

**Steps:**
1. Create order, attach luxury frame
2. Review pricing
3. POST /orders/{id}/discounts/request with 1% discount

**Expected Outcome:**
- ✅ API returns 202 Accepted
- ✅ status: REQUIRES_APPROVAL (even though 1% < 2%)
- ✅ Luxury category triggers mandatory approval
- ✅ Audit event with AI_MONITORING flag set

---

### TEST 2.6: Backward State Transition (HARD BLOCK)
**Scenario:** Attempt to move from PRICING_REVIEWED back to CREATED

**Steps:**
1. Create order → attach items → review pricing (state = PRICING_REVIEWED)
2. Attempt: POST /orders/{id}/items (add new item)

**Expected Outcome:**
- ❌ API returns 409 Conflict
- ❌ reason_code: INVALID_STATE_TRANSITION
- ❌ message: "Cannot add items to order in state PRICING_REVIEWED"
- ✅ State unchanged
- ✅ Audit event: UNAUTHORIZED_STATE_TRANSITION

---

### TEST 2.7: Edit After Pricing Lock (IMMUTABILITY CHECK)
**Scenario:** Attempt to edit order_items after PRICING_LOCKED

**Steps:**
1. Create order → attach items → review → lock (state = PRICING_LOCKED)
2. Attempt: PUT /orders/{id}/items/{item_id} (edit quantity)

**Expected Outcome:**
- ❌ API returns 409 Conflict
- ❌ reason_code: ORDER_LOCKED
- ❌ message: "Order is locked, no edits allowed"
- ✅ order_items unchanged
- ✅ Audit event: POST_LOCK_MUTATION_ATTEMPT

---

### TEST 2.8: Lock with Pending Approvals (BLOCK)
**Scenario:** Attempt pricing lock with unresolved discount requests

**Steps:**
1. Create order, attach items, review pricing
2. Request discount (status = PENDING_APPROVAL)
3. Attempt: POST /orders/{id}/pricing/lock (without approval)

**Expected Outcome:**
- ❌ API returns 409 Conflict
- ❌ reason_code: PENDING_DISCOUNT_APPROVALS
- ❌ pending_requests: [array of pending request IDs]
- ✅ State unchanged (PRICING_REVIEWED)
- ✅ Audit event: PRICING_LOCK_ATTEMPTED_WITH_PENDING_APPROVALS

---

### TEST 2.9: Missing Mandatory Category Attribute
**Scenario:** Attach frame without required "Frame Shape" attribute

**Steps:**
1. Create order
2. POST /orders/{id}/items with FRAME product_id but missing mandatory attribute "frame_shape"

**Expected Outcome:**
- ❌ API returns 400 Bad Request
- ❌ reason_code: CATEGORY_ENFORCEMENT_FAILED
- ❌ message: "Missing mandatory attribute 'frame_shape' for category FRAME"
- ✅ Item not created
- ✅ Audit event: CATEGORY_ENFORCEMENT_FAILED

---

### TEST 2.10: Expired Prescription for Lens
**Scenario:** Use expired prescription for lens item

**Setup:**
- Prescription: expiry_date = 2025-12-01 (past)

**Steps:**
1. Create order
2. POST /orders/{id}/items with LENS + expired prescription_id

**Expected Outcome:**
- ❌ API returns 400 Bad Request
- ❌ reason_code: PRESCRIPTION_EXPIRED
- ❌ message: "Prescription expired on 2025-12-01"
- ✅ Item not created
- ✅ Audit event: PRESCRIPTION_VALIDATION_FAILED

---

## TEST CATEGORY 3: ABUSE PATTERN TESTS

### TEST 3.1: Near-Limit Discount Pattern Detection
**Scenario:** Repeated discounts at 9.8% when cap is 10%

**Steps:**
1. User U1 requests 9.8% discount on 5 different orders over 2 days
2. All discounts auto-approved (within limit)
3. Query abuse detection system

**Expected Outcome:**
- ✅ All discounts approved (no blocking)
- ✅ Silent flag generated in abuse monitoring system
- ✅ Flag visible to Admin/Superadmin only
- ✅ No staff-facing alerts
- ✅ AI insight generated (read-only): "User U1 showing near-limit pattern"

**Verification:**
- Query admin dashboard: abuse_flags table has entry
- Entry includes: user_id, pattern_type = NEAR_LIMIT, detection_count = 5

---

### TEST 3.2: Category Hopping Pattern
**Scenario:** Discount blocked on luxury frame, staff adds high discount on accessory in same order

**Steps:**
1. Create order
2. Add luxury frame (discount blocked)
3. Add accessory with 18% discount (within accessory cap of 20%)
4. Review pricing
5. Query abuse detection

**Expected Outcome:**
- ✅ Accessory discount allowed (within cap)
- ✅ Pattern flagged for review (cross-category compensation attempt)
- ✅ Admin visibility only
- ✅ No blocking of sale

---

### TEST 3.3: Same Approver-Staff Pattern
**Scenario:** Manager M1 repeatedly approves discounts for Staff S1

**Steps:**
1. Staff S1 requests 5 discount overrides in 3 days
2. Manager M1 approves all 5

**Expected Outcome:**
- ✅ All approvals valid (if within authority)
- ✅ Pattern flagged: approval_graph analysis
- ✅ Escalation insight to Superadmin
- ✅ Audit log surfaced for review

---

## TEST CATEGORY 4: CONCURRENCY TESTS

### TEST 4.1: Concurrent Item Attachment
**Scenario:** Two users add items to same order simultaneously

**Steps:**
1. User A: POST /orders/{id}/items (item 1)
2. User B: POST /orders/{id}/items (item 2) — concurrent request
3. Verify both items created
4. Verify no state corruption

**Expected Outcome:**
- ✅ Both items attached successfully
- ✅ State transition handled correctly
- ✅ Audit events for both actions
- ✅ No race condition

---

### TEST 4.2: Concurrent Pricing Lock
**Scenario:** Two users try to lock same order simultaneously

**Steps:**
1. Order in PRICING_REVIEWED state
2. User A: POST /orders/{id}/pricing/lock
3. User B: POST /orders/{id}/pricing/lock (concurrent)
4. Verify only one succeeds

**Expected Outcome:**
- ✅ First request succeeds: state = PRICING_LOCKED
- ❌ Second request fails: 409 Conflict (already locked)
- ✅ No duplicate lock
- ✅ Both attempts audited

---

## TEST CATEGORY 5: AUDIT VERIFICATION TESTS

### TEST 5.1: Audit Event Completeness
**Scenario:** Verify every action generates audit event

**Steps:**
1. Execute complete happy path (order → items → pricing → lock)
2. Query audit_logs table for order_id
3. Verify all expected events exist

**Expected Events:**
1. ORDER_CREATED
2. ORDER_ITEM_ATTACHED (for each item)
3. PRICING_REVIEWED
4. PRICING_LOCKED

**Verification:**
- Each event has: event_id, entity_type, entity_id, action, role_context, actor_id, timestamp
- payload_snapshot is not null
- Events are chronologically ordered

---

### TEST 5.2: Enforcement Failure Audit
**Scenario:** Verify enforcement failures are audited

**Steps:**
1. Attempt to add LENS without prescription
2. Query audit_logs

**Expected Outcome:**
- ✅ Event: CATEGORY_ENFORCEMENT_FAILED
- ✅ Payload includes: missing attribute, category, reason
- ✅ actor_id captured
- ✅ timestamp accurate

---

### TEST 5.3: Audit Immutability
**Scenario:** Verify audit logs cannot be edited or deleted

**Steps:**
1. Create audit event
2. Attempt: UPDATE audit_logs SET ... (should fail)
3. Attempt: DELETE FROM audit_logs WHERE ... (should fail)

**Expected Outcome:**
- ❌ Updates blocked by database constraints or application layer
- ❌ Deletes blocked
- ✅ Append-only integrity maintained

---

## TEST CATEGORY 6: STATE MACHINE ENFORCEMENT TESTS

### TEST 6.1: Skip State Test
**Scenario:** Attempt to skip ITEMS_ATTACHED → go directly to PRICING_LOCKED

**Steps:**
1. Create order (state = CREATED)
2. POST /orders/{id}/pricing/lock (skip ITEMS_ATTACHED and PRICING_REVIEWED)

**Expected Outcome:**
- ❌ 409 Conflict
- ❌ reason_code: INVALID_STATE_TRANSITION
- ❌ message: "Order must be in PRICING_REVIEWED state"

---

### TEST 6.2: Backward Transition Test
**Scenario:** Attempt PRICING_REVIEWED → ITEMS_ATTACHED

**Steps:**
1. Order in PRICING_REVIEWED state
2. POST /orders/{id}/items (add new item)

**Expected Outcome:**
- ❌ 409 Conflict
- ❌ reason_code: INVALID_STATE_TRANSITION
- ❌ State unchanged

---

### TEST 6.3: Post-Lock Edit Attempt
**Scenario:** All edit attempts after PRICING_LOCKED must fail

**Actions to Test:**
1. Add item
2. Remove item
3. Edit item quantity
4. Request discount
5. Edit pricing

**Expected Outcome for All:**
- ❌ 409 Conflict
- ❌ reason_code: ORDER_LOCKED
- ✅ Audit event: POST_LOCK_MUTATION_ATTEMPT

---

## TEST CATEGORY 7: CATEGORY ENFORCEMENT TESTS

### TEST 7.1: Frame - All Mandatory Attributes
**Scenario:** Verify frame requires all mandatory attributes

**Missing Attributes to Test:**
- frame_type → 400
- gender → 400
- frame_shape → 400
- frame_material → 400
- frame_colour → 400
- size → 400
- rim_type → 400
- frame_category (luxury/premium/mass) → 400
- country_of_origin → 400

**Expected Outcome:**
- ❌ Each missing attribute causes 400 error
- ❌ reason_code: CATEGORY_ENFORCEMENT_FAILED
- ✅ Specific attribute name in error message

---

### TEST 7.2: Optical Lens - Prescription Required
**Scenario:** Verify lens always requires prescription

**Steps:**
1. POST /orders/{id}/items with LENS product
2. Include all other mandatory attributes
3. Omit prescription_id

**Expected Outcome:**
- ❌ 400 Bad Request
- ❌ reason_code: PRESCRIPTION_REQUIRED

---

### TEST 7.3: Contact Lens - Batch & Expiry Mandatory
**Scenario:** Verify contact lens specific attributes

**Missing Attributes to Test:**
- batch_number → 400
- expiry_tracking → 400

**Expected Outcome:**
- ❌ Category enforcement blocks creation

---

## TEST CATEGORY 8: DISCOUNT ENFORCEMENT TESTS

### TEST 8.1: Discount Matrix Validation
**Scenario:** Test all category × role combinations

**Test Matrix:**
| Category | Role | Requested % | Expected Outcome |
|----------|------|-------------|------------------|
| Frame (Mass) | Sales Staff (cap 10%) | 8% | AUTO_APPROVED |
| Frame (Mass) | Sales Staff | 15% | REQUIRES_APPROVAL |
| Frame (Luxury) | Sales Staff | 1% | REQUIRES_APPROVAL (luxury always) |
| Lens (Standard) | Store Manager (cap 15%) | 12% | AUTO_APPROVED |
| Lens (Premium) | Sales Staff (cap 8%) | 10% | REQUIRES_APPROVAL |
| Accessories | Sales Staff (cap 20%) | 18% | AUTO_APPROVED |
| Services | Any | Any | BLOCKED (non-discountable) |

**Verification:**
- Each outcome matches enforcement rules
- Audit events match decision

---

### TEST 8.2: Approval Authority Validation
**Scenario:** Verify approver must have sufficient authority

**Steps:**
1. Sales Staff requests 15% on Mass Frame (cap 10%)
2. Status: REQUIRES_APPROVAL (needs Store Manager)
3. Attempt approval by Sales Staff (insufficient authority)

**Expected Outcome:**
- ❌ 403 Forbidden
- ❌ reason_code: INSUFFICIENT_APPROVAL_AUTHORITY
- ❌ Request remains PENDING_APPROVAL

**Then:**
4. Approval by Store Manager (sufficient authority)

**Expected Outcome:**
- ✅ 200 OK
- ✅ status: APPROVED
- ✅ Audit event: DISCOUNT_APPROVED

---

### TEST 8.3: Missing Approval Reason
**Scenario:** Approval without reason must fail

**Steps:**
1. POST /discounts/{id}/approve with empty approval_reason

**Expected Outcome:**
- ❌ 400 Bad Request
- ❌ reason_code: MISSING_APPROVAL_REASON

---

## TEST CATEGORY 9: PRESCRIPTION VALIDATION TESTS

### TEST 9.1: Expired Prescription
**Scenario:** Prescription expired

**Setup:**
- Prescription: expiry_date = 2025-11-01 (past)
- Current date: 2026-01-20

**Steps:**
1. POST /orders/{id}/items with LENS + expired prescription_id

**Expected Outcome:**
- ❌ 400 Bad Request
- ❌ reason_code: PRESCRIPTION_EXPIRED

---

### TEST 9.2: Prescription-Patient Mismatch
**Scenario:** Prescription belongs to different patient

**Setup:**
- Order: patient_id = P1
- Prescription: patient_id = P2

**Steps:**
1. POST /orders/{id}/items with LENS + mismatched prescription_id

**Expected Outcome:**
- ❌ 409 Conflict
- ❌ reason_code: PRESCRIPTION_PATIENT_MISMATCH

---

### TEST 9.3: Prescription for Non-Lens Item
**Scenario:** Prescription attached to frame-only item (should be ignored or flagged)

**Steps:**
1. POST /orders/{id}/items with FRAME + prescription_id

**Expected Outcome:**
- ✅ Accepted (prescription_id nullable for non-lens)
- ⚠️ Optional: Warning logged but not blocking

---

## TEST CATEGORY 10: ROLE & PERMISSION TESTS

### TEST 10.1: Multi-Role User Context
**Scenario:** User with multiple roles (Sales Staff + Cashier)

**Steps:**
1. User has roles: [Sales Staff, Cashier]
2. Create order with active_role = Sales Staff
3. Verify discount cap = Sales Staff cap

**Expected Outcome:**
- ✅ Correct role context captured
- ✅ Discount enforcement uses active role, not all roles
- ✅ Audit event includes specific active_role_id

---

### TEST 10.2: Role Without Location Assignment
**Scenario:** User has role but not at order's location

**Setup:**
- User U1: role assignment at Location L1 only
- Order: location_id = L2

**Steps:**
1. POST /orders with location_id = L2, created_by = U1

**Expected Outcome:**
- ❌ 403 Forbidden
- ❌ reason_code: ROLE_VIOLATION
- ❌ message: "User does not have role assignment at this location"

---

## TEST CATEGORY 11: DATA INTEGRITY TESTS

### TEST 11.1: Orphaned Item Prevention
**Scenario:** Attempt to create order_item for non-existent order

**Steps:**
1. POST /orders/{fake_id}/items

**Expected Outcome:**
- ❌ 404 Not Found
- ❌ Foreign key constraint or existence check prevents orphan

---

### TEST 11.2: Pricing Snapshot Consistency
**Scenario:** Verify pricing snapshot matches item totals

**Steps:**
1. Create order with 3 items
2. Review pricing
3. Verify: sum of item totals == pricing_snapshot.subtotal
4. Verify: GST correctly computed
5. Verify: grand_total = subtotal + GST

**Expected Outcome:**
- ✅ All calculations accurate
- ✅ No rounding errors beyond 2 decimals

---

## MANDATORY VERIFICATION CHECKLIST (Per Test Run)

After each test:
- [ ] Verify HTTP status code matches expected
- [ ] Verify error response includes reason_code
- [ ] Verify error message is actionable
- [ ] Verify audit_logs entry exists
- [ ] Verify audit event_type is correct
- [ ] Verify entity state unchanged (for failure tests)
- [ ] Verify entity state progressed (for success tests)
- [ ] Verify role_context captured in audit
- [ ] Verify payload_snapshot is complete

---

## TEST EXECUTION GATES

**Phase 2 cannot proceed to Phase 3 unless:**
- ✅ All happy path tests pass
- ✅ All enforcement failure tests pass
- ✅ All abuse pattern tests generate correct flags
- ✅ All concurrency tests pass without corruption
- ✅ 100% audit event coverage verified
- ✅ No enforcement can be bypassed
- ✅ No post-lock mutations possible

---

END OF PHASE 2 TEST SPECIFICATION PACK
