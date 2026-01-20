# PHASE 2 — BLOCKER ANALYSIS
BUILD PASS 6 — PHASE 2 (POS Core)
IMS 2.0 Retail Operating System

---

## PURPOSE

Identify dependencies and blockers that would prevent clean Phase 2 → Phase 3 progression.

---

## ✅ PHASE 2 SELF-CONTAINED DEPENDENCIES (Complete)

The following are required for Phase 2 and are within scope:

### Database Tables (Phase 2 Ownership):
- ✅ `orders` — with state field
- ✅ `order_items` — with prescription_id (nullable)
- ✅ `discount_requests`
- ✅ `discount_approvals`
- ✅ `discount_applications`
- ✅ `audit_logs` — append-only

### Reference Tables (Read-Only for Phase 2):
- ✅ `users`
- ✅ `roles`
- ✅ `user_roles`
- ✅ `locations`
- ✅ `products` — with category_id, MRP, Offer Price
- ✅ `prescriptions` — with patient_id, expiry_date
- ✅ `discount_rules` — role × category → caps

**Status:** All tables defined in Build Pass 3 (db/ schemas). No blockers.

---

## ⚠️ PHASE 3 DEPENDENCIES (Out of Scope - STUB REQUIRED)

Phase 2 interfaces with Phase 3 entities but does NOT implement them.

### 1. Stock Reservation (Inventory - Phase 3)
**Phase 2 Touch Point:** Item attachment  
**Required Interface:**
- Read-only stock availability check
- Stock reservation intent (create reservation record)

**Blocker Status:** ⚠️ STUB REQUIRED
**Mitigation:**
- Phase 2 can skip stock check (warning only)
- Or stub: `GET /inventory/stock?sku={sku}&location={location}` returns mock availability
- Actual stock mutation deferred to Phase 3

**Recommendation:** Stub with warning message: "Stock reservation pending (Phase 3)"

---

### 2. Prescription Creation (Clinical - Phase 3)
**Phase 2 Touch Point:** Lens item attachment requires prescription_id  
**Required Interface:**
- Read-only prescription fetch
- Prescription validation (expiry, patient linkage)

**Blocker Status:** ⚠️ STUB REQUIRED
**Mitigation:**
- Phase 2 assumes prescriptions exist (pre-created)
- Stub: `GET /prescriptions/{id}` returns mock prescription
- Prescription creation workflow deferred to Phase 3

**Recommendation:** Use fixture prescriptions for Phase 2 testing

---

### 3. Category Attribute Metadata (Catalog - Phase 1/2)
**Phase 2 Touch Point:** Category enforcement at item attachment  
**Required Interface:**
- Category attribute definitions
- Mandatory attribute list per category

**Blocker Status:** ✅ CAN BE STUBBED
**Mitigation:**
- Hardcode category attributes from CATEGORY_ATTRIBUTE_MODEL.md
- Or stub: `GET /catalog/categories/{id}/attributes` returns static JSON

**Recommendation:** Hardcode for Phase 2, externalize in future pass

---

## ⚠️ PHASE 4 DEPENDENCIES (Out of Scope - HARD BOUNDARY)

Phase 2 STOPS at PRICING_LOCKED. The following are Phase 4 and must NOT be implemented:

### Blocked Actions (Do NOT Implement):
- ❌ Billing generation
- ❌ Payment processing
- ❌ Invoice creation
- ❌ Payment collection
- ❌ Receipt printing

**Blocker Status:** ✅ CORRECTLY OUT OF SCOPE
**Mitigation:** Phase 2 endpoints must return clear message if billing/payment attempted
- Error: `PHASE_NOT_IMPLEMENTED`
- Message: "Billing and payments are Phase 4 - not yet implemented"

---

## 🔍 IDENTIFIED BLOCKERS (Action Required)

### BLOCKER 1: Discount Rules Table Population
**Issue:** discount_rules table must be populated with role × category caps  
**Source:** DISCOUNT_LOGIC_BY_CATEGORY.md (example matrix)  
**Required Data:**
- Sales Staff × Frame (Mass) → 10%
- Sales Staff × Frame (Luxury) → 0% (approval required for any)
- Sales Staff × Lens (Standard) → 15%
- (etc. - full matrix from doc)

**Action Required:** Seed discount_rules table before Phase 2 testing  
**Status:** ⚠️ DATA BLOCKER

**Proposed Solution:**
- Create seed script from DISCOUNT_LOGIC_BY_CATEGORY.md matrix
- Populate during Phase 2 setup
- Make configurable by Superadmin in future

---

### BLOCKER 2: Role Assignment Fixtures
**Issue:** Test users must have role assignments at test locations  
**Required:**
- User U1: Sales Staff at Location L1
- User U2: Store Manager at Location L1
- User U3: Admin at HQ

**Action Required:** Seed user_roles table  
**Status:** ⚠️ DATA BLOCKER

**Proposed Solution:**
- Create test fixtures with role assignments
- Documented in test setup

