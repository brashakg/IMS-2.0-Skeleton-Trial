# Finance & Accounting Module — Screen Skeletons

**Module**: Finance & Accounting  
**Purpose**: Financial management, GST compliance, accounting, and audit  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: Finance Dashboard

**Screen Name**: Finance Dashboard  
**Route**: `/finance/dashboard`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Financial overview and compliance status

### UI Sections:
1. **Header Section**
   - Page title: Finance Dashboard
   - Financial period selector

2. **Financial Summary Cards**
   - Total Revenue (current period)
   - Total Expenses
   - Outstanding Receivables
   - Net Position (Revenue - Expenses - Outstanding)
   - TODO: Financial aggregation logic

3. **GST Summary Card**
   - GST Collected
   - GST Paid
   - GST Payable/Receivable
   - Next filing due date
   - TODO: GST calculations

4. **Compliance Status Card**
   - Locked periods count
   - Pending reconciliations
   - Audit status
   - TODO: Compliance tracking

5. **Pending Actions Card**
   - Pending expense approvals
   - Pending reconciliations
   - Overdue payments
   - TODO: Action queue management

6. **Quick Actions Panel**
   - Button: Generate GST Report
   - Button: Reconcile Accounts
   - Button: Lock Period
   - Button: View Audit Log
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Financial aggregation across stores
- [ ] GST calculations and compliance tracking
- [ ] Period-wise financial data
- [ ] Real-time pending actions tracking

---

## Screen 2: Revenue & Sales Accounting

**Screen Name**: Revenue Accounting  
**Route**: `/finance/revenue`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Track and reconcile revenue from sales

### UI Sections:
1. **Header Section**
   - Page title: Revenue Accounting
   - Date range selector

2. **Revenue Summary Cards**
   - Total Sales (gross)
   - Discounts given
   - Net Sales
   - GST collected
   - TODO: Revenue calculations from POS

3. **Search & Filters Panel**
   - Date range
   - Store filter
   - Payment mode filter
   - TODO: Filter logic

4. **Sales Transactions Table**
   - Columns: Date | Invoice ID | Customer | Store | Gross Amount | Discount | GST | Net Amount | Payment Mode | Status
   - TODO: Transaction listing from POS integration
   - TODO: Pagination

5. **Payment Mode Breakdown Card**
   - Cash total
   - Card total
   - UPI total
   - Gift Card total
   - Credit sales total
   - TODO: Payment mode aggregation

6. **Actions Panel**
   - Button: Export Transactions
   - Button: Reconcile
   - Button: Generate Report
   - TODO: Export and reconciliation logic

### TODO Logic:
- [ ] Revenue data integration from POS
- [ ] Payment mode-wise breakdown
- [ ] GST calculation per transaction
- [ ] Reconciliation with bank statements (future)
- [ ] Export functionality
- [ ] Audit trail

---

## Screen 3: Expense Accounting

**Screen Name**: Expense Accounting  
**Route**: `/finance/expenses`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Track and categorize all business expenses

### UI Sections:
1. **Header Section**
   - Page title: Expense Accounting
   - Date range selector

2. **Expense Summary Cards**
   - Total Expenses
   - Approved Expenses
   - Pending Approvals
   - Categorized vs Uncategorized
   - TODO: Expense aggregation from Expense module

3. **Search & Filters Panel**
   - Date range
   - Store filter
   - Category filter
   - Status filter (Approved/Pending/Rejected)
   - TODO: Filter logic

4. **Expense Transactions Table**
   - Columns: Date | Expense ID | Category | Store | Description | Amount | GST | Status | Actions
   - Action: View Details | Categorize
   - TODO: Expense listing from Expense module integration
   - TODO: Pagination

5. **Category-wise Breakdown Card**
   - Expense by category chart/table
   - TODO: Category aggregation

6. **Actions Panel**
   - Button: Export Expenses
   - Button: Generate Report
   - TODO: Export logic

### TODO Logic:
- [ ] Expense data integration from Expense module
- [ ] Category-wise aggregation
- [ ] Approval status tracking
- [ ] GST on expenses tracking
- [ ] Export functionality
- [ ] Audit trail

---

## Screen 4: GST Management & Filing

**Screen Name**: GST Management  
**Route**: `/finance/gst`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Manage GST compliance, calculations, and filing

### UI Sections:
1. **Header Section**
   - Page title: GST Management
   - Financial year selector

2. **GST Summary Cards**
   - GST Collected (Output GST from sales)
   - GST Paid (Input GST on purchases)
   - Net GST Payable/Receivable
   - Last filing date
   - Next filing due date
   - TODO: GST calculations

