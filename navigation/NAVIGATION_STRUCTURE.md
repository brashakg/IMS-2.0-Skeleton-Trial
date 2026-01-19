# IMS 2.0 — Navigation Structure

**Document Purpose**: Define complete navigation hierarchy and routing structure  
**Authority**: SYSTEM_INTENT.md  
**Status**: Build Pass #1 - Screen Skeletons Only

---

## Navigation Hierarchy

### Level 1: Main Modules (Sidebar Navigation)

1. **Dashboards** → `/dashboard`
2. **POS / Sales** → `/pos`
3. **Inventory** → `/inventory`
4. **Clinical** → `/clinical`
5. **HR & Attendance** → `/hr`
6. **Payroll & Incentives** → `/payroll`
7. **Finance & Accounting** → `/finance`
8. **Tasks & SOPs** → `/tasks`
9. **Expenses & Advances** → `/expenses`
10. **Marketplace** → `/marketplace`
11. **AI Intelligence** → `/ai` (Superadmin only)
12. **Setup & Configuration** → `/setup`

---

## Role-Based Navigation Access

### All Staff
- My Dashboard
- Mark Attendance
- Apply Leave
- My Payslips
- My Tasks
- Add Expense (limited categories)
- Request Advance

### Sales Staff
- Staff Dashboard
- POS (Sale Entry, Order Search, Draft Orders)
- Patient Search (Clinical)
- Prescription Search (Clinical)
- Tasks assigned to me

### Cashier
- Staff Dashboard
- POS Payment Processing
- Gift Card Management
- Order Search

### Optometrist
- Staff Dashboard
- Clinical Module (all screens)
- Patient Management
- Eye Tests & Prescriptions
- Clinical Schedule
- Tasks

### Workshop Staff
- Staff Dashboard
- Inventory (view only)
- Order tracking
- Tasks

### Store Manager
- Store Manager Dashboard
- All POS screens
- Inventory (store-specific)
- Clinical (reports and compliance)
- HR (store staff only)
- Tasks (create, assign, approve)
- Expenses (approve)
- Attendance management
- Reports (store-specific)

### Area Manager
- Area Manager Dashboard
- Multi-store overview
- Store-wise performance
- Escalations (regional)
- Reports (regional)

### Catalog Manager (HQ)
- Catalog Manager Dashboard
- Product Catalog (HQ)
- Category Management
- Product Activation

### Inventory HQ Team
- Inventory HQ Dashboard
- Product Catalog
- Stock Transfers (cross-store)
- Mismatch Escalations
- Vendor Returns

### Accountant / Finance
- Accountant Dashboard
- Finance & Accounting (all screens)
- Expense Approvals
- GST Management
- Payroll (view and process)
- Reports

### Admin (HQ Directors)
- Admin Dashboard
- All modules except AI Intelligence
- User Management
- Store Management
- Configuration (limited)
- Approvals (high-level)
- Reports (enterprise-wide)

### Superadmin (CEO)
- Superadmin Dashboard
- **ALL modules including AI Intelligence**
- Complete system access
- Role Management
- System Settings
- Override capabilities
- Audit Logs
- Backup & Restore

---

## Route Structure by Module

### 1. Dashboards (`/dashboard`)
```
/dashboard/staff
/dashboard/manager
/dashboard/area-manager
/dashboard/admin
/dashboard/superadmin
/dashboard/catalog
/dashboard/accountant
```

### 2. POS / Sales (`/pos`)
```
/pos                          # POS Home / Sale Entry
/pos/payment                  # Payment Processing
/pos/order-confirm/:orderId   # Order Confirmation
/pos/orders                   # Order Search & Listing
/pos/orders/:orderId          # Order Details
/pos/discount-override        # Discount Override Request
/pos/approvals/discounts      # Discount Approvals (Manager)
/pos/gift-cards               # Gift Card Management
/pos/orders/:orderId/prescription  # Attach Prescription
/pos/drafts                   # Draft Orders
/pos/barcode-print            # Barcode Printing
```

### 3. Inventory (`/inventory`)
```
/inventory/catalog            # Product Catalog (HQ)
/inventory/catalog/product/:productId?  # Add/Edit Product
/inventory/stock-receipt      # Stock Receipt (Store)
/inventory/stock              # Store Stock Overview
/inventory/stock/product/:productId  # Product Stock Details
/inventory/transfer           # Stock Transfer
/inventory/audit              # Stock Audit
/inventory/quarantine         # Quarantine Management
/inventory/vendor-returns     # Vendor Returns
/inventory/barcodes           # Barcode Generation
/inventory/low-stock          # Low Stock Alerts
/inventory/hq-dashboard       # Inventory HQ Dashboard
```