---

### BLOCKER 3: Product Catalog with Category Data
**Issue:** Products must exist with:
- category_id
- MRP, Offer Price
- Category classification (Mass/Premium/Luxury)

**Action Required:** Seed products table with test data  
**Status:** ⚠️ DATA BLOCKER

**Proposed Solution:**
- Create 10-15 test products covering all categories
- Include pricing variations (MRP=Offer, MRP>Offer, edge cases)
- Document in test fixtures

---

### BLOCKER 4: Prescription Fixtures
**Issue:** Prescription validation requires prescriptions to exist  
**Required:**
- Valid prescription (not expired)
- Expired prescription (for negative test)
- Prescriptions linked to test patients

**Action Required:** Seed prescriptions table  
**Status:** ⚠️ DATA BLOCKER

**Proposed Solution:**
- Create 3-5 fixture prescriptions
- Link to test patients
- Include valid and expired examples

---

## ✅ NON-BLOCKERS (Confirmed Clear)

### 1. State Machine Logic
**Status:** ✅ CLEAR  
**Reason:** Fully specified in 06_transaction_state_machine_and_immutability.md  
**Implementation:** Straightforward enum check + validation

### 2. Audit Event Infrastructure
**Status:** ✅ CLEAR  
**Reason:** Schema defined, append-only pattern clear  
**Implementation:** Insert into audit_logs on every action

### 3. MRP vs Offer Price Validation
**Status:** ✅ CLEAR  
**Reason:** Simple comparison logic, well-defined in SYSTEM_INTENT.md  
**Implementation:** Fetch product, compare offer <= mrp

### 4. Category Enforcement Logic
**Status:** ✅ CLEAR  
**Reason:** Attribute model fully specified in CATEGORY_ATTRIBUTE_MODEL.md  
**Implementation:** Fetch category attributes, validate presence

### 5. Discount Request/Approval Flow
**Status:** ✅ CLEAR  
**Reason:** Role × Category lookup well-defined  
**Implementation:** Query discount_rules, compare requested vs cap

---

## 🚨 CRITICAL DEPENDENCIES REQUIRING CLARIFICATION

### CLARIFICATION 1: GST Computation
**Question:** Should Phase 2 compute GST or stub it?  
**Context:** Pricing review includes GST breakdown  
**Options:**
- A) Stub: Return 0 for all GST fields (with TODO note)
- B) Implement: Use product.gst_rate and compute CGST/SGST/IGST based on location

**Current Assumption:** Option B (implement basic GST)  
**Reason:** Required for accurate pricing_snapshot  
**Request Confirmation:** Is this acceptable for Phase 2?

---

### CLARIFICATION 2: Customer/Patient Creation
**Question:** Are customer and patient creation in Phase 2 scope?  
**Context:** POS flow starts with customer selection  
**Options:**
- A) Phase 2 assumes customers/patients exist (use fixtures)
- B) Phase 2 includes POST /customers and POST /patients

**Current Assumption:** Option A (use fixtures)  
**Reason:** Focus on order core, not customer management  
**Request Confirmation:** Is this acceptable?

---

### CLARIFICATION 3: Product Search/Fetch
**Question:** Is product catalog search in Phase 2 scope?  
**Context:** POS needs to search products for item attachment  
**Options:**
- A) Stub: GET /products/{id} only (fetch by ID)
- B) Implement: GET /products?search={query}&category={cat}

**Current Assumption:** Option A (fetch by ID)  
**Reason:** Product search is catalog feature, not order core  
**Request Confirmation:** Is this acceptable?

---

## 📋 FINAL BLOCKER SUMMARY

### DATA BLOCKERS (Addressable via Fixtures):
1. ⚠️ Populate discount_rules table
2. ⚠️ Create test user role assignments
3. ⚠️ Create test products with categories
4. ⚠️ Create test prescriptions

**Resolution:** Create fixture seed script

### SCOPE CLARIFICATIONS NEEDED:
1. ❓ GST computation in Phase 2? (Recommend: YES, basic implementation)
2. ❓ Customer/Patient creation in Phase 2? (Recommend: NO, use fixtures)
3. ❓ Product search in Phase 2? (Recommend: NO, fetch by ID only)

### CONFIRMED NON-BLOCKERS:
- ✅ State machine logic
- ✅ Audit infrastructure
- ✅ MRP/Offer validation
- ✅ Category enforcement
- ✅ Discount request/approval flow

---

## ✅ OVERALL BLOCKER STATUS

**ASSESSMENT:** Phase 2 has NO HARD BLOCKERS preventing execution.

**Required Actions:**
1. Create test fixture seed script (data blockers)
2. Confirm 3 scope clarifications (GST, Customer, Product search)
3. Stub Phase 3 interfaces (Stock, Prescription creation)

**Once addressed, Phase 2 can proceed to coding with clean progression to Phase 3.**

---

END OF BLOCKER ANALYSIS
