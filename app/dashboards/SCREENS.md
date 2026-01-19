# Dashboard Module — Screen Skeletons

**Module**: Dashboards  
**Purpose**: Role-based landing screens showing key metrics, alerts, tasks, and operational status  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: Staff Dashboard

**Screen Name**: Staff Dashboard  
**Route**: `/dashboard/staff`  
**Role Access**: Sales Staff, Cashier  
**Purpose**: Daily operational view for store staff

### UI Sections:
1. **Header Section**
   - Store name
   - Current user role(s)
   - Date & shift info
   - Pending tasks count (badge)

2. **Today's Metrics Card**
   - My Sales Count (TODO: fetch logic)
   - My Sales Value (TODO: fetch logic)
   - Pending Orders Count (TODO: fetch logic)
   - Placeholder for numeric displays

3. **My Tasks Card**
   - Task list table
   - Columns: Task Name | Priority | Due Date | Status
   - TODO: Task filtering and assignment logic
   - TODO: Priority color coding

4. **Pending Deliveries Card**
   - Order list table
   - Columns: Order ID | Customer | Expected Date | Status
   - TODO: Fetch pending deliveries for staff

5. **Quick Actions Panel**
   - Button: New Sale
   - Button: Search Order
   - Button: Mark Attendance
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Fetch staff-specific sales data
- [ ] Fetch assigned tasks
- [ ] Fetch pending deliveries
- [ ] Real-time task count updates
- [ ] Role-based action visibility

---

## Screen 2: Store Manager Dashboard

**Screen Name**: Store Manager Dashboard  
**Route**: `/dashboard/manager`  
**Role Access**: Store Manager  
**Purpose**: Store-level operational overview and control

### UI Sections:
1. **Header Section**
   - Store name
   - Manager name
   - Date range selector (default: Today)
   - Alerts count (badge)

2. **Store Performance Card**
   - Total Sales (Amount)
   - Total Orders
   - Average Bill Value
   - Conversion Rate
   - TODO: Date range filtering logic
   - TODO: Comparison with targets

3. **Staff Performance Table**
   - Columns: Staff Name | Sales Count | Sales Value | Attendance | Status
   - TODO: Staff-wise breakup logic
   - TODO: Attendance integration

4. **Inventory Alerts Card**
   - Low stock items count
   - Pending stock acceptance count
   - Pending transfers count
   - TODO: Alert thresholds and rules

5. **Tasks & Escalations Card**
   - Open tasks count
   - Overdue tasks count
   - Escalations received count
   - TODO: Task filtering by priority

6. **Clinical Summary Card**
   - Eye tests conducted
   - Prescriptions issued
   - Pending prescription validations
   - TODO: Clinical data aggregation

7. **Quick Actions Panel**
   - Button: View All Tasks
   - Button: Stock Acceptance
   - Button: View Reports
   - Button: Manage Staff
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Store-level sales aggregation
- [ ] Staff performance calculations
- [ ] Inventory alert rules
- [ ] Task escalation tracking
- [ ] Date range filtering
- [ ] Export functionality

---

## Screen 3: Area Manager Dashboard

**Screen Name**: Area Manager Dashboard  
**Route**: `/dashboard/area-manager`  
**Role Access**: Area Manager  
**Purpose**: Multi-store oversight and regional performance

### UI Sections:
1. **Header Section**
   - Area/Region name
   - Store selector (multi-select)
   - Date range selector
   - Critical alerts count

2. **Regional Performance Card**
   - Total Sales across stores
   - Total Orders
   - Store-wise comparison chart (placeholder)
   - Top performing store
   - Bottom performing store
   - TODO: Multi-store aggregation logic

3. **Store-wise Performance Table**
   - Columns: Store | Sales | Orders | Staff Count | Pending Tasks | Inventory Alerts
   - TODO: Sortable columns
   - TODO: Drill-down navigation

