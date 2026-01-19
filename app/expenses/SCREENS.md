# Expenses & Advances Module — Screen Skeletons

**Module**: Expenses & Advances  
**Purpose**: Expense tracking, approval workflows, and advance management  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: Expenses Dashboard

**Screen Name**: Expenses Dashboard  
**Route**: `/expenses/dashboard`  
**Role Access**: Store Manager, Admin, Superadmin, Accountant  
**Purpose**: Overview of expenses and pending approvals

### UI Sections:
1. **Header Section**
   - Page title: Expenses Dashboard
   - Date range selector

2. **Expense Summary Cards**
   - Total Expenses (current month)
   - Approved Expenses
   - Pending Approvals
   - Rejected Expenses
   - TODO: Expense aggregation logic

3. **Category-wise Breakdown Card**
   - Expense by category chart
   - TODO: Category aggregation

4. **Pending Actions Card**
   - Pending expense approvals count
   - Pending advance settlements count
   - TODO: Action queue management

5. **Recent Expenses Table**
   - Columns: Date | Category | Description | Amount | Status
   - TODO: Recent expenses fetch

6. **Quick Actions Panel**
   - Button: Add Expense
   - Button: Approve Expenses
   - Button: View Reports
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Expense aggregation by period
- [ ] Category-wise breakdown
- [ ] Pending approvals tracking
- [ ] Real-time updates

---

## Screen 2: Add Expense

**Screen Name**: Add Expense  
**Route**: `/expenses/new`  
**Role Access**: Store Manager, All Staff (limited categories)  
**Purpose**: Record new expense

### UI Sections:
1. **Header Section**
   - Page title: Add Expense

2. **Expense Information Form**
   - Dropdown: Expense Category (mandatory) - Rent, Utilities, Salaries, Marketing, Maintenance, Travel, Stationery, Other
   - Input: Amount (mandatory)
   - Date picker: Expense Date
   - Text area: Description (mandatory)
   - Dropdown: Store (if multi-store)
   - TODO: Form validation

3. **Vendor Information Form** (If applicable)
   - Input: Vendor Name
   - Input: Vendor GST Number
   - Input: Invoice Number
   - TODO: Vendor details capture

4. **GST Details Form**
   - Checkbox: GST applicable
   - If yes:
     - Input: GST Rate (%)
     - Calculated: GST Amount (read-only)
     - Calculated: Total Amount with GST (read-only)
   - TODO: GST calculation logic

5. **Payment Information Form**
   - Dropdown: Payment Mode (Cash/Card/UPI/Bank Transfer)
   - Input: Payment Reference (if applicable)
   - Date picker: Payment Date
   - TODO: Payment details capture

6. **Attachments Panel**
   - Upload: Invoice/Bill (mandatory for amounts above threshold)
   - Upload: Other supporting documents
   - TODO: File upload logic

7. **Actions Panel**
   - Button: Submit Expense
   - Button: Save as Draft
   - Button: Cancel
   - TODO: Expense submission logic

### TODO Logic:
- [ ] Form validation
- [ ] Category-based approval routing
- [ ] GST calculation
- [ ] Mandatory attachment check for high-value expenses
- [ ] Draft save functionality
- [ ] Notification to approver
- [ ] Audit trail

---

## Screen 3: Expense Listing

**Screen Name**: All Expenses  
**Route**: `/expenses/all`  
**Role Access**: Store Manager, Admin, Superadmin, Accountant  
**Purpose**: View and manage all expenses

### UI Sections:
1. **Header Section**
   - Page title: Expenses
   - Button: Add Expense

2. **Search & Filters Panel**
   - Search bar: Description / Invoice Number / Vendor
   - Filters: Date Range | Category | Status (Pending/Approved/Rejected) | Store
   - TODO: Search and filter logic

3. **Expenses Table**
   - Columns: Date | Category | Description | Vendor | Amount | GST | Total | Status | Actions
   - Action buttons: View Details | Approve | Reject | Edit (if draft)
   - TODO: Expense listing logic
   - TODO: Pagination

4. **Status Tabs**
   - Tabs: All | Pending | Approved | Rejected
   - TODO: Tab-based filtering

5. **Total Summary Card**
   - Total expenses (filtered)
   - TODO: Summary calculation

### TODO Logic:
- [ ] Expense search and filter
- [ ] Role-based expense visibility
- [ ] Status-based filtering
- [ ] Pagination
- [ ] Export functionality

