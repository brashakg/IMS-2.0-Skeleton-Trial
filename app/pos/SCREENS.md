# POS Module — Screen Skeletons

**Module**: POS (Point of Sale / Sales)  
**Purpose**: Complete in-store and assisted sales journey with pricing enforcement  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: POS Home / Sale Entry

**Screen Name**: POS Home  
**Route**: `/pos`  
**Role Access**: Sales Staff, Cashier, Store Manager  
**Purpose**: Primary sales interface for product selection and order creation

### UI Sections:
1. **Header Section**
   - Store name
   - Staff name
   - Date & time
   - Cart icon with item count

2. **Customer Selection Panel**
   - Search bar: Mobile number / Customer ID / Name
   - Button: New Customer
   - Button: Link to Existing Patient
   - Selected customer display card
   - TODO: Customer search logic
   - TODO: Customer-patient linking

3. **Product Selection Panel**
   - Barcode scanner input (prominent)
   - Product search bar
   - Category tabs: Frames | Lenses | Accessories | Services | Add-ons
   - Product grid/list view
   - TODO: Product search and filtering
   - TODO: Barcode scanning logic
   - TODO: Stock availability check

4. **Selected Items Cart (Right Panel)**
   - Cart items table
   - Columns: Product | Barcode | MRP | Offer Price | Discount | Final Price | Remove
   - Prescription attachment indicator (for lens/frame)
   - TODO: Pricing logic enforcement (MRP vs Offer Price)
   - TODO: Role-based discount application
   - TODO: Prescription validation

5. **Pricing Summary Card**
   - Subtotal (before discount)
   - Discount amount
   - GST breakdown (CGST/SGST/IGST)
   - Grand Total
   - TODO: GST calculation logic
   - TODO: Discount cap enforcement by role

6. **Payment & Actions Panel**
   - Button: Apply Gift Card
   - Button: Request Discount Override (if capped)
   - Button: Add Advance Payment
   - Button: Save as Draft
   - Button: Proceed to Payment
   - TODO: Gift card validation
   - TODO: Override request workflow
   - TODO: Draft save logic

### TODO Logic:
- [ ] MRP < Offer Price → HARD BLOCK
- [ ] MRP == Offer Price → Allow role-based discounts
- [ ] MRP > Offer Price → No further discount
- [ ] Discount cap by role enforcement
- [ ] Gift card independent of discount rules
- [ ] Barcode scanning and product resolution
- [ ] Stock availability real-time check
- [ ] Prescription mandatory validation for lens/frame

---

## Screen 2: Payment Processing

**Screen Name**: Payment Processing  
**Route**: `/pos/payment`  
**Role Access**: Cashier, Sales Staff (if enabled), Store Manager  
**Purpose**: Multi-mode payment collection and settlement

### UI Sections:
1. **Header Section**
   - Order summary reference
   - Total amount due
   - Customer name

2. **Order Summary Card (Read-only)**
   - Items list
   - Final amount
   - Discount applied
   - GST breakdown

3. **Payment Methods Panel**
   - Radio/Toggle: Cash | Card | UPI | Net Banking | Gift Card
   - Input: Amount (if partial payment)
   - Input: Gift card number (if applicable)
   - TODO: Multi-mode payment support
   - TODO: Gift card validation

4. **Payment Breakdown Table**
   - Columns: Mode | Amount | Reference | Status
   - Add more payment button (for split payments)
   - TODO: Partial payment calculation
   - TODO: Balance due tracking

5. **Outstanding & Credit Panel** (Conditional)
   - Radio: Full Payment | Partial Payment | Credit Sale
   - Credit approval indicator
   - TODO: Credit customer validation
   - TODO: Outstanding tracking

6. **Actions Panel**
   - Button: Confirm Payment
   - Button: Cancel & Return to Cart
   - TODO: Payment finalization logic
   - TODO: Receipt generation trigger

### TODO Logic:
- [ ] Multi-mode payment support
- [ ] Partial payment handling
- [ ] Credit sale approval (role-based)
- [ ] Gift card validation and balance deduction
- [ ] Outstanding tracking integration
- [ ] Receipt generation
- [ ] Audit logging for all payment actions

---

## Screen 3: Order Confirmation & Receipt

**Screen Name**: Order Confirmation  
**Route**: `/pos/order-confirm/:orderId`  
**Role Access**: Sales Staff, Cashier, Store Manager  
**Purpose**: Order confirmation and receipt printing

### UI Sections:
1. **Success Message Banner**
   - Order created successfully
   - Order ID (prominent)
   - Customer name

2. **Order Details Card**
   - Order ID
   - Date & time
   - Customer details
   - Staff name
   - Items list
   - Total amount
   - Payment mode(s)
   - Balance due (if any)

3. **Receipt Preview Panel**
   - Printable receipt layout preview
   - TODO: Receipt template rendering

4. **Next Steps Panel**
   - Expected delivery date (if applicable)
   - Pending actions (e.g., prescription attachment)
   - Follow-up reminder

5. **Actions Panel**
   - Button: Print Receipt
   - Button: Send Receipt via SMS/Email
   - Button: New Sale
   - Button: View Order Details
   - TODO: Print integration
   - TODO: SMS/Email integration