3. **Period-wise GST Table**
   - Columns: Month | Output GST | Input GST | Net GST | Filing Status | Filing Date | Actions
   - Action buttons: View Details | File Return | Download Report
   - TODO: Period-wise GST aggregation

4. **GST Transactions Panel** (Detailed view)
   - Input GST transactions (purchases/expenses)
   - Output GST transactions (sales)
   - TODO: Transaction-level GST breakdown

5. **GST Filing Form** (When filing)
   - Period selection
   - Calculated GST summary
   - Input: Filing reference number
   - Input: Payment reference (if applicable)
   - Upload: Filed return copy
   - TODO: Filing workflow

6. **Actions Panel**
   - Button: Generate GSTR1 Report
   - Button: Generate GSTR3B Report
   - Button: File GST Return
   - Button: Export to Tally
   - TODO: Report generation and filing logic

### TODO Logic:
- [ ] GST calculation from sales (output GST)
- [ ] GST calculation from purchases/expenses (input GST)
- [ ] Period-wise GST aggregation
- [ ] GST report generation (GSTR1, GSTR3B format)
- [ ] Filing workflow and tracking
- [ ] Export to Tally integration
- [ ] Audit trail for GST operations

---

## Screen 5: Outstanding & Receivables Management

**Screen Name**: Outstanding Receivables  
**Route**: `/finance/receivables`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Track and manage outstanding payments from customers

### UI Sections:
1. **Header Section**
   - Page title: Outstanding Receivables
   - Date range selector

2. **Receivables Summary Cards**
   - Total Outstanding
   - Current (0-30 days)
   - 30-60 days overdue
   - 60+ days overdue
   - TODO: Outstanding aggregation from POS credit sales

3. **Search & Filters Panel**
   - Search bar: Customer name / mobile / order ID
   - Filters: Ageing (Current/30-60/60+) | Store
   - TODO: Search and filter logic

4. **Outstanding Payments Table**
   - Columns: Order ID | Customer | Store | Invoice Date | Due Date | Amount | Outstanding | Days Overdue | Actions
   - Action buttons: Record Payment | Send Reminder | Write-off (with approval)
   - TODO: Outstanding listing from POS integration

5. **Payment Recording Form** (Modal/Panel)
   - Order details
   - Outstanding amount
   - Input: Payment amount
   - Dropdown: Payment mode
   - Input: Payment reference
   - Input: Payment date
   - TODO: Payment recording logic

6. **Actions Panel**
   - Button: Record Payment
   - Button: Send Bulk Reminders
   - Button: Export Outstanding Report
   - TODO: Action logic

### TODO Logic:
- [ ] Outstanding tracking from POS credit sales
- [ ] Ageing calculation (0-30, 30-60, 60+ days)
- [ ] Payment recording and outstanding update
- [ ] Reminder notification integration
- [ ] Write-off approval workflow
- [ ] Export functionality
- [ ] Audit trail for receivables actions

---

## Screen 6: Bank Reconciliation

**Screen Name**: Bank Reconciliation  
**Route**: `/finance/reconciliation`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Reconcile bank statements with recorded transactions

### UI Sections:
1. **Header Section**
   - Page title: Bank Reconciliation
   - Period selector

2. **Bank Account Selection**
   - Dropdown: Select Bank Account
   - Account balance display
   - Last reconciled date
   - TODO: Bank account management

3. **Upload Bank Statement Panel**
   - File upload: Bank statement (CSV/Excel)
   - Button: Import Transactions
   - TODO: Bank statement import logic

4. **Reconciliation Table**
   - Columns: Date | Description | Debit | Credit | System Match | Status | Actions
   - Action: Mark as Reconciled | Flag Mismatch
   - TODO: Reconciliation matching logic

5. **Unreconciled Transactions Panel**
   - System transactions not in bank statement
   - Bank transactions not in system
   - TODO: Mismatch identification

6. **Reconciliation Summary Card**
   - Total reconciled
   - Total unreconciled
   - Differences
   - TODO: Summary calculations

7. **Actions Panel**
   - Button: Auto-match Transactions
   - Button: Complete Reconciliation
   - Button: Export Report
   - TODO: Reconciliation workflow

### TODO Logic:
- [ ] Bank statement import and parsing
- [ ] Auto-matching logic (date, amount, reference)
- [ ] Mismatch identification
- [ ] Manual reconciliation marking
- [ ] Reconciliation completion workflow
- [ ] Export functionality
- [ ] Audit trail for reconciliation actions

---

## Screen 7: Financial Periods & Locking

