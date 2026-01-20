# PHASE 3A — POS SCREEN MAPPING
BUILD PASS 6 — PHASE 3A (POS UI Realization)
IMS 2.0 Retail Operating System

---

## PURPOSE

Map POS screens from SCREENS.md to implementation with backend API binding.

---

## POS SCREEN INVENTORY (from /app/app/pos/SCREENS.md)

### 1. POS Home / Sale Entry
**Route:** `/pos`  
**SCREENS.md Reference:** Screen 1  
**Backend APIs Used:**
- GET /api/customers (stub needed for search)
- GET /api/patients (stub needed for search)
- GET /api/products/{id}
- POST /api/orders (create order)
- POST /api/orders/{id}/items (attach items)

**UI Components:**
- Customer selection panel (search + new customer button)
- Patient selection panel (list + link to existing)
- **Prescription selection panel** (MANDATORY for optical flow)
- Product selection tabs (by category)
- Cart with pricing summary
- Action buttons

**Category Visibility (ALL REQUIRED):**
- ✅ Optical Frame
- ✅ Optical Lens (prescription-gated)
- ✅ Sunglasses
- ✅ Contact Lens (prescription-gated)
- ✅ Accessories
- ✅ Watches
- ✅ Services

**Prescription Gating:**
- Prescription selection MUST appear after Patient selection
- Lens/Contact Lens selection BLOCKED without prescription
- Visual indicator: "Prescription Required" on lens categories

---

### 2. Payment Processing
**Route:** `/pos/payment`  
**SCREENS.md Reference:** Screen 2  
**Backend APIs Used:**
- Phase 4 (OUT OF SCOPE for Phase 3A)

**UI Components:**
- Order summary (read-only)
- Payment mode selection
- Payment breakdown table
- Outstanding & credit options

**Implementation Status:** STUB (Phase 4 dependency)

---

### 3. Order Confirmation & Receipt
**Route:** `/pos/order-confirm/:orderId`  
**SCREENS.md Reference:** Screen 3  
**Backend APIs Used:**
- GET /api/orders/{id}/state
- Phase 4 APIs (receipt generation)

**UI Components:**
- Success banner
- Order details display
- Receipt preview (stub)
- Print/email actions (stub)

**Implementation Status:** PARTIAL (order display only, receipt stubbed)

---

### 4. Order Search & Listing
**Route:** `/pos/orders`  
**SCREENS.md Reference:** Screen 4  
**Backend APIs Used:**
- GET /api/orders (needs implementation - Phase 3 scope)

**UI Components:**
- Search & filters
- Orders table
- Status filters

**Implementation Status:** STUB (requires order search API)

---

### 5. Order Details & Edit
**Route:** `/pos/orders/:orderId`  
**SCREENS.md Reference:** Screen 5  
**Backend APIs Used:**
- GET /api/orders/{id}/state
- GET /api/orders/{id}/items (needs implementation)

**UI Components:**
- Order information card
- Items table
- Prescription panel
- Payment history (Phase 4)
- Audit log display
- Action buttons (state-dependent)

**Implementation Status:** PARTIAL (view only, edit gated by state)

---

### 6. Discount Override Request
**Route:** `/pos/discount-override`  
**SCREENS.md Reference:** Screen 6  
**Backend APIs Used:**
- POST /api/orders/{id}/discounts/request ✅ (Phase 2)

**UI Components:**
- Current discount summary
- Override request form
- Reason input (mandatory)
- Approver selection

**Implementation Status:** READY (APIs exist)

---

### 7. Discount Approvals (Manager View)
**Route:** `/pos/approvals/discounts`  
**SCREENS.md Reference:** Screen 7  
**Backend APIs Used:**
- GET /api/discounts/pending (needs implementation)
- POST /api/discounts/{id}/approve ✅ (Phase 2)
- POST /api/discounts/{id}/reject ✅ (Phase 2)

**UI Components:**
- Pending requests table
- Approval history
- Approve/Reject actions

