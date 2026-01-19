# HR & Attendance Module — Screen Skeletons

**Module**: HR & Attendance  
**Purpose**: Employee management, attendance tracking, leave management  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: Staff Listing

**Screen Name**: Staff Directory  
**Route**: `/hr/staff`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: View and manage all staff members

### UI Sections:
1. **Header Section**
   - Page title: Staff Directory
   - Button: Add New Staff
   - Button: Bulk Upload

2. **Search & Filters Panel**
   - Search bar: Name / Employee ID / Mobile
   - Filters: Store | Role | Status (Active/Inactive) | Department
   - TODO: Search and filter logic

3. **Staff Table**
   - Columns: Employee ID | Name | Role(s) | Store | Mobile | Joining Date | Status | Actions
   - Action buttons: View Details | Edit | Deactivate
   - TODO: Staff listing logic
   - TODO: Pagination

4. **Quick Stats Cards**
   - Total staff count
   - Active staff
   - On leave today
   - TODO: Stats aggregation

### TODO Logic:
- [ ] Staff search across multiple fields
- [ ] Filter logic (store, role, status)
- [ ] Pagination
- [ ] Role-based staff visibility
- [ ] Multi-role display per staff

---

## Screen 2: Add/Edit Staff

**Screen Name**: Add/Edit Staff  
**Route**: `/hr/staff/new` or `/hr/staff/:staffId/edit`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Add new staff or edit existing staff details

### UI Sections:
1. **Header Section**
   - Page title: Add New Staff / Edit Staff
   - Employee ID (if editing)

2. **Personal Information Form**
   - Input: Full Name (mandatory)
   - Input: Mobile Number (mandatory, unique)
   - Input: Email
   - Input: Date of Birth
   - Dropdown: Gender
   - Input: Aadhar Number (optional, encrypted)
   - TODO: Field validation logic

3. **Contact Information Form**
   - Text area: Current Address
   - Text area: Permanent Address
   - Checkbox: Same as current address
   - Input: Emergency Contact Name
   - Input: Emergency Contact Number
   - TODO: Address validation

4. **Employment Information Form**
   - Dropdown: Store Assignment (mandatory)
   - Multi-select: Role(s) (mandatory, allows multiple)
   - Input: Joining Date
   - Dropdown: Employment Type (Full-time / Part-time / Contract)
   - Input: Probation Period (if applicable)
   - TODO: Role selection logic
   - TODO: Store assignment validation

5. **Compensation Form**
   - Input: Basic Salary
   - Input: HRA
   - Input: Other Allowances
   - Gross Salary (calculated, read-only)
   - TODO: Salary calculation logic
   - TODO: Role-based salary visibility (Store Manager cannot see HQ salaries)

6. **Bank Details Form**
   - Input: Bank Name
   - Input: Account Number
   - Input: IFSC Code
   - Input: Account Holder Name
   - TODO: Bank details validation

7. **Documents Upload Panel**
   - Upload: Resume
   - Upload: Aadhar Card
   - Upload: PAN Card
   - Upload: Joining Documents
   - TODO: Document upload logic

8. **Actions Panel**
   - Button: Save Staff
   - Button: Save & Add Another
   - Button: Cancel
   - TODO: Staff creation/update logic

### TODO Logic:
- [ ] Form validation (mandatory fields, unique mobile)
- [ ] Employee ID auto-generation
- [ ] Multi-role assignment
- [ ] Store assignment validation
- [ ] Salary calculation
- [ ] Document upload and storage
- [ ] Role-based salary field visibility
- [ ] Audit trail for all staff changes

---

## Screen 3: Staff Details & Profile

**Screen Name**: Staff Profile  
**Route**: `/hr/staff/:staffId`  
**Role Access**: Store Manager, Admin, Superadmin, Self (read-only)  
**Purpose**: View complete staff profile

### UI Sections:
1. **Header Section**
   - Staff name
   - Employee ID
   - Status badge (Active/Inactive)
   - Button: Edit

2. **Personal Information Card**
   - Name, mobile, email, DOB, gender
   - Contact address
   - Emergency contact
   - TODO: Personal info display

3. **Employment Details Card**
   - Store
   - Role(s)
   - Joining date
   - Employment type
   - Probation status (if applicable)
   - TODO: Employment info display

4. **Compensation Card** (Role-based visibility)
   - Basic salary
   - Allowances
   - Gross salary
   - TODO: Salary visibility based on viewer role

5. **Attendance Summary Card**
   - Present days (current month)
   - Absent days
   - Late marks
   - Leaves taken
   - TODO: Attendance aggregation

6. **Leave Balance Card**
   - Casual leave balance
   - Sick leave balance
   - Earned leave balance
   - TODO: Leave balance calculation

7. **Documents Panel**
   - Uploaded documents list
   - Download buttons
   - TODO: Document fetch logic

8. **Performance Metrics Card** (Future integration)
   - Sales performance (if applicable)
   - Incentives earned
   - TODO: Performance integration

