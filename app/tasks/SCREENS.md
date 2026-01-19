# Tasks & SOPs Module — Screen Skeletons

**Module**: Tasks & SOPs  
**Purpose**: Task management, SOP tracking, and operational checklists  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: Tasks Dashboard

**Screen Name**: Tasks Dashboard  
**Route**: `/tasks/dashboard`  
**Role Access**: All roles  
**Purpose**: Overview of tasks assigned and pending

### UI Sections:
1. **Header Section**
   - Page title: Tasks Dashboard
   - User name
   - Date

2. **My Tasks Summary Cards**
   - Total assigned tasks
   - Pending tasks
   - Completed today
   - Overdue tasks
   - TODO: Task aggregation logic

3. **Priority Tasks Card**
   - High priority tasks list
   - Priority color coding (Red/Orange/Yellow/Green)
   - TODO: Priority-based filtering

4. **Today's Tasks Table**
   - Columns: Task Name | Priority | Due Time | Status | Actions
   - Action buttons: Mark Complete | View Details
   - TODO: Task listing logic

5. **Overdue Tasks Alert**
   - Overdue tasks count
   - Escalation indicator
   - TODO: Overdue tracking logic

6. **Quick Actions Panel**
   - Button: Create Task
   - Button: View All Tasks
   - Button: View SOPs
   - TODO: Navigation hooks

### TODO Logic:
- [ ] User-specific task aggregation
- [ ] Priority-based color coding (system-enforced, non-customizable)
- [ ] Overdue detection and alerts
- [ ] Real-time task status updates

---

## Screen 2: All Tasks Listing

**Screen Name**: All Tasks  
**Route**: `/tasks/all`  
**Role Access**: All roles  
**Purpose**: View and manage all tasks

### UI Sections:
1. **Header Section**
   - Page title: All Tasks
   - Button: Create Task (role-based)

2. **Search & Filters Panel**
   - Search bar: Task name / Description
   - Filters: Priority | Status | Assigned To | Due Date | Store
   - TODO: Search and filter logic

3. **Tasks Table**
   - Columns: Task ID | Task Name | Priority | Assigned To | Due Date | Status | Created By | Actions
   - Action buttons: View Details | Edit | Complete | Escalate
   - TODO: Task listing logic
   - TODO: Pagination

4. **Status Tabs**
   - Tabs: All | Pending | In Progress | Completed | Overdue
   - TODO: Tab-based filtering

5. **Bulk Actions Panel**
   - Select multiple tasks
   - Bulk actions: Assign | Change Priority | Mark Complete
   - TODO: Bulk operations logic

### TODO Logic:
- [ ] Task search and filter
- [ ] Role-based task visibility
- [ ] Status-based filtering
- [ ] Bulk operations
- [ ] Pagination

---

## Screen 3: Create/Edit Task

**Screen Name**: Create Task  
**Route**: `/tasks/new` or `/tasks/:taskId/edit`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Create or edit tasks

### UI Sections:
1. **Header Section**
   - Page title: Create Task / Edit Task

2. **Task Information Form**
   - Input: Task Name (mandatory)
   - Text area: Description
   - Dropdown: Priority (High/Medium/Low)
   - Dropdown: Task Type (Operational/Maintenance/Follow-up/Other)
   - TODO: Form validation

3. **Assignment Form**
   - Dropdown: Assign to (Role or specific person)
   - Dropdown: Store (if applicable)
   - TODO: Assignment logic

4. **Schedule Form**
   - Date picker: Due Date
   - Time picker: Due Time
   - Checkbox: Recurring task
   - If recurring: Input recurrence pattern
   - TODO: Schedule validation

5. **Attachments Panel**
   - Upload: Related documents/images
   - TODO: File upload logic

6. **Escalation Settings**
   - Checkbox: Auto-escalate if overdue
   - Dropdown: Escalate to (Role/Person)
   - Input: Escalation delay (hours)
   - TODO: Escalation configuration

7. **Actions Panel**
   - Button: Create Task / Save Changes
   - Button: Cancel
   - TODO: Task creation/update logic

### TODO Logic:
- [ ] Form validation
- [ ] Task assignment logic (role-based or individual)
- [ ] Recurring task scheduling
- [ ] Escalation configuration
- [ ] File attachment handling
- [ ] Notification to assignee
- [ ] Audit trail

---

## Screen 4: Task Details

**Screen Name**: Task Details  
**Route**: `/tasks/:taskId`  
**Role Access**: All roles  
**Purpose**: View complete task information and take actions

### UI Sections:
1. **Header Section**
   - Task name
   - Priority badge
   - Status badge

2. **Task Information Card**
   - Description
   - Priority
   - Task type
   - Created by
   - Created date
   - TODO: Task details fetch

3. **Assignment Details Card**
   - Assigned to
   - Store
   - Due date & time
   - TODO: Assignment info display

4. **Status Timeline**
   - Created
   - Assigned
   - In Progress (if updated)
   - Completed (if done)
   - TODO: Status tracking timeline

5. **Attachments Panel**
   - Attached files list
   - Download buttons
   - TODO: File access logic

6. **Comments/Notes Section**
   - Comment thread
   - Input: Add comment
   - TODO: Comment system integration

7. **Actions Panel**
   - Button: Mark In Progress
   - Button: Mark Complete
   - Button: Escalate
   - Button: Reassign (if authorized)
   - Button: Edit (if authorized)
   - TODO: Action logic with role validation

### TODO Logic:
- [ ] Task details fetch
- [ ] Status update workflow
- [ ] Comment/note system
- [ ] File attachments access
- [ ] Role-based action buttons
- [ ] Real-time notifications
- [ ] Audit trail

---

## Screen 5: SOP Library

**Screen Name**: SOP Library  
**Route**: `/tasks/sops`  
**Role Access**: All roles  
**Purpose**: View and follow Standard Operating Procedures

### UI Sections:
1. **Header Section**
   - Page title: SOP Library
   - Button: Create SOP (Admin/Superadmin only)

2. **SOP Categories Panel**
   - Category list (tree structure)
   - Categories: Opening Procedures | Closing Procedures | Sales | Inventory | Clinical | HR | Finance | Emergency
   - TODO: Category navigation

3. **Search & Filters Panel**
   - Search bar: SOP name / keyword
   - Filters: Category | Store Type | Role
   - TODO: Search logic

4. **SOPs Table**
   - Columns: SOP Name | Category | Version | Last Updated | Actions
   - Action buttons: View | Start Checklist | Download
   - TODO: SOP listing logic

5. **Recently Viewed Panel**
   - Recently accessed SOPs
   - TODO: User activity tracking

### TODO Logic:
- [ ] SOP categorization
- [ ] Search and filter
- [ ] Version control for SOPs
- [ ] Access tracking
- [ ] Download functionality

---

## Screen 6: SOP Details & Checklist

**Screen Name**: SOP Details  
**Route**: `/tasks/sops/:sopId`  
**Role Access**: All roles  
**Purpose**: View SOP and execute checklist

### UI Sections:
1. **Header Section**
   - SOP name
   - Version
   - Last updated date

2. **SOP Information Card**
   - Category
   - Applicable roles
   - Applicable stores
   - Description
   - TODO: SOP details display

3. **SOP Checklist Panel**
   - Step-by-step checklist
   - Each step: Checkbox | Step description | Notes field
   - TODO: Checklist rendering

4. **Execution Form** (When starting checklist)
   - Start timestamp (auto-captured)
   - Step completion tracking
   - Input: Notes for each step (if required)
   - TODO: Checklist execution logic

5. **Attachments Panel**
   - Reference documents
   - Images/videos (if applicable)
   - TODO: Media access

6. **Actions Panel**
   - Button: Start Checklist
   - Button: Mark Step Complete (during execution)
   - Button: Complete SOP Execution
   - Button: Download SOP
   - TODO: Execution workflow

### TODO Logic:
- [ ] SOP details fetch
- [ ] Checklist execution tracking
- [ ] Step-by-step completion
- [ ] Timestamp capture for each step
- [ ] Notes capture
- [ ] Completion validation (all steps done)
- [ ] Audit trail for SOP execution

---

## Screen 7: Create/Edit SOP

**Screen Name**: Create SOP  
**Route**: `/tasks/sops/new` or `/tasks/sops/:sopId/edit`  
**Role Access**: Admin, Superadmin  
**Purpose**: Create or edit SOPs

### UI Sections:
1. **Header Section**
   - Page title: Create SOP / Edit SOP

2. **SOP Information Form**
   - Input: SOP Name (mandatory)
   - Dropdown: Category (mandatory)
   - Text area: Description
   - Multi-select: Applicable Roles
   - Multi-select: Applicable Stores
   - Input: Version number
   - TODO: Form validation

3. **Checklist Builder**
   - Dynamic step addition
   - For each step:
     - Input: Step description
     - Checkbox: Notes required
     - Checkbox: Critical step (affects completion)
   - Button: Add Step
   - Button: Remove Step
   - Drag-and-drop: Reorder steps
   - TODO: Checklist builder logic