---

## Screen 4: Expense Details

**Screen Name**: Expense Details  
**Route**: `/expenses/:expenseId`  
**Role Access**: Store Manager, Admin, Superadmin, Accountant  
**Purpose**: View complete expense details

### UI Sections:
1. **Header Section**
   - Expense ID
   - Status badge

2. **Expense Information Card**
   - Category
   - Amount
   - Expense date
   - Description
   - Store
   - Created by
   - TODO: Expense details fetch

3. **Vendor Information Card** (If applicable)
   - Vendor name
   - GST number
   - Invoice number
   - TODO: Vendor details display

4. **GST Details Card**
   - Base amount
   - GST rate
   - GST amount
   - Total amount with GST
   - TODO: GST breakdown display

5. **Payment Information Card**
   - Payment mode
   - Payment reference
   - Payment date
   - TODO: Payment details display

6. **Attachments Panel**
   - Uploaded documents list
   - View/Download buttons
   - TODO: File access logic

7. **Approval History**
   - Approval status
   - Approved/Rejected by
   - Approval date
   - Remarks
   - TODO: Approval tracking display

8. **Actions Panel**
   - Button: Approve (if pending and authorized)
   - Button: Reject (if pending and authorized)
   - Button: Edit (if draft and own expense)
   - Button: Download Receipt
   - TODO: Action logic with role validation

### TODO Logic:
- [ ] Expense details fetch
- [ ] Attachment access
- [ ] Role-based action buttons
- [ ] Approval workflow
- [ ] Audit trail display

---

## Screen 5: Expense Approvals

**Screen Name**: Expense Approvals  
**Route**: `/expenses/approvals`  
**Role Access**: Store Manager, Admin, Superadmin, Accountant  
**Purpose**: Approve or reject expense submissions

### UI Sections:
1. **Header Section**
   - Page title: Expense Approvals
   - Pending count badge

2. **Pending Approvals Table**
   - Columns: Date | Category | Description | Submitted By | Store | Amount | GST | Total | Actions
   - Action buttons: Approve | Reject | View Details
   - TODO: Pending approvals listing

3. **Approval Decision Form** (Modal/Panel)
   - Expense details (read-only)
   - Attachments view
   - Input: Remarks (mandatory if rejecting)
   - Button: Approve
   - Button: Reject
   - TODO: Approval decision logic

4. **Bulk Actions Panel**
   - Select multiple expenses
   - Bulk approve (with confirmation)
   - TODO: Bulk approval logic

5. **Approval History Table**
   - Columns: Date | Expense | Submitted By | Decision | Approver | Remarks
   - TODO: Approval history fetch

### TODO Logic:
- [ ] Pending approvals queue management
- [ ] Approval decision capture with remarks
- [ ] Real-time notification to submitter
- [ ] Bulk approval operations
- [ ] Integration with Finance module
- [ ] Audit trail for all approval actions

---

## Screen 6: Expense Categories Management

**Screen Name**: Expense Categories  
**Route**: `/expenses/categories`  
**Role Access**: Admin, Superadmin  
**Purpose**: Manage expense categories and approval rules

### UI Sections:
1. **Header Section**
   - Page title: Expense Categories
   - Button: Add Category

2. **Categories Table**
   - Columns: Category Name | Approval Required | Approval Threshold | Approver Role | Status | Actions
   - Action buttons: Edit | Activate/Deactivate
   - TODO: Category listing

3. **Category Configuration Form**
   - Input: Category Name
   - Checkbox: Requires Approval
   - Input: Approval Threshold (amount above which approval needed)
   - Dropdown: Approver Role
   - Checkbox: GST Applicable (default)
   - Checkbox: Attachment Mandatory
   - TODO: Configuration logic

4. **Actions Panel**
   - Button: Save Category
   - Button: Cancel
   - TODO: Category creation/update logic

### TODO Logic:
- [ ] Category management
- [ ] Approval rules configuration
- [ ] Threshold-based approval routing
- [ ] Category activation/deactivation
- [ ] Audit trail for category changes

---

## Screen 7: Expense Reports

**Screen Name**: Expense Reports  
**Route**: `/expenses/reports`  
**Role Access**: Store Manager, Admin, Superadmin, Accountant  
**Purpose**: Generate expense analysis reports

### UI Sections:
1. **Header Section**
   - Page title: Expense Reports
   - Date range selector