### 4. Clinical / Optometry (`/clinical`)
```
/clinical/patients/new        # Patient Registration
/clinical/patients            # Patient Search
/clinical/patients/:patientId # Patient Details
/clinical/eye-test/new        # Eye Test / Examination
/clinical/prescriptions/:prescriptionId  # Prescription Details
/clinical/prescriptions/:prescriptionId/renew  # Renew Prescription
/clinical/prescriptions       # Prescription Search
/clinical/dashboard           # Clinical Dashboard
/clinical/prescriptions/:prescriptionId/print  # Print Prescription
/clinical/schedule            # Optometrist Schedule
/clinical/reports             # Clinical Reports
/clinical/compliance          # Clinical Compliance
```

### 5. HR & Attendance (`/hr`)
```
/hr/staff                     # Staff Directory
/hr/staff/new                 # Add Staff
/hr/staff/:staffId/edit       # Edit Staff
/hr/staff/:staffId            # Staff Profile
/hr/attendance/mark           # Mark Attendance
/hr/attendance/history        # Attendance History
/hr/leave/apply               # Apply Leave
/hr/leave/approvals           # Leave Approvals
/hr/leave/management          # Leave History & Balance
/hr/dashboard                 # HR Dashboard
/hr/reports                   # HR Reports
/hr/shifts                    # Shift Management
/hr/performance               # Staff Performance
```

### 6. Payroll & Incentives (`/payroll`)
```
/payroll/dashboard            # Payroll Dashboard
/payroll/process              # Process Payroll
/payroll/staff/:staffId/:month  # Staff Payroll Details
/payroll/payslips             # Generate Payslips
/payroll/my-payslips          # My Payslips (Staff)
/payroll/incentives/config    # Incentive Configuration
/payroll/incentives/process   # Process Incentives
/payroll/incentives/staff/:staffId/:month  # Incentive Details
/payroll/incentives/approvals # Incentive Approvals
/payroll/advances             # Advance Salary Management
/payroll/request-advance      # Request Advance (Staff)
/payroll/reports              # Payroll Reports
/payroll/lock-period          # Payroll Period Lock
```

### 7. Finance & Accounting (`/finance`)
```
/finance/dashboard            # Finance Dashboard
/finance/revenue              # Revenue Accounting
/finance/expenses             # Expense Accounting
/finance/gst                  # GST Management
/finance/receivables          # Outstanding Receivables
/finance/reconciliation       # Bank Reconciliation
/finance/periods              # Financial Period Management
/finance/pnl                  # Profit & Loss Statement
/finance/balance-sheet        # Balance Sheet
/finance/reports              # Financial Reports
/finance/audit-log            # Financial Audit Log
/finance/tally                # Tally Integration
```

### 8. Tasks & SOPs (`/tasks`)
```
/tasks/dashboard              # Tasks Dashboard
/tasks/all                    # All Tasks Listing
/tasks/new                    # Create Task
/tasks/:taskId/edit           # Edit Task
/tasks/:taskId                # Task Details
/tasks/sops                   # SOP Library
/tasks/sops/:sopId            # SOP Details
/tasks/sops/new               # Create SOP
/tasks/sops/:sopId/edit       # Edit SOP
/tasks/escalations            # Task Escalations
/tasks/reports                # Task Reports
/tasks/recurring              # Recurring Tasks
```

### 9. Expenses & Advances (`/expenses`)
```
/expenses/dashboard           # Expenses Dashboard
/expenses/new                 # Add Expense
/expenses/all                 # All Expenses
/expenses/:expenseId          # Expense Details
/expenses/approvals           # Expense Approvals
/expenses/categories          # Expense Categories (Admin)
/expenses/reports             # Expense Reports
/expenses/advance/request     # Request Advance (Staff)
/expenses/advance/approvals   # Advance Approvals
/expenses/advance/settle/:advanceId  # Settle Advance
```

### 10. Marketplace (`/marketplace`)
```
/marketplace/dashboard        # Marketplace Dashboard
/marketplace/config           # Marketplace Configuration
/marketplace/products         # Marketplace Products
/marketplace/products/list/:productId  # Add/Edit Listing
/marketplace/orders           # Marketplace Orders
/marketplace/orders/:orderId  # Order Details
/marketplace/inventory-sync   # Inventory Sync
/marketplace/reports          # Marketplace Reports
/marketplace/logs             # Sync Logs
```

### 11. AI Intelligence (`/ai`) — SUPERADMIN ONLY
```
/ai/dashboard                 # AI Intelligence Dashboard
/ai/ask                       # Ask AI Intelligence
/ai/insights                  # AI Insights & Patterns
/ai/insights/:insightId       # Insight Details
/ai/proposals                 # AI Change Proposals
/ai/proposals/:proposalId     # Proposal Details
/ai/history                   # AI Analysis History
/ai/config                    # AI Configuration
```