**Implementation Status:** PARTIAL (approval APIs exist, listing needed)

---

### 8. Gift Card Management
**Route:** `/pos/gift-cards`  
**SCREENS.md Reference:** Screen 8  
**Backend APIs Used:**
- Phase 4+ (OUT OF SCOPE)

**UI Components:**
- Issue new card form
- Validate card
- History table

**Implementation Status:** STUB (Phase 4 dependency)

---

### 9. Prescription Attachment (POS Context)
**Route:** `/pos/orders/:orderId/prescription`  
**SCREENS.md Reference:** Screen 9  
**Backend APIs Used:**
- GET /api/patients/{id}/prescriptions (needs implementation)
- POST /api/prescriptions (needs implementation - Clinical Phase 3)

**UI Components:**
- Prescription selection from existing
- Create new prescription (navigate to clinical)
- Prescription preview

**Implementation Status:** CRITICAL (required for optical flow)

---

### 10. Draft Orders
**Route:** `/pos/drafts`  
**SCREENS.md Reference:** Screen 10  
**Backend APIs Used:**
- Phase 4+ (OUT OF SCOPE)

**UI Components:**
- Draft orders table
- Resume/Delete actions

**Implementation Status:** STUB (Phase 4 dependency)

---

### 11. Barcode Printing (POS Context)
**Route:** `/pos/barcode-print`  
**SCREENS.md Reference:** Screen 11  
**Backend APIs Used:**
- Phase 4+ (OUT OF SCOPE)

**UI Components:**
- Product selection
- Barcode configuration
- Print preview

**Implementation Status:** STUB (Phase 4 dependency)

---

## PHASE 3A PRIORITY SCREENS (Implementation Order)

### TIER 1 (Critical Path - MUST IMPLEMENT):
1. ✅ Login & Role Selection
2. ✅ POS Home / Sale Entry (with ALL categories)
3. ✅ Prescription Selection Module (first-class step)
4. ✅ Discount Override Request
5. ✅ Pricing Review & Lock

### TIER 2 (Supporting):
6. ✅ Order State View
7. ✅ Discount Approvals (Manager)

### TIER 3 (Phase 4 Stubs):
8. ⏸️ Payment Processing (stub)
9. ⏸️ Order Confirmation (partial)
10. ⏸️ Gift Cards (stub)
11. ⏸️ Drafts (stub)
12. ⏸️ Barcode Printing (stub)

---

## CATEGORY COMPLETENESS REQUIREMENT

ALL categories from CATEGORY_ATTRIBUTE_MODEL.md MUST be visible in POS:

| Category | POS Visibility | Prescription Required | Implementation |
|----------|---------------|----------------------|----------------|
| Frame / Sunglass | ✅ YES | NO | Product selection tab |
| Optical Lens | ✅ YES | YES | Gated behind prescription |
| Contact Lens | ✅ YES | YES | Gated behind prescription |
| Accessories | ✅ YES | NO | Product selection tab |
| Services | ✅ YES | NO | Product selection tab |
| Watches | ✅ YES | NO | Product selection tab |

**No category may be hidden.**

---

## PRESCRIPTION MODULE INTEGRATION

**Critical Requirement:** Prescription must appear as explicit step in POS flow

### UI Sequence:
1. Customer selected → ✅
2. Patient selected → ✅
3. **PRESCRIPTION STEP** → 🔴 CRITICAL
   - Show existing prescriptions for selected patient
   - Button: "Select Prescription"
   - Button: "Create New Prescription" (navigate to clinical module or inline form)
   - Prescription preview panel
4. Product selection → Only after prescription (for lens/contact lens)
5. Pricing → ✅
6. Lock → ✅

**Gating Logic:**
- Lens category products → Disabled until prescription selected
- Visual indicator: "🔒 Prescription Required"
- Contact Lens → Same gating

---

## POS FLOW DIAGRAM (UI-Level)

```
┌─────────────┐
│   LOGIN     │ Role selection, Location selection
└──────┬──────┘
       │
       v
┌─────────────┐
│  POS HOME   │
└──────┬──────┘
       │
       v
┌──────────────────────────────────────────────┐
│ STEP 1: CUSTOMER SELECTION                   │
│ - Search by mobile/name                      │
│ - Create new customer                        │
└──────┬───────────────────────────────────────┘
       │
       v
┌──────────────────────────────────────────────┐
│ STEP 2: PATIENT SELECTION                    │
│ - Select from customer's patients            │
│ - Create new patient (link to customer)      │
└──────┬───────────────────────────────────────┘
       │
       v
┌──────────────────────────────────────────────┐
│ STEP 3: PRESCRIPTION SELECTION (CRITICAL)    │ 🔴 MANDATORY FOR OPTICAL
│ - View patient's prescriptions               │
│ - Select existing prescription               │
│ - Create new prescription (clinical module)  │
│ - Prescription preview (SPH/CYL/AXIS/PD)     │
└──────┬───────────────────────────────────────┘
       │
       v
┌──────────────────────────────────────────────┐
│ STEP 4: PRODUCT SELECTION (Category Tabs)    │
│                                              │
│ ALL CATEGORIES VISIBLE:                      │
│ [Frames] [Lenses]🔒 [Contacts]🔒             │
│ [Sunglasses] [Accessories] [Watches]         │
│                                              │
│ 🔒 = Prescription required (gated)           │
└──────┬───────────────────────────────────────┘
       │
       v
┌──────────────────────────────────────────────┐
│ STEP 5: PRICING REVIEW                       │
│ - Server-computed pricing display            │
│ - Discount request (if eligible)             │
│ - Approval status display                    │
└──────┬───────────────────────────────────────┘
       │
       v
┌──────────────────────────────────────────────┐
│ STEP 6: PRICING LOCK                         │
│ - Lock confirmation                          │
│ - Immutability warning                       │
│ - Proceed to billing (Phase 4 stub)          │
└──────────────────────────────────────────────┘
```

---

## CATEGORY-TO-SCREEN MAPPING

### Product Selection Screen Categories:

**Tab 1: Optical Frames**
- Category: FRAME (frame_type = Optical)
- Prescription: Not required
- Attributes displayed: Size, Material, Color, Shape

**Tab 2: Sunglasses**
- Category: FRAME (frame_type = Sunglass)
- Prescription: Not required
- Attributes displayed: Size, Material, Color, UV Protection

**Tab 3: Optical Lenses** 🔒
- Category: OPTICAL_LENS
- **Prescription: REQUIRED (HARD GATE)**
- Disabled until prescription selected
- Attributes displayed: Lens Type, Index, Coating, Power Range

**Tab 4: Contact Lenses** 🔒
- Category: CONTACT_LENS
- **Prescription: REQUIRED (HARD GATE)**
- Disabled until prescription selected
- Attributes displayed: Wear Type, Power, Pack Size

**Tab 5: Accessories**
- Category: ACCESSORIES
- Prescription: Not required
- Attributes displayed: Type, Material

**Tab 6: Watches**
- Category: WATCHES
- Prescription: Not required
- Attributes displayed: Type, Strap Material, Dial Size

**Tab 7: Services**
- Category: SERVICES
- Prescription: Not required
- Attributes displayed: Service Type, Duration

---

## LOGIN & ROLE MAPPING

### Login Screen:
**Route:** `/login`  
**Fields:**
- Username / Email
- Password
- Location selection (dropdown)

**On Success:**
- Fetch user roles
- If multiple roles → Show role selector
- Redirect to role-appropriate dashboard

### Role → Dashboard Mapping:
| Role | Default Route |
|------|--------------|
| Sales Staff | /dashboard/staff |
| Cashier | /dashboard/staff |
| Optometrist | /dashboard/staff |
| Store Manager | /dashboard/manager |
| Admin | /dashboard/admin |
| Superadmin | /dashboard/superadmin |