4. **Attachments Panel**
   - Upload: Reference documents
   - Upload: Images/videos
   - TODO: File upload logic

5. **Actions Panel**
   - Button: Save as Draft
   - Button: Publish SOP
   - Button: Cancel
   - TODO: SOP creation/update logic

### TODO Logic:
- [ ] Form validation
- [ ] Dynamic checklist builder
- [ ] Step reordering
- [ ] File attachment handling
- [ ] Version control
- [ ] Publish workflow (makes SOP active)
- [ ] Audit trail

---

## Screen 8: Task Escalations

**Screen Name**: Task Escalations  
**Route**: `/tasks/escalations`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: View and resolve escalated tasks

### UI Sections:
1. **Header Section**
   - Page title: Task Escalations
   - Escalation count badge

2. **Escalated Tasks Table**
   - Columns: Task ID | Task Name | Priority | Original Assignee | Escalated Date | Overdue By | Reason | Actions
   - Action buttons: Resolve | Reassign | View Details
   - TODO: Escalated tasks listing

3. **Escalation Resolution Form** (Modal/Panel)
   - Task details
   - Input: Resolution notes
   - Dropdown: Action (Reassign / Extend Deadline / Mark Complete)
   - TODO: Resolution workflow

4. **Escalation History Table**
   - Past escalations (resolved)
   - Columns: Task | Escalated Date | Resolved Date | Resolved By | Action Taken
   - TODO: Escalation history fetch

### TODO Logic:
- [ ] Auto-escalation based on task configuration
- [ ] Escalation queue management
- [ ] Resolution workflow
- [ ] Reassignment logic
- [ ] Notification to original assignee
- [ ] Audit trail for escalations

---

## Screen 9: Task Reports

**Screen Name**: Task Reports  
**Route**: `/tasks/reports`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Generate task completion and performance reports

### UI Sections:
1. **Header Section**
   - Page title: Task Reports
   - Date range selector

2. **Report Type Selection Panel**
   - Radio: Task Completion Rate
   - Radio: Staff Performance (tasks completed)
   - Radio: Overdue Tasks Analysis
   - Radio: SOP Compliance
   - TODO: Report type selection

3. **Filters Panel**
   - Date range
   - Store
   - Staff/Role
   - Priority
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
- [ ] Task completion rate calculations
- [ ] Staff performance aggregation
- [ ] Overdue analysis
- [ ] SOP compliance tracking
- [ ] Export functionality
- [ ] Role-based report access

---

## Screen 10: Recurring Tasks Management

**Screen Name**: Recurring Tasks  
**Route**: `/tasks/recurring`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Manage recurring task templates

### UI Sections:
1. **Header Section**
   - Page title: Recurring Tasks
   - Button: Create Recurring Task

2. **Recurring Tasks Table**
   - Columns: Task Name | Recurrence Pattern | Assigned To | Priority | Status (Active/Paused) | Actions
   - Action buttons: Edit | Pause/Resume | View Generated Tasks
   - TODO: Recurring tasks listing

3. **Recurrence Configuration Form**
   - Task details (same as regular task)
   - Recurrence pattern: Daily / Weekly / Monthly / Custom
   - Day/Date selection (based on pattern)
   - Start date
   - End date (optional)
   - TODO: Recurrence configuration logic

4. **Generated Tasks Panel**
   - Tasks auto-generated from this recurring template
   - TODO: Generated tasks listing

### TODO Logic:
- [ ] Recurrence pattern configuration
- [ ] Auto-generation of tasks based on pattern
- [ ] Pause/resume recurring tasks
- [ ] Generated tasks tracking
- [ ] Audit trail

---

## Navigation Structure

### Tasks Module Navigation (TODO):
- [ ] All roles → View tasks dashboard, assigned tasks
- [ ] Store Manager → Create tasks, escalations, reports
- [ ] Admin/Superadmin → All task screens + SOP management
- [ ] Task notifications → real-time updates

---

## Global Tasks Rules (TODO):
- [ ] Priority color coding non-customizable (system-enforced urgency)
- [ ] Auto-escalation based on task configuration
- [ ] All task actions require audit trail
- [ ] SOP execution tracked with timestamps
- [ ] Recurring tasks auto-generated based on schedule
- [ ] No deletion of tasks, only marking as cancelled with reason
- [ ] Role-based task visibility and assignment

---

**END OF TASKS & SOPS SCREENS**