9. **Actions Panel**
   - Button: Edit Profile
   - Button: Mark Attendance
   - Button: Apply Leave
   - Button: View Attendance History
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Staff details fetch
- [ ] Role-based salary visibility
- [ ] Attendance aggregation
- [ ] Leave balance calculation
- [ ] Document access control
- [ ] Self-view restrictions (staff can view own profile)

---

## Screen 4: Attendance Marking

**Screen Name**: Mark Attendance  
**Route**: `/hr/attendance/mark`  
**Role Access**: All Staff (Self), Store Manager (for others)  
**Purpose**: Mark daily attendance

### UI Sections:
1. **Header Section**
   - Page title: Mark Attendance
   - Store name
   - Date & time

2. **Self Attendance Panel** (For staff marking own)
   - Staff name
   - Current status: Not Marked
   - Button: Mark Present
   - Button: Apply Leave
   - TODO: Self-attendance marking logic

3. **Store Attendance Panel** (For Store Manager)
   - Staff list table
   - Columns: Staff Name | Role | Status | Arrival Time | Actions
   - Action: Mark Present | Mark Absent | Mark Late
   - TODO: Bulk attendance marking logic

4. **Late Mark Form** (If marking late)
   - Input: Actual arrival time
   - Text area: Reason (optional)
   - TODO: Late mark logic with time capture

5. **Summary Card**
   - Present count
   - Absent count
   - Late count
   - On leave count
   - TODO: Daily attendance summary

### TODO Logic:
- [ ] Self-attendance marking (mobile-friendly)
- [ ] Manager-level bulk attendance marking
- [ ] Late mark capture with time
- [ ] Attendance validation (no duplicate marking)
- [ ] Real-time status updates
- [ ] Audit trail for attendance actions

---

## Screen 5: Attendance History & Reports

**Screen Name**: Attendance History  
**Route**: `/hr/attendance/history`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: View attendance history and generate reports

### UI Sections:
1. **Header Section**
   - Page title: Attendance History
   - Date range selector

2. **Search & Filters Panel**
   - Search bar: Staff Name / Employee ID
   - Filters: Store | Date Range | Status (Present/Absent/Late/On Leave)
   - TODO: Search and filter logic

3. **Attendance Table**
   - Columns: Date | Staff Name | Store | Status | Arrival Time | Departure Time | Late Marks | Remarks
   - TODO: Attendance records fetch logic
   - TODO: Pagination

4. **Attendance Summary Cards**
   - Total working days
   - Total present days
   - Total absent days
   - Total late marks
   - Attendance percentage
   - TODO: Summary calculations

5. **Actions Panel**
   - Button: Export to Excel
   - Button: Generate Report
   - TODO: Export logic

### TODO Logic:
- [ ] Attendance records fetch with date range
- [ ] Filter logic
- [ ] Summary calculations
- [ ] Export to Excel
- [ ] Role-based visibility (Store Manager sees own store only)

---

## Screen 6: Leave Application

**Screen Name**: Apply Leave  
**Route**: `/hr/leave/apply`  
**Role Access**: All Staff  
**Purpose**: Apply for leave

### UI Sections:
1. **Header Section**
   - Page title: Apply Leave
   - Staff name

2. **Leave Balance Card**
   - Casual leave balance
   - Sick leave balance
   - Earned leave balance
   - TODO: Leave balance fetch logic

3. **Leave Application Form**
   - Dropdown: Leave Type (Casual / Sick / Earned / LOP)
   - Date picker: From Date
   - Date picker: To Date
   - Calculated: Total Days (read-only)
   - Text area: Reason (mandatory)
   - Upload: Supporting Document (if sick leave)
   - TODO: Leave days calculation logic

4. **Actions Panel**
   - Button: Submit Application
   - Button: Cancel
   - TODO: Leave application submission logic

### TODO Logic:
- [ ] Leave balance fetch and validation
- [ ] Leave days calculation (including weekends/holidays logic)
- [ ] Leave type validation against balance
- [ ] Reason mandatory enforcement
- [ ] Document upload for sick leave
- [ ] Notification to approver
- [ ] Audit trail for leave applications

---

## Screen 7: Leave Approvals

**Screen Name**: Leave Approvals  
**Route**: `/hr/leave/approvals`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Approve or reject leave applications

### UI Sections:
1. **Header Section**
   - Page title: Leave Approvals
   - Pending count badge

2. **Pending Applications Table**
   - Columns: Application ID | Staff Name | Leave Type | From Date | To Date | Days | Reason | Actions
   - Action buttons: Approve | Reject | View Details
   - TODO: Pending approvals fetch logic

3. **Leave Details Modal/Panel**
   - Full application details
   - Staff leave history
   - Leave balance
   - Approval decision form
   - Input: Rejection reason (if rejecting)
   - TODO: Decision capture logic

4. **Approval History Table**
   - Columns: Date | Staff | Leave Type | Days | Decision | Approver
   - TODO: Approval history fetch logic

### TODO Logic:
- [ ] Pending approvals queue management
- [ ] Leave balance validation before approval
- [ ] Decision capture (approve/reject + reason)
- [ ] Real-time notification to applicant
- [ ] Leave balance deduction upon approval
- [ ] Audit trail for all approval actions

---

## Screen 8: Leave History & Balance

**Screen Name**: Leave Management  
**Route**: `/hr/leave/management`  
**Role Access**: All Staff (Self), Store Manager, Admin, Superadmin  
**Purpose**: View leave history and balance

### UI Sections:
1. **Header Section**
   - Page title: Leave Management
   - Staff name (if self-view)

2. **Leave Balance Cards**
   - Casual Leave: Balance / Total
   - Sick Leave: Balance / Total
   - Earned Leave: Balance / Total
   - TODO: Leave balance calculation

3. **Leave History Table**
   - Columns: Application Date | Leave Type | From Date | To Date | Days | Status | Approver
   - TODO: Leave history fetch logic

4. **Actions Panel**
   - Button: Apply New Leave
   - TODO: Navigation hook

### TODO Logic:
- [ ] Leave balance calculation (opening + accrued - used)
- [ ] Leave history fetch
- [ ] Self-view vs manager view differentiation
- [ ] Role-based access control

---

## Screen 9: HR Dashboard

**Screen Name**: HR Dashboard  
**Route**: `/hr/dashboard`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: HR overview and quick actions

### UI Sections:
1. **Header Section**
   - Page title: HR Dashboard
   - Date selector

2. **Staff Summary Cards**
   - Total staff
   - Active staff
   - On leave today
   - Pending leave approvals
   - TODO: Staff aggregation logic

3. **Today's Attendance Card**
   - Present count
   - Absent count
   - Late marks
   - Not marked count
   - TODO: Daily attendance summary

4. **Pending Actions Card**
   - Pending leave approvals count
   - Pending attendance regularization count
   - TODO: Action queue management

5. **Recent Activity Table**
   - Columns: Date | Action | Staff | Details
   - TODO: Activity log fetch logic

6. **Quick Actions Panel**
   - Button: Mark Attendance
   - Button: View Leave Approvals
   - Button: Add New Staff
   - Button: Generate Reports
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Staff aggregation by store/enterprise
- [ ] Daily attendance summary
- [ ] Pending actions queue
- [ ] Recent activity log
- [ ] Real-time updates

---

## Screen 10: HR Reports

**Screen Name**: HR Reports  
**Route**: `/hr/reports`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Generate HR and attendance reports

### UI Sections:
1. **Header Section**
   - Page title: HR Reports
   - Date range selector

2. **Report Type Selection Panel**
   - Radio: Attendance Summary
   - Radio: Leave Summary
   - Radio: Staff Performance (future)
   - Radio: Late Marks Report
   - Radio: Staff Turnover
   - TODO: Report type selection logic

3. **Filters Panel**
   - Date range
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

## Screen 11: Shift Management

**Screen Name**: Shift Management  
**Route**: `/hr/shifts`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Manage staff shifts and schedules

### UI Sections:
1. **Header Section**
   - Page title: Shift Management
   - Week/Month view toggle

2. **Shift Calendar View**
   - Calendar with staff shift assignments
   - TODO: Calendar rendering logic

3. **Shift Assignment Form**
   - Date selector
   - Staff multi-select
   - Shift time (morning/evening/full day)
   - TODO: Shift assignment logic

4. **Staff Shift Table**
   - Columns: Date | Staff Name | Shift | Status
   - TODO: Shift listing logic

5. **Actions Panel**
   - Button: Assign Shifts
   - Button: View Shift History
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Shift calendar integration
- [ ] Shift assignment and management
- [ ] Shift conflict detection
- [ ] Audit trail for shift changes

---

## Screen 12: Staff Performance Tracking (Future Integration)

**Screen Name**: Staff Performance  
**Route**: `/hr/performance`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Track staff performance metrics

### UI Sections:
1. **Header Section**
   - Page title: Staff Performance
   - Date range selector

2. **Performance Metrics Cards** (Placeholder)
   - Sales performance (integration with POS)
   - Customer satisfaction (future)
   - Task completion rate (integration with Tasks module)
   - TODO: Performance metrics integration

3. **Staff Performance Table**
   - Columns: Staff Name | Sales | Customer Ratings | Tasks Completed | Incentives | Actions
   - TODO: Performance data fetch logic

4. **Actions Panel**
   - Button: View Details
   - Button: Generate Report
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Integration with POS for sales metrics
- [ ] Integration with Tasks module
- [ ] Integration with Payroll/Incentives
- [ ] Performance report generation

---

## Navigation Structure

### HR Module Navigation (TODO):
- [ ] Staff → View staff directory, add staff
- [ ] All Staff → Mark own attendance, apply leave, view own profile
- [ ] Store Manager → All HR screens for own store
- [ ] Admin/Superadmin → All HR screens across stores

---

## Global HR Rules (TODO):
- [ ] Attendance must be marked daily (no backdating without approval)
- [ ] Leave applications require approval before balance deduction
- [ ] Late marks tracked with timestamp
- [ ] Salary visibility role-based
- [ ] No deletion of attendance/leave records, only corrections with audit
- [ ] Multi-role assignment allowed per staff
- [ ] Audit trail for all HR actions

---

**END OF HR & ATTENDANCE SCREENS**