**Screen Name**: Financial Period Management  
**Route**: `/finance/periods`  
**Role Access**: Admin, Superadmin  
**Purpose**: Manage and lock financial periods for compliance

### UI Sections:
1. **Header Section**
   - Page title: Financial Period Management

2. **Current Period Status Card**
   - Current financial year
   - Current month
   - Status: Open / Locked
   - TODO: Period status display

3. **Financial Periods Table**
   - Columns: Period (Month-Year) | Status | Locked Date | Locked By | Actions
   - Action: Lock Period | Unlock (Superadmin only)
   - TODO: Period listing and status

4. **Period Lock Form**
   - Period selector
   - Validation: All transactions reconciled
   - Confirmation checkbox
   - Warning: Cannot be undone without Superadmin approval
   - TODO: Lock validation and workflow

5. **Lock Impact Summary**
   - Transactions count
   - Revenue total
   - Expenses total
   - GST summary
   - TODO: Lock impact calculations

6. **Actions Panel**
   - Button: Lock Period
   - Button: Unlock Period (Superadmin only)
   - TODO: Lock/unlock logic with approval

### TODO Logic:
- [ ] Financial period management
- [ ] Lock validation (reconciliation completion check)
- [ ] Lock enforcement (no edits to locked periods)
- [ ] Unlock approval workflow (Superadmin only with reason)
- [ ] Integration with Payroll and other modules for period locking
- [ ] Audit trail for lock/unlock actions

---

## Screen 8: Profit & Loss Statement

**Screen Name**: Profit & Loss Statement  
**Route**: `/finance/pnl`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Generate P&L statement for financial analysis

### UI Sections:
1. **Header Section**
   - Page title: Profit & Loss Statement
   - Period selector (Month/Quarter/Year)

2. **Revenue Section**
   - Gross Sales
   - (-) Discounts
   - Net Sales
   - (+) Other Income
   - **Total Revenue**
   - TODO: Revenue aggregation

3. **Cost of Goods Sold Section** (If applicable)
   - Opening Stock
   - (+) Purchases
   - (-) Closing Stock
   - **COGS**
   - TODO: Inventory-based COGS calculation

4. **Gross Profit Section**
   - Total Revenue
   - (-) COGS
   - **Gross Profit**
   - Gross Profit %
   - TODO: Gross profit calculation

5. **Operating Expenses Section**
   - Salary & Wages
   - Rent
   - Utilities
   - Marketing
   - Other Expenses (by category)
   - **Total Operating Expenses**
   - TODO: Expense aggregation by category

6. **Net Profit Section**
   - Gross Profit
   - (-) Operating Expenses
   - (-) GST Payable
   - **Net Profit/Loss**
   - Net Profit %
   - TODO: Net profit calculation

7. **Comparison Panel** (Optional)
   - Period-over-period comparison
   - Year-over-year comparison
   - TODO: Comparative analysis

8. **Actions Panel**
   - Button: Export to PDF
   - Button: Export to Excel
   - Button: Email Report
   - TODO: Export logic

### TODO Logic:
- [ ] Revenue aggregation from POS
- [ ] COGS calculation from Inventory
- [ ] Expense aggregation from Expense module
- [ ] Period-wise P&L calculation
- [ ] Comparative analysis (MoM, YoY)
- [ ] Export functionality
- [ ] Role-based access control

---

## Screen 9: Balance Sheet

**Screen Name**: Balance Sheet  
**Route**: `/finance/balance-sheet`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Generate balance sheet for financial position analysis

### UI Sections:
1. **Header Section**
   - Page title: Balance Sheet
   - As of Date selector

2. **Assets Section**
   - **Current Assets:**
     - Cash & Bank
     - Outstanding Receivables
     - Inventory Value
     - Other Current Assets
     - **Total Current Assets**
   - **Fixed Assets:**
     - Store fixtures & equipment
     - Less: Depreciation
     - **Net Fixed Assets**
   - **Total Assets**
   - TODO: Asset aggregation logic

3. **Liabilities Section**
   - **Current Liabilities:**
     - Outstanding Payables
     - Advances from customers
     - GST Payable
     - Other Current Liabilities
     - **Total Current Liabilities**
   - **Long-term Liabilities:**
     - Loans
     - Other Long-term Liabilities
     - **Total Long-term Liabilities**
   - **Total Liabilities**
   - TODO: Liability aggregation logic

4. **Equity Section**
   - Capital
   - Retained Earnings
   - Current Period Profit/Loss
   - **Total Equity**
   - TODO: Equity calculation