### Role → POS Access:
| Role | POS Access | Allowed Actions |
|------|-----------|----------------|
| Sales Staff | Full | Create orders, attach items, request discounts |
| Cashier | Full | Create orders, attach items, process payments |
| Optometrist | Full | + Create prescriptions inline |
| Store Manager | Full | + Approve discounts |
| Admin | Full | + All overrides |

---

## PRESCRIPTION-TO-LENS GATING (UI Logic)

### Gating Rules:
```javascript
// Pseudo-code for UI gating
const isPrescriptionRequired = (category) => {
  return ['OPTICAL_LENS', 'CONTACT_LENS'].includes(category);
};

const canSelectProduct = (category, prescriptionSelected) => {
  if (isPrescriptionRequired(category)) {
    return prescriptionSelected === true;
  }
  return true; // Other categories always selectable
};

// UI Display Logic
if (isPrescriptionRequired(category) && !prescriptionSelected) {
  // Show disabled state with message
  showMessage("🔒 Prescription Required - Select prescription first");
  disableProductSelection(category);
}
```

### Visual Indicators:
- 🔒 Lock icon on Lens/Contact Lens tabs when prescription not selected
- Tooltip: "Select prescription first"
- Tab is grayed out / disabled
- Click opens prescription selection modal

---

## REQUIRED STUB APIs (Phase 3A needs these - read-only)

### 1. GET /api/customers?search={query}
**Purpose:** Customer search  
**Response:** List of matching customers  
**Status:** STUB NEEDED

### 2. POST /api/customers
**Purpose:** Create new customer  
**Status:** STUB NEEDED

### 3. GET /api/customers/{id}/patients
**Purpose:** Fetch patients for customer  
**Status:** STUB NEEDED

### 4. POST /api/patients
**Purpose:** Create new patient  
**Status:** STUB NEEDED

### 5. GET /api/patients/{id}/prescriptions
**Purpose:** Fetch prescriptions for patient  
**Status:** STUB NEEDED (critical for optical flow)

### 6. GET /api/products?category={cat}
**Purpose:** Product search by category  
**Status:** STUB NEEDED

### 7. GET /api/discounts/pending
**Purpose:** Fetch pending discount approvals  
**Status:** STUB NEEDED (for manager approval screen)

---

## IMPLEMENTATION PRIORITY

### Phase 3A - Week 1:
1. ✅ Login & role-based routing
2. ✅ POS Home with category tabs (ALL categories)
3. ✅ Prescription selection step (integrate with POS flow)
4. ✅ Product selection (category-gated)
5. ✅ Pricing review display
6. ✅ Pricing lock confirmation

### Phase 3A - Week 2:
7. ✅ Discount request workflow
8. ✅ Discount approval screen (manager)
9. ✅ Order state display
10. ⏸️ Stub remaining screens (payment, drafts, etc.)

---

## FRONTEND WIRING RULES (Build Pass 4)

### From pass_4/01_pos_frontend_wiring_rules.md:

**Frontend MUST:**
- Mirror backend state
- Request (never calculate) prices
- Display rejection reasons verbatim
- Block navigation if state mismatch

**Frontend MUST NOT:**
- Calculate price, discount, or tax
- Mutate state directly
- Allow state skipping
- Hide enforcement failures

**Error Handling:**
- All backend errors surfaced with reason codes
- No silent retries
- Block forward navigation on error
- Offer return to last valid step

---

## CATEGORY COMPLETENESS CHECKLIST

Phase 3A CANNOT be marked complete unless:
- [ ] All 6+ categories visible in POS
- [ ] Optical Lens tab exists and is gated by prescription
- [ ] Contact Lens tab exists and is gated by prescription
- [ ] Prescription step appears before product selection
- [ ] Prescription selection UI functional
- [ ] Each category shows correct attributes
- [ ] No category is hidden or merged

---

END OF PHASE 3A SCREEN MAPPING
