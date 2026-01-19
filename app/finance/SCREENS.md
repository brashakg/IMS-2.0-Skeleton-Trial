# Payroll & Incentives Module — Screen Skeletons

**Module**: Payroll & Incentives  
**Purpose**: Salary processing, incentive calculation, and payment management  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: Payroll Dashboard

**Screen Name**: Payroll Dashboard  
**Route**: `/payroll/dashboard`  
**Role Access**: Admin, Superadmin, Accountant  
**Purpose**: Overview of payroll status and pending actions

### UI Sections:
1. **Header Section**
   - Page title: Payroll Dashboard
   - Current month/year selector

2. **Payroll Summary Cards**
   - Total staff count
   - Total salary amount (current month)
   - Processed count
   - Pending count
   - TODO: Payroll aggregation logic

3. **Incentives Summary Card**
   - Total incentives (current month)
   - Approved incentives
   - Pending approvals
   - TODO: Incentives aggregation logic

4. **Pending Actions Card**
   - Pending payroll approvals
   - Pending incentive approvals
   - Pending advance settlements
   - TODO: Action queue management

5. **Month Status Card**
   - Payroll status: Open / In Progress / Locked
   - Lock indicator
   - TODO: Payroll period status

6. **Quick Actions Panel**
   - Button: Process Payroll
   - Button: Approve Incentives
   - Button: View Reports
   - Button: Lock Payroll Period
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Monthly payroll aggregation
- [ ] Incentives calculation integration
- [ ] Payroll period status management
- [ ] Action queue tracking
- [ ] Real-time updates

---

## Screen 2: Process Payroll

**Screen Name**: Process Payroll  
**Route**: `/payroll/process`  
**Role Access**: Admin, Superadmin, Accountant  
**Purpose**: Calculate and process monthly salary

### UI Sections:
1. **Header Section**
   - Page title: Process Payroll
   - Month/Year selector

2. **Payroll Period Settings**
   - Input: Payroll month
   - Input: Payment date
   - Calculated: Working days
   - TODO: Period validation logic

3. **Staff Payroll Table**
   - Columns: Employee ID | Name | Store | Basic | HRA | Allowances | Gross | Deductions | Incentives | Net Salary | Status | Actions
   - Action: View Details | Edit Deductions | Exclude
   - TODO: Payroll calculation logic per staff
   - TODO: Attendance integration for deductions

4. **Bulk Actions Panel**
   - Select multiple staff
   - Bulk actions: Process | Approve | Export
   - TODO: Bulk operations logic

5. **Payroll Summary Card**
   - Total staff included
   - Total gross salary
   - Total deductions
   - Total incentives
   - Total net salary
   - TODO: Summary calculations

6. **Actions Panel**
   - Button: Calculate Payroll
   - Button: Submit for Approval
   - Button: Export Payslips
   - Button: Cancel
   - TODO: Payroll processing workflow

### TODO Logic:
- [ ] Payroll calculation based on attendance
- [ ] Working days calculation
- [ ] Deductions calculation (absents, late marks, advances)
- [ ] Incentives integration
- [ ] Attendance integration for salary calculation
- [ ] Approval workflow
- [ ] Audit trail for payroll processing

---

## Screen 3: Staff Payroll Details

**Screen Name**: Staff Payroll Details  
**Route**: `/payroll/staff/:staffId/:month`  
**Role Access**: Admin, Superadmin, Accountant  
**Purpose**: View detailed payroll breakdown for a staff member

### UI Sections:
1. **Header Section**
   - Staff name
   - Employee ID
   - Month/Year

2. **Salary Components Card**
   - Basic salary
   - HRA
   - Other allowances
   - Gross salary
   - TODO: Salary components display

3. **Attendance Summary Card**
   - Total working days
   - Present days
   - Absent days
   - Late marks
   - Leaves taken
   - TODO: Attendance aggregation from HR module

4. **Deductions Card**
   - Absence deduction
   - Late mark deduction
   - Advance deduction
   - Other deductions
   - Total deductions
   - TODO: Deductions calculation logic

5. **Incentives Card**
   - Sales incentives
   - Performance incentives
   - Other incentives
   - Total incentives
   - TODO: Incentives breakdown

6. **Net Salary Card**
   - Gross salary
   - (-) Total deductions
   - (+) Total incentives
   - **Net Payable** (highlighted)
   - TODO: Net salary calculation

7. **Payment Information Card**
   - Bank details
   - Payment status
   - Payment date
   - Payment reference
   - TODO: Payment tracking

8. **Actions Panel**
   - Button: Edit Deductions
   - Button: Download Payslip
   - Button: Mark as Paid
   - TODO: Action logic with audit trail