5. **Balance Verification**
   - Total Assets
   - Total Liabilities + Equity
   - Difference (should be zero)
   - TODO: Balance verification

6. **Actions Panel**
   - Button: Export to PDF
   - Button: Export to Excel
   - TODO: Export logic

### TODO Logic:
- [ ] Asset aggregation (cash, receivables, inventory)
- [ ] Liability aggregation (payables, advances, GST)
- [ ] Equity calculation
- [ ] Balance verification (Assets = Liabilities + Equity)
- [ ] Export functionality
- [ ] Role-based access control

---

## Screen 10: Financial Reports

**Screen Name**: Financial Reports  
**Route**: `/finance/reports`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Generate various financial reports

### UI Sections:
1. **Header Section**
   - Page title: Financial Reports
   - Period selector

2. **Report Type Selection Panel**
   - Radio: Revenue Report
   - Radio: Expense Report
   - Radio: GST Report
   - Radio: Profit & Loss
   - Radio: Balance Sheet
   - Radio: Cash Flow (future)
   - Radio: Store-wise Financial Summary
   - TODO: Report type selection logic

3. **Filters Panel**
   - Date range / Period
   - Store (for HQ users)
   - Category (if applicable)
   - TODO: Filter logic

4. **Report Preview/Display**
   - Dynamic report rendering based on selection
   - TODO: Report generation logic

5. **Actions Panel**
   - Button: Generate Report
   - Button: Export to Excel
   - Button: Export to PDF
   - Button: Export to Tally
   - TODO: Export logic

### TODO Logic:
- [ ] Report generation based on type
- [ ] Data aggregation from multiple modules
- [ ] Export to Excel/PDF
- [ ] Export to Tally integration
- [ ] Role-based report access
- [ ] Audit trail for report generation

---

## Screen 11: Audit Log

**Screen Name**: Financial Audit Log  
**Route**: `/finance/audit-log`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Track all financial transactions and changes

### UI Sections:
1. **Header Section**
   - Page title: Financial Audit Log
   - Date range selector

2. **Search & Filters Panel**
   - Search bar: User / Transaction ID / Description
   - Filters: Date Range | Action Type | Module | User | Store
   - TODO: Search and filter logic

3. **Audit Log Table**
   - Columns: Timestamp | User | Module | Action | Entity | Previous Value | New Value | IP Address | Details
   - TODO: Audit log listing
   - TODO: Pagination

4. **Export Panel**
   - Button: Export Audit Log
   - TODO: Export logic

### TODO Logic:
- [ ] Comprehensive audit logging of all financial actions
- [ ] Search and filter across audit logs
- [ ] Immutable audit trail
- [ ] Export functionality
- [ ] Role-based access control

---

## Screen 12: Tally Integration

**Screen Name**: Tally Integration  
**Route**: `/finance/tally`  
**Role Access**: Accountant, Admin, Superadmin  
**Purpose**: Export financial data to Tally accounting software

### UI Sections:
1. **Header Section**
   - Page title: Tally Integration
   - Last export date

2. **Export Configuration Panel**
   - Period selection
   - Data type selection (Sales/Purchases/Expenses/All)
   - Format selection (XML/CSV)
   - TODO: Export configuration

3. **Export Preview Panel**
   - Summary of data to be exported
   - Transactions count
   - Total amount
   - TODO: Preview generation

4. **Export History Table**
   - Columns: Date | Period | Data Type | Records Count | Status | Download
   - TODO: Export history tracking

5. **Actions Panel**
   - Button: Configure Export
   - Button: Export to Tally
   - Button: Download Export File
   - TODO: Export execution

### TODO Logic:
- [ ] Tally export format generation (XML/CSV)
- [ ] Data mapping to Tally format
- [ ] Export configuration management
- [ ] Export history tracking
- [ ] Download exported files
- [ ] Audit trail for exports

---

## Navigation Structure

### Finance Module Navigation (TODO):
- [ ] Accountant → All finance screens except period locking
- [ ] Admin/Superadmin → All finance screens including period management
- [ ] Store Manager → Read-only access to store-specific financial data
- [ ] Restricted access to GST and compliance screens

---

## Global Finance Rules (TODO):
- [ ] Locked periods cannot be edited (only Superadmin unlock)
- [ ] GST validation via API for all transactions
- [ ] All financial actions require audit trail
- [ ] Outstanding tracking from POS credit sales
- [ ] Bank reconciliation mandatory before period lock
- [ ] Export to Tally must maintain data integrity
- [ ] No deletion of financial records, only corrections with approval

---

**END OF FINANCE & ACCOUNTING SCREENS**