4. **Tasks & Escalations Card**
   - Total pending tasks across stores
   - Escalations requiring attention
   - Overdue tasks count
   - TODO: Priority-based filtering

5. **Inventory Overview Card**
   - Pending transfers between stores
   - Stock acceptance pending count
   - Critical stock shortages
   - TODO: Cross-store inventory logic

6. **Quick Actions Panel**
   - Button: View Store Details
   - Button: Approve Escalations
   - Button: Regional Reports
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Multi-store data aggregation
- [ ] Store comparison logic
- [ ] Regional escalation handling
- [ ] Cross-store inventory visibility
- [ ] Performance ranking algorithms

---

## Screen 4: Admin Dashboard (HQ)

**Screen Name**: Admin Dashboard  
**Route**: `/dashboard/admin`  
**Role Access**: Admin (HQ Directors)  
**Purpose**: Enterprise-wide operational control and decision-making

### UI Sections:
1. **Header Section**
   - Company name
   - Admin role
   - Date range selector
   - Critical system alerts

2. **Enterprise Metrics Card**
   - Total Sales (All Stores)
   - Total Orders
   - Active Stores Count
   - Total Staff Count
   - TODO: Enterprise-wide aggregation

3. **Financial Summary Card**
   - Revenue (GST inclusive)
   - Outstanding Amount
   - Expenses
   - Net Position
   - TODO: Finance module integration

4. **Store Performance Table**
   - Columns: Store | Region | Sales | Orders | Profitability | Status
   - TODO: Sortable and filterable
   - TODO: Drill-down to store details

5. **Inventory Control Card**
   - Pending catalog approvals
   - Stock transfer requests
   - Mismatch escalations
   - TODO: HQ approval workflow hooks

6. **HR Summary Card**
   - Total Staff
   - Attendance compliance
   - Pending leave approvals
   - Payroll status
   - TODO: HR module integration

7. **System Health Card**
   - Active users count
   - System errors (if any)
   - Pending configurations
   - TODO: System monitoring integration

8. **Quick Actions Panel**
   - Button: Approve Catalog Items
   - Button: Review Escalations
   - Button: Financial Reports
   - Button: System Configuration
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Enterprise-wide data aggregation
- [ ] Financial calculations and compliance
- [ ] HQ approval workflows
- [ ] System health monitoring
- [ ] Role-based action visibility

---

## Screen 5: Superadmin Dashboard

**Screen Name**: Superadmin Dashboard  
**Route**: `/dashboard/superadmin`  
**Role Access**: Superadmin (CEO)  
**Purpose**: Supreme visibility, control, and AI intelligence access

### UI Sections:
1. **Header Section**
   - System name
   - Superadmin identifier
   - Date range selector
   - AI Intelligence access button
   - System override mode indicator

2. **Executive Summary Card**
   - Total Revenue
   - Total Orders
   - Active Stores
   - Total Staff
   - Growth metrics (placeholder for charts)
   - TODO: Executive KPI calculations

3. **Financial Control Card**
   - Revenue
   - Expenses
   - Outstanding
   - Profit/Loss
   - GST compliance status
   - TODO: Financial module integration

4. **Store & Operations Table**
   - Columns: Store | Region | Sales | Profitability | Compliance | Critical Issues
   - TODO: Full store visibility
   - TODO: Compliance tracking

5. **AI Intelligence Panel** (Unique to Superadmin)
   - AI Insights summary
   - Recommended actions count
   - Pattern detections
   - TODO: AI module integration (read-only)
   - TODO: Approval workflow for AI suggestions

6. **System Governance Card**
   - Pending high-level approvals
   - Audit log summary
   - Configuration changes log
   - User activity monitor
   - TODO: Audit trail integration

7. **HR & Payroll Card**
   - Total payroll
   - Pending approvals
   - Incentive summary
   - TODO: HR/Payroll integration