### TODO Logic:
- [ ] Salary breakdown calculation
- [ ] Attendance integration for deductions
- [ ] Incentives integration
- [ ] Net salary calculation
- [ ] Payment tracking
- [ ] Payslip generation
- [ ] Audit trail for all payroll actions

---

## Screen 4: Payslip Generation & Distribution

**Screen Name**: Generate Payslips  
**Route**: `/payroll/payslips`  
**Role Access**: Admin, Superadmin, Accountant  
**Purpose**: Generate and distribute payslips to staff

### UI Sections:
1. **Header Section**
   - Page title: Payslips
   - Month/Year selector

2. **Payslip Generation Panel**
   - Month selection
   - Staff selection (all or individual)
   - Button: Generate Payslips
   - TODO: Payslip generation logic

3. **Payslips Table**
   - Columns: Employee ID | Name | Month | Gross | Net | Status | Actions
   - Action buttons: View | Download | Send via Email
   - TODO: Payslip listing logic

4. **Bulk Actions Panel**
   - Select multiple staff
   - Bulk actions: Download All | Email All
   - TODO: Bulk distribution logic

5. **Payslip Preview Panel** (Modal/Side panel)
   - Payslip template preview
   - TODO: Payslip template rendering

### TODO Logic:
- [ ] Payslip template rendering
- [ ] PDF generation
- [ ] Email distribution integration
- [ ] Bulk generation and distribution
- [ ] Audit trail for payslip access

---

## Screen 5: Payslip View (Staff Self-Service)

**Screen Name**: My Payslips  
**Route**: `/payroll/my-payslips`  
**Role Access**: All Staff (Self)  
**Purpose**: Staff view their own payslips

### UI Sections:
1. **Header Section**
   - Page title: My Payslips
   - Staff name

2. **Payslips List**
   - Columns: Month | Gross Salary | Net Salary | Status | Actions
   - Action: View Payslip | Download
   - TODO: Staff-specific payslip listing

3. **Current Month Payslip Card** (If available)
   - Payslip summary
   - TODO: Current payslip display

4. **Actions Panel**
   - Button: Download Payslip
   - TODO: Download logic

### TODO Logic:
- [ ] Staff-specific payslip access (only own payslips)
- [ ] Payslip viewing and download
- [ ] Audit trail for payslip access

---

## Screen 6: Incentive Configuration

**Screen Name**: Incentive Configuration  
**Route**: `/payroll/incentives/config`  
**Role Access**: Admin, Superadmin  
**Purpose**: Configure incentive rules and slabs

### UI Sections:
1. **Header Section**
   - Page title: Incentive Configuration

2. **Incentive Types List**
   - Sales Incentive
   - Performance Incentive
   - Target-based Incentive
   - Button: Add New Type
   - TODO: Incentive type management

3. **Sales Incentive Configuration Form**
   - Slab-based structure table
   - Columns: Sales Range (From-To) | Incentive % | Incentive Amount | Actions
   - Button: Add Slab
   - TODO: Slab configuration logic

4. **Role-based Incentive Settings**
   - Different incentive slabs per role
   - TODO: Role-specific incentive rules

5. **Store-based Multipliers** (Optional)
   - Different incentive rates per store
   - TODO: Store-specific configurations

6. **Actions Panel**
   - Button: Save Configuration
   - Button: Preview Impact
   - Button: Cancel
   - TODO: Configuration save logic

### TODO Logic:
- [ ] Incentive type management
- [ ] Slab-based incentive configuration
- [ ] Role-based incentive rules
- [ ] Store-specific multipliers
- [ ] Configuration validation
- [ ] Impact preview calculations
- [ ] Audit trail for configuration changes

---

## Screen 7: Incentive Calculation & Processing

**Screen Name**: Process Incentives  
**Route**: `/payroll/incentives/process`  
**Role Access**: Admin, Superadmin  
**Purpose**: Calculate and process incentives for staff

### UI Sections:
1. **Header Section**
   - Page title: Process Incentives
   - Month/Year selector

2. **Calculation Settings**
   - Month selection
   - Store selection (all or specific)
   - Button: Calculate Incentives
   - TODO: Calculation trigger logic

3. **Staff Incentives Table**
   - Columns: Employee ID | Name | Role | Store | Total Sales | Incentive % | Calculated Incentive | Status | Actions
   - Action buttons: View Details | Edit | Approve
   - TODO: Incentive calculation logic
   - TODO: Integration with POS sales data