### TODO Logic:
- [ ] Order ID generation
- [ ] Receipt template rendering
- [ ] Print integration
- [ ] SMS/Email dispatch
- [ ] Order audit trail creation

---

## Screen 4: Order Search & Listing

**Screen Name**: Order Search  
**Route**: `/pos/orders`  
**Role Access**: Sales Staff, Store Manager  
**Purpose**: Search, view, and manage existing orders

### UI Sections:
1. **Header Section**
   - Page title: Orders
   - Date range selector

2. **Search & Filters Panel**
   - Search bar: Order ID / Customer Mobile / Invoice Number
   - Filters: Status (All, Pending, Completed, Cancelled) | Payment Status | Date Range
   - TODO: Search logic
   - TODO: Filter logic

3. **Orders Table**
   - Columns: Order ID | Date | Customer | Items | Amount | Payment Status | Order Status | Actions
   - Action buttons: View | Edit | Add Payment | Cancel
   - TODO: Order listing logic
   - TODO: Pagination

4. **Bulk Actions Panel** (If applicable)
   - Select multiple orders
   - Bulk actions dropdown
   - TODO: Bulk operation logic

### TODO Logic:
- [ ] Order search (multiple fields)
- [ ] Filter and sort logic
- [ ] Pagination and lazy loading
- [ ] Role-based action visibility
- [ ] Audit trail for order views

---

## Screen 5: Order Details & Edit

**Screen Name**: Order Details  
**Route**: `/pos/orders/:orderId`  
**Role Access**: Sales Staff, Store Manager  
**Purpose**: View and edit order details (with restrictions)

### UI Sections:
1. **Header Section**
   - Order ID
   - Order status badge
   - Customer name
   - Creation date

2. **Order Information Card**
   - Customer details
   - Staff who created order
   - Store name
   - Order timestamps (created, updated)

3. **Items Table**
   - Columns: Product | Barcode | MRP | Offer Price | Discount | Final Price | Actions
   - Action: Remove item (with approval if invoice generated)
   - TODO: Edit restrictions based on order status
   - TODO: Audit trail for edits

4. **Prescription Panel** (If applicable)
   - Prescription attached indicator
   - View prescription button
   - Attach/Replace prescription button
   - TODO: Prescription attachment logic

5. **Payment History Table**
   - Columns: Date | Mode | Amount | Reference | Staff
   - Button: Add Payment
   - TODO: Payment history fetch logic

6. **Order Timeline / Audit Log**
   - Chronological list of all actions
   - Who did what and when
   - TODO: Audit log integration

7. **Actions Panel**
   - Button: Edit Order (if allowed)
   - Button: Add Payment
   - Button: Mark as Delivered
   - Button: Cancel Order (with approval)
   - TODO: Role-based action controls
   - TODO: Escalation workflows for restricted actions

### TODO Logic:
- [ ] Order fetch by ID
- [ ] Edit restrictions based on order status and role
- [ ] Audit trail for all edits
- [ ] Approval workflows for critical changes
- [ ] Payment history integration
- [ ] Order status lifecycle management

---

## Screen 6: Discount Override Request

**Screen Name**: Discount Override Request  
**Route**: `/pos/discount-override`  
**Role Access**: Sales Staff  
**Purpose**: Request discount beyond role-allowed cap

### UI Sections:
1. **Header Section**
   - Screen title: Request Discount Override
   - Current order reference

2. **Current Discount Summary Card**
   - Applied discount
   - Role-allowed maximum
   - Requested discount
   - Difference to be approved

3. **Override Request Form**
   - Input: Requested discount percentage
   - Input: Reason (mandatory text area)
   - Approver selector (Store Manager / HQ)
   - TODO: Validation logic for reason and amount

4. **Actions Panel**
   - Button: Submit Request
   - Button: Cancel
   - TODO: Request submission logic
   - TODO: Notification to approver

### TODO Logic:
- [ ] Discount cap validation
- [ ] Reason mandatory enforcement
- [ ] Approver routing logic
- [ ] Real-time notification to approver
- [ ] Audit trail for override requests

---

## Screen 7: Discount Approvals (Manager View)

**Screen Name**: Discount Approvals  
**Route**: `/pos/approvals/discounts`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Review and approve/reject discount override requests

### UI Sections:
1. **Header Section**
   - Page title: Discount Approvals
   - Pending count badge

2. **Pending Requests Table**
   - Columns: Request ID | Date | Staff | Customer | Order ID | Requested Discount | Current Discount | Reason | Actions
   - Action buttons: Approve | Reject | View Details
   - TODO: Approval queue logic
   - TODO: Filtering by store/staff

3. **Request Details Modal/Panel**
   - Full order context
   - Customer details
   - Items and pricing
   - Discount justification
   - Approval decision form
   - TODO: Approval decision logic

4. **Approval History Table**
   - Columns: Date | Request | Staff | Decision | Approver
   - TODO: History fetch logic

### TODO Logic:
- [ ] Approval queue management
- [ ] Decision capture (approve/reject + reason)
- [ ] Real-time notification to requester
- [ ] Audit trail for all approval decisions
- [ ] Role-based approval authority limits