8. **Tasks & Escalations Card**
   - Critical escalations
   - Unresolved issues
   - High-priority tasks
   - TODO: Task prioritization logic

9. **Quick Actions Panel**
   - Button: Ask AI Intelligence
   - Button: Approve AI Changes
   - Button: System Configuration
   - Button: Audit Logs
   - Button: Override Mode (critical)
   - TODO: Navigation and permission hooks

### TODO Logic:
- [ ] Executive KPI calculations
- [ ] AI intelligence integration (read-only)
- [ ] AI approval workflow
- [ ] System-wide audit trail
- [ ] Override mode implementation
- [ ] Compliance tracking
- [ ] Real-time system monitoring

---

## Screen 6: Catalog Manager Dashboard (HQ)

**Screen Name**: Catalog Manager Dashboard  
**Route**: `/dashboard/catalog`  
**Role Access**: Product Catalog Manager (HQ)  
**Purpose**: Product catalog management and activation oversight

### UI Sections:
1. **Header Section**
   - Module name
   - User role
   - Date

2. **Catalog Summary Card**
   - Total SKUs
   - Active SKUs
   - Pending activation
   - Inactive SKUs
   - TODO: Catalog statistics logic

3. **Pending Actions Card**
   - New products awaiting activation
   - Price change requests
   - Category assignments pending
   - TODO: Approval workflow integration

4. **Recent Activity Table**
   - Columns: Action | Product | Store | Date | Status
   - TODO: Activity log integration

5. **Quick Actions Panel**
   - Button: Add New Product
   - Button: Bulk Upload
   - Button: Activate Products
   - Button: Price Management
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Catalog statistics aggregation
- [ ] Approval workflows
- [ ] Bulk operations handling
- [ ] Activity logging

---

## Screen 7: Accountant Dashboard (HQ)

**Screen Name**: Accountant Dashboard  
**Route**: `/dashboard/accountant`  
**Role Access**: Accountant / Finance  
**Purpose**: Financial oversight, GST compliance, and audit preparation

### UI Sections:
1. **Header Section**
   - Module name
   - User role
   - Financial period selector

2. **Financial Summary Card**
   - Total Revenue
   - Total Expenses
   - Outstanding Receivables
   - GST Collected
   - GST Paid
   - TODO: Financial calculations

3. **Compliance Status Card**
   - GST filing status
   - Locked periods indicator
   - Pending reconciliations
   - TODO: Compliance tracking logic

4. **Pending Approvals Card**
   - Expense approvals pending
   - Advance settlement pending
   - Write-off approvals pending
   - TODO: Approval workflow integration

5. **Recent Transactions Table**
   - Columns: Date | Type | Amount | Store | Status
   - TODO: Transaction log integration

6. **Quick Actions Panel**
   - Button: GST Reports
   - Button: Expense Approvals
   - Button: Reconciliation
   - Button: Lock Period
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Financial aggregation across stores
- [ ] GST calculations and compliance
- [ ] Period locking mechanism
- [ ] Approval workflows
- [ ] Export to Tally integration

---

## Navigation Structure

### Dashboard Routing Logic (TODO):
- [ ] Role-based default dashboard selection
- [ ] Multi-role users → show role selector
- [ ] Store context → filter data by store
- [ ] HQ roles → access to all stores
- [ ] Superadmin → access to everything + AI

### Navigation Menu Placement:
- Left sidebar: Module navigation
- Top bar: User profile, notifications, store selector (if applicable)
- Dashboard cards: Clickable → deep navigation to modules

---

## Global Dashboard Rules (TODO):
- [ ] No customizable colors (system-enforced urgency coding)
- [ ] Real-time updates for critical metrics
- [ ] Audit logging for all dashboard actions
- [ ] Role-based widget visibility
- [ ] Date range must not exceed role-allowed limits
- [ ] AI insights visible only to Superadmin
- [ ] No data export without audit trail

---

**END OF DASHBOARD SCREENS**