### 12. Setup & Configuration (`/setup`)
```
/setup/dashboard              # Setup Dashboard
/setup/stores                 # Store Management
/setup/users                  # User Management
/setup/roles                  # Role Management (Superadmin)
/setup/categories             # Category Management
/setup/settings               # System Settings (Superadmin)
/setup/integrations           # Integration Settings
/setup/audit-log              # System Audit Log
/setup/backup                 # Backup & Restore (Superadmin)
/setup/health                 # System Health (Superadmin)
```

---

## Navigation Menu Structure (Sidebar)

### Top Section (Always Visible)
- User Profile Dropdown
  - My Profile
  - My Payslips
  - My Tasks
  - Change Password
  - Logout

### Store Selector (Context-based)
- For multi-store users: Dropdown to switch store context
- For HQ users: "All Stores" option

### Main Navigation (Role-filtered)
- Dashboard (icon + text)
- POS / Sales (icon + text)
- Inventory (icon + text)
- Clinical (icon + text)
- HR (icon + text)
- Payroll (icon + text)
- Finance (icon + text)
- Tasks (icon + text)
- Expenses (icon + text)
- Marketplace (icon + text)
- AI Intelligence (icon + text) — Superadmin only, special highlight
- Setup (icon + text)

### Bottom Section
- Notifications (icon with badge count)
- Help / Support
- System Version

---

## Notifications Structure

### Notification Types
1. **Task Notifications**
   - New task assigned
   - Task overdue
   - Task escalated

2. **Approval Notifications**
   - Discount override request
   - Expense approval request
   - Leave approval request
   - Incentive approval request

3. **Escalation Notifications**
   - Stock mismatch escalation
   - Vendor return SLA breach
   - Task escalation

4. **System Notifications**
   - Low stock alerts
   - Overdue payments
   - GST filing due
   - Payroll pending

5. **AI Notifications** (Superadmin only)
   - High-priority AI insights
   - AI change proposals

### Notification Center (`/notifications`)
- All notifications list
- Filter by type
- Mark as read
- Action buttons (context-specific)

---

## Breadcrumb Navigation

### Format
Home > Module > Section > Screen

### Examples
- Home > POS > Orders > Order Details (#12345)
- Home > Inventory > Stock > Product Details (SKU-001)
- Home > Clinical > Patients > Patient Details (John Doe)
- Home > Setup > Users > Edit User (Jane Smith)

---

## Global Navigation Behaviors (TODO)

### Store Context
- [ ] Store-scoped users: Automatically filtered to their store
- [ ] Multi-store users: Store selector dropdown
- [ ] HQ users: "All Stores" view with drill-down capability

### Role-Based Menu Visibility
- [ ] Dynamic menu based on user role(s)
- [ ] Multiple roles: Union of all role permissions
- [ ] Hidden modules: Not visible in navigation

### Active State Indicators
- [ ] Current module highlighted in sidebar
- [ ] Current screen highlighted in sub-navigation
- [ ] Breadcrumb reflects current location

### Quick Actions (Global)
- [ ] Quick search: Global search bar (products, customers, orders)
- [ ] Quick create: Floating action button for common tasks
- [ ] Notifications: Real-time notification badge

### Mobile Navigation (Future)
- [ ] Collapsible sidebar
- [ ] Bottom navigation for key modules
- [ ] Touch-friendly interaction

---

## Route Guards & Access Control (TODO)

### Authentication
- [ ] All routes require authentication
- [ ] Redirect to login if not authenticated
- [ ] Session timeout handling

### Authorization
- [ ] Role-based route access
- [ ] Redirect to dashboard if unauthorized
- [ ] 403 error page for access denied

### Store Context Validation
- [ ] Store-scoped routes validate store access
- [ ] Redirect if accessing unauthorized store

### Special Routes
- [ ] `/ai/*` → Hard-blocked for non-Superadmin
- [ ] `/setup/roles` → Superadmin only
- [ ] `/setup/settings` → Superadmin only
- [ ] `/setup/backup` → Superadmin only

---

## Navigation State Management (TODO)

### Current Context
- [ ] Active module
- [ ] Active screen
- [ ] Selected store (if applicable)
- [ ] User role(s)

### Navigation History
- [ ] Browser back/forward support
- [ ] Breadcrumb navigation
- [ ] Recently visited screens

### Persistent State
- [ ] Remember last visited screen per module
- [ ] Remember store selection
- [ ] Remember filter/search state

---

**END OF NAVIGATION STRUCTURE**