---

## Screen 8: Gift Card Management

**Screen Name**: Gift Card Management  
**Route**: `/pos/gift-cards`  
**Role Access**: Cashier, Store Manager  
**Purpose**: Issue, validate, and manage gift cards

### UI Sections:
1. **Header Section**
   - Page title: Gift Cards
   - Tabs: Issue New | Validate | History

2. **Issue New Gift Card Panel**
   - Input: Gift card number (auto-generated or manual)
   - Input: Amount
   - Input: Customer (optional)
   - Input: Validity period
   - Button: Issue Gift Card
   - TODO: Gift card issuance logic
   - TODO: Payment collection for gift card

3. **Validate Gift Card Panel**
   - Input: Gift card number
   - Button: Validate
   - Display: Balance, validity, status
   - TODO: Gift card validation logic

4. **Gift Card History Table**
   - Columns: Card Number | Issued Date | Amount | Balance | Status | Customer
   - TODO: History fetch logic

### TODO Logic:
- [ ] Gift card number generation
- [ ] Balance tracking
- [ ] Validity period enforcement
- [ ] Usage history tracking
- [ ] Audit logging for all gift card operations

---

## Screen 9: Prescription Attachment (POS Context)

**Screen Name**: Attach Prescription to Order  
**Route**: `/pos/orders/:orderId/prescription`  
**Role Access**: Sales Staff, Optometrist  
**Purpose**: Link prescription to order during or after sale

### UI Sections:
1. **Header Section**
   - Order ID reference
   - Customer name

2. **Prescription Selection Panel**
   - Option 1: Select from existing prescriptions
   - Option 2: Create new prescription (navigate to Clinical module)
   - Prescription list (if available)
   - TODO: Prescription search logic
   - TODO: Prescription validity check

3. **Prescription Preview Card**
   - Prescription details (read-only)
   - Validity date
   - Optometrist name

4. **Actions Panel**
   - Button: Attach Prescription
   - Button: Cancel
   - TODO: Prescription attachment logic
   - TODO: Validation against order items

### TODO Logic:
- [ ] Prescription search and selection
- [ ] Prescription validity enforcement
- [ ] Prescription-order linkage
- [ ] Clinical module integration
- [ ] Audit trail for prescription attachment

---

## Screen 10: Draft Orders

**Screen Name**: Draft Orders  
**Route**: `/pos/drafts`  
**Role Access**: Sales Staff, Store Manager  
**Purpose**: Manage incomplete or saved draft orders

### UI Sections:
1. **Header Section**
   - Page title: Draft Orders
   - Draft count

2. **Draft Orders Table**
   - Columns: Draft ID | Date Saved | Customer | Items Count | Amount | Staff | Actions
   - Action buttons: Resume | Delete
   - TODO: Draft listing logic

3. **Actions Panel**
   - Button: Resume Draft (navigate to POS)
   - Button: Delete Draft (with confirmation)
   - TODO: Draft management logic

### TODO Logic:
- [ ] Draft save and retrieve logic
- [ ] Auto-cleanup of old drafts (define threshold)
- [ ] Draft resume functionality
- [ ] Audit trail for draft operations

---

## Screen 11: Barcode Printing (POS Context)

**Screen Name**: Barcode Printing  
**Route**: `/pos/barcode-print`  
**Role Access**: Sales Staff, Store Manager  
**Purpose**: Print barcodes for products at store level

### UI Sections:
1. **Header Section**
   - Page title: Print Barcodes

2. **Product Selection Panel**
   - Search bar: Product name / SKU
   - Selected product display
   - TODO: Product search logic

3. **Barcode Configuration Panel**
   - Location code input
   - Quantity input (number of copies)
   - Barcode format selector
   - Preview panel
   - TODO: Barcode generation logic with location code

4. **Actions Panel**
   - Button: Print Barcodes
   - Button: Cancel
   - TODO: Printer integration

### TODO Logic:
- [ ] Barcode generation with embedded location code
- [ ] Print integration
- [ ] Barcode format validation
- [ ] Audit trail for barcode printing

---

## Navigation Structure

### POS Module Navigation (TODO):
- [ ] Main POS → always accessible from dashboard
- [ ] Cart state persistence during navigation
- [ ] Order search → accessible from POS home
- [ ] Draft orders → accessible from POS home
- [ ] Approvals → accessible for managers only

### Role-Based Access (TODO):
- [ ] Sales Staff → POS home, order search, draft orders
- [ ] Cashier → Payment processing, gift cards
- [ ] Store Manager → All POS screens + approvals
- [ ] HQ roles → Read-only access to orders

---

## Global POS Rules (TODO):
- [ ] MRP < Offer Price → HARD BLOCK, no sale allowed
- [ ] Discount enforcement by role
- [ ] Gift cards independent of discount rules
- [ ] Prescription mandatory for lenses/frames (configurable)
- [ ] All overrides require approval and audit trail
- [ ] No silent price changes
- [ ] No deletion of invoices, only cancellation with audit
- [ ] Barcode must include location code

---

**END OF POS SCREENS**