2. **Report Type Selection Panel**
   - Radio: Category-wise Expenses
   - Radio: Store-wise Expenses
   - Radio: Vendor-wise Expenses
   - Radio: Monthly Expense Trend
   - TODO: Report type selection

3. **Filters Panel**
   - Date range
   - Store
   - Category
   - TODO: Filter logic

4. **Report Preview/Display**
   - Dynamic report rendering
   - Charts and tables
   - TODO: Report generation logic

5. **Actions Panel**
   - Button: Generate Report
   - Button: Export to Excel
   - Button: Export to PDF
   - TODO: Export logic

### TODO Logic:
- [ ] Report generation based on type
- [ ] Data aggregation by category, store, vendor
- [ ] Trend analysis
- [ ] Export functionality
- [ ] Role-based report access

---

## Screen 8: Advance Requests (Staff View)

**Screen Name**: Request Advance  
**Route**: `/expenses/advance/request`  
**Role Access**: All Staff  
**Purpose**: Staff request expense advance

### UI Sections:
1. **Header Section**
   - Page title: Request Advance
   - Staff name

2. **Existing Advances Card** (If any)
   - Active advance details
   - TODO: Active advances display

3. **Advance Request Form**
   - Input: Amount (mandatory)
   - Dropdown: Purpose (Travel/Emergency/Other)
   - Text area: Justification (mandatory)
   - TODO: Form validation

4. **Actions Panel**
   - Button: Submit Request
   - Button: Cancel
   - TODO: Request submission logic

### TODO Logic:
- [ ] Amount validation
- [ ] Request submission
- [ ] Notification to approver
- [ ] Audit trail

---

## Screen 9: Advance Approvals

**Screen Name**: Advance Approvals  
**Route**: `/expenses/advance/approvals`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Approve expense advance requests

### UI Sections:
1. **Header Section**
   - Page title: Advance Approvals
   - Pending count badge

2. **Pending Requests Table**
   - Columns: Request Date | Staff Name | Purpose | Amount | Justification | Actions
   - Action buttons: Approve | Reject | View Details
   - TODO: Pending requests listing

3. **Approval Decision Form**
   - Request details
   - Input: Approved amount (editable)
   - Text area: Remarks
   - TODO: Approval logic

4. **Approval History Table**
   - Past approvals/rejections
   - TODO: History fetch

### TODO Logic:
- [ ] Approval queue management
- [ ] Approval decision with amount adjustment
- [ ] Real-time notification
- [ ] Audit trail

---

## Screen 10: Advance Settlement

**Screen Name**: Settle Advance  
**Route**: `/expenses/advance/settle/:advanceId`  
**Role Access**: Staff (own advance), Store Manager  
**Purpose**: Settle advance with actual expenses

### UI Sections:
1. **Header Section**
   - Advance ID
   - Staff name

2. **Advance Details Card**
   - Approved amount
   - Purpose
   - Approval date
   - TODO: Advance details fetch

3. **Actual Expenses Form**
   - Dynamic expense line items
   - For each item:
     - Input: Description
     - Input: Amount
     - Upload: Bill/Receipt
   - Button: Add More Items
   - Total actual expenses (calculated)
   - TODO: Expense capture logic

4. **Settlement Summary Card**
   - Advance taken
   - Total actual expenses
   - Difference (to be returned / additional claim)
   - TODO: Settlement calculation

5. **Actions Panel**
   - Button: Submit Settlement
   - Button: Save Draft
   - TODO: Settlement submission logic

### TODO Logic:
- [ ] Actual expense capture with receipts
- [ ] Settlement calculation (advance vs actual)
- [ ] Approval workflow for settlement
- [ ] Integration with Payroll for deductions/additions
- [ ] Audit trail

---

## Navigation Structure

### Expenses Module Navigation (TODO):
- [ ] All Staff → Add expense (limited categories), request advance
- [ ] Store Manager → All expense screens + approvals
- [ ] Admin/Superadmin → All screens + category management
- [ ] Accountant → View expenses, approvals, reports

---

## Global Expense Rules (TODO):
- [ ] High-value expenses require attachment (configurable threshold)
- [ ] Category-based approval routing
- [ ] All approvals require remarks
- [ ] GST validation for vendor expenses
- [ ] Advance settlement mandatory before new advance
- [ ] All expense actions require audit trail
- [ ] Integration with Finance module for accounting

---

**END OF EXPENSES & ADVANCES SCREENS**