4. **Incentive Summary Card**
   - Total staff included
   - Total incentives calculated
   - Total incentives approved
   - Pending approvals
   - TODO: Summary calculations

5. **Bulk Actions Panel**
   - Select multiple staff
   - Bulk actions: Approve | Reject | Export
   - TODO: Bulk approval logic

6. **Actions Panel**
   - Button: Submit for Approval
   - Button: Export Report
   - Button: Cancel
   - TODO: Approval workflow

### TODO Logic:
- [ ] Incentive calculation based on configured rules
- [ ] Integration with POS sales data
- [ ] Role-based incentive application
- [ ] Approval workflow
- [ ] Incentive breakdown per staff
- [ ] Audit trail for incentive processing

---

## Screen 8: Incentive Details & Breakdown

**Screen Name**: Staff Incentive Details  
**Route**: `/payroll/incentives/staff/:staffId/:month`  
**Role Access**: Admin, Superadmin, Self (read-only)  
**Purpose**: View detailed incentive breakdown for a staff member

### UI Sections:
1. **Header Section**
   - Staff name
   - Employee ID
   - Month/Year

2. **Sales Summary Card**
   - Total sales count
   - Total sales value
   - Average bill value
   - TODO: Sales data from POS integration

3. **Incentive Calculation Breakdown**
   - Sales slab applied
   - Incentive percentage
   - Base incentive amount
   - Multipliers applied (if any)
   - Final incentive amount
   - TODO: Detailed calculation display

4. **Order-wise Contribution Table** (Optional detailed view)
   - Columns: Order ID | Date | Amount | Incentive Contribution
   - TODO: Order-level breakdown

5. **Approval Status Card**
   - Approval status
   - Approved by
   - Approval date
   - Remarks (if any)
   - TODO: Approval tracking

6. **Actions Panel**
   - Button: Approve (if pending)
   - Button: Edit (if allowed)
   - Button: Export
   - TODO: Action logic with audit trail

### TODO Logic:
- [ ] Incentive calculation breakdown display
- [ ] Integration with POS for order-level data
- [ ] Approval status tracking
- [ ] Role-based view (staff can see own incentives)
- [ ] Audit trail for incentive actions

---

## Screen 9: Incentive Approvals

**Screen Name**: Incentive Approvals  
**Route**: `/payroll/incentives/approvals`  
**Role Access**: Admin, Superadmin  
**Purpose**: Approve or reject calculated incentives

### UI Sections:
1. **Header Section**
   - Page title: Incentive Approvals
   - Pending count badge

2. **Pending Approvals Table**
   - Columns: Employee ID | Name | Store | Month | Sales | Calculated Incentive | Actions
   - Action buttons: Approve | Reject | View Details
   - TODO: Pending approvals listing

3. **Approval Decision Form** (Modal/Panel)
   - Staff details
   - Incentive calculation breakdown
   - Input: Approved amount (editable if adjustment needed)
   - Text area: Remarks
   - TODO: Approval decision logic

4. **Bulk Actions Panel**
   - Select multiple incentives
   - Bulk approve/reject
   - TODO: Bulk approval logic

5. **Approval History Table**
   - Columns: Date | Staff | Month | Incentive | Decision | Approver
   - TODO: Approval history fetch logic

### TODO Logic:
- [ ] Pending approvals queue management
- [ ] Approval decision capture with remarks
- [ ] Incentive adjustment capability
- [ ] Real-time notification to staff
- [ ] Bulk approval operations
- [ ] Audit trail for all approval actions

---

## Screen 10: Advance Salary Management

**Screen Name**: Advance Salary  
**Route**: `/payroll/advances`  
**Role Access**: Admin, Superadmin, Store Manager (request only)  
**Purpose**: Manage advance salary requests and deductions

### UI Sections:
1. **Header Section**
   - Page title: Advance Salary Management
   - Tabs: Requests | Active Advances | Settlement History

2. **Advance Requests Table**
   - Columns: Request ID | Staff Name | Amount | Reason | Requested Date | Status | Actions
   - Action buttons: Approve | Reject | View Details
   - TODO: Advance requests listing

3. **Request Details Panel**
   - Staff details
   - Requested amount
   - Reason
   - Current salary
   - Existing advances (if any)
   - Approval form
   - Input: Approved amount
   - Input: Deduction plan (number of months)
   - TODO: Request approval logic

4. **Active Advances Table**
   - Columns: Staff Name | Total Advance | Deducted | Remaining | Monthly Deduction | Expected Completion
   - TODO: Active advances tracking

5. **Actions Panel**
   - Button: Approve Request
   - Button: View Settlement Plan
   - Button: Export Report
   - TODO: Action logic

### TODO Logic:
- [ ] Advance request management
- [ ] Approval workflow with deduction plan
- [ ] Integration with payroll for automatic deductions
- [ ] Advance balance tracking
- [ ] Settlement completion tracking
- [ ] Audit trail for advance transactions

---

## Screen 11: Advance Request (Staff View)

**Screen Name**: Request Advance  
**Route**: `/payroll/request-advance`  
**Role Access**: All Staff  
**Purpose**: Staff request advance salary

### UI Sections:
1. **Header Section**
   - Page title: Request Advance
   - Staff name

2. **Current Salary Card**
   - Basic salary
   - Gross salary
   - TODO: Salary details display

3. **Existing Advances Card** (If any)
   - Active advance amount
   - Remaining balance
   - Monthly deduction
   - TODO: Active advances display

4. **Advance Request Form**
   - Input: Requested amount
   - Text area: Reason (mandatory)
   - Suggested deduction plan display
   - TODO: Amount validation logic

5. **Actions Panel**
   - Button: Submit Request
   - Button: Cancel
   - TODO: Request submission logic

### TODO Logic:
- [ ] Current salary fetch
- [ ] Existing advance check
- [ ] Amount validation (max limit based on salary)
- [ ] Request submission
- [ ] Notification to approver
- [ ] Audit trail for advance requests

---

## Screen 12: Payroll Reports

**Screen Name**: Payroll Reports  
**Route**: `/payroll/reports`  
**Role Access**: Admin, Superadmin, Accountant  
**Purpose**: Generate payroll and incentive reports

### UI Sections:
1. **Header Section**
   - Page title: Payroll Reports
   - Date range selector

2. **Report Type Selection Panel**
   - Radio: Monthly Payroll Summary
   - Radio: Incentive Report
   - Radio: Advance Salary Report
   - Radio: Deductions Report
   - Radio: Store-wise Payroll
   - TODO: Report type selection logic

3. **Filters Panel**
   - Month/Year or Date range
   - Store (for HQ users)
   - Staff (optional)
   - TODO: Filter logic

4. **Report Preview/Table**
   - Dynamic report display based on selection
   - TODO: Report data fetch and rendering

5. **Actions Panel**
   - Button: Generate Report
   - Button: Export to Excel
   - Button: Export to PDF
   - TODO: Export logic

### TODO Logic:
- [ ] Report generation based on type
- [ ] Data aggregation logic
- [ ] Export to Excel/PDF
- [ ] Role-based report access
- [ ] Audit trail for report generation

---

## Screen 13: Payroll Lock & Period Management

**Screen Name**: Payroll Period Lock  
**Route**: `/payroll/lock-period`  
**Role Access**: Admin, Superadmin  
**Purpose**: Lock payroll periods to prevent changes

### UI Sections:
1. **Header Section**
   - Page title: Payroll Period Management

2. **Current Period Status Card**
   - Current month
   - Status: Open / Locked
   - Locked by (if locked)
   - Locked date (if locked)
   - TODO: Period status display

3. **Period Lock Form**
   - Month/Year selector
   - Confirmation checkbox
   - Warning: Cannot be undone without Superadmin approval
   - TODO: Lock validation logic

4. **Locked Periods Table**
   - Columns: Period | Locked Date | Locked By | Status | Actions
   - Action: Unlock (Superadmin only with reason)
   - TODO: Locked periods history

5. **Actions Panel**
   - Button: Lock Period
   - Button: Unlock Period (Superadmin only)
   - TODO: Lock/unlock logic with approval

### TODO Logic:
- [ ] Payroll period locking mechanism
- [ ] Lock validation (all payrolls processed)
- [ ] Unlock approval workflow (Superadmin only)
- [ ] Integration with Finance module for locked periods
- [ ] Audit trail for lock/unlock actions

---

## Navigation Structure

### Payroll Module Navigation (TODO):
- [ ] Admin/Superadmin → All payroll and incentive screens
- [ ] Accountant → Process payroll, reports
- [ ] Store Manager → Request advance, view incentive approvals
- [ ] All Staff → View own payslips, request advance, view own incentives

---

## Global Payroll Rules (TODO):
- [ ] Salary calculation based on attendance (integration with HR)
- [ ] Incentives calculated from POS sales data
- [ ] Advance deductions automatic in payroll
- [ ] Locked payroll periods cannot be edited (only Superadmin unlock)
- [ ] All payroll actions require audit trail
- [ ] Salary visibility role-based
- [ ] No deletion of payroll records, only corrections with approval

---

**END OF PAYROLL & INCENTIVES SCREENS**
