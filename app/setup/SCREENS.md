# Setup & Configuration Module — Screen Skeletons

**Module**: Setup / Configuration  
**Purpose**: System configuration, stores, roles, categories, integrations, and settings  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: Setup Dashboard

**Screen Name**: Setup Dashboard  
**Route**: `/setup/dashboard`  
**Role Access**: Admin, Superadmin  
**Purpose**: Overview of system configuration status

### UI Sections:
1. **Header Section**
   - Page title: System Setup
   - System version
   - Last configuration change date

2. **Configuration Status Cards**
   - Stores configured: Count
   - Users configured: Count
   - Roles configured: Count
   - Integrations active: Count
   - TODO: Configuration status aggregation

3. **Recent Changes Panel**
   - Recent configuration changes log
   - TODO: Change log display

4. **Quick Setup Links Panel**
   - Button: Manage Stores
   - Button: Manage Roles
   - Button: Manage Users
   - Button: Manage Categories
   - Button: System Settings
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Configuration status aggregation
- [ ] Recent changes tracking
- [ ] Quick access navigation

---

## Screen 2: Store Management

**Screen Name**: Store Management  
**Route**: `/setup/stores`  
**Role Access**: Admin, Superadmin  
**Purpose**: Configure and manage retail stores

### UI Sections:
1. **Header Section**
   - Page title: Stores
   - Button: Add New Store

2. **Stores Table**
   - Columns: Store Code | Store Name | Location | Type | Status | Manager | Actions
   - Action buttons: Edit | Activate/Deactivate | View Details
   - TODO: Store listing

3. **Store Details Form** (Add/Edit)
   - Input: Store Code (mandatory, unique)
   - Input: Store Name (mandatory)
   - Text area: Address
   - Input: City
   - Input: State
   - Input: Pincode
   - Input: Contact Number
   - Input: Email
   - Dropdown: Store Type (Retail/Flagship/Warehouse)
   - Dropdown: Store Manager (from users)
   - Dropdown: Area (for area manager assignment)
   - Checkbox: Active status
   - TODO: Form validation and submission

4. **Store Configuration Panel** (Advanced)
   - Input: Tax jurisdiction (for GST)
   - Checkbox: Enable POS
   - Checkbox: Enable Clinical
   - Checkbox: Enable Marketplace fulfillment
   - TODO: Store-specific feature toggles

5. **Actions Panel**
   - Button: Save Store
   - Button: Cancel
   - TODO: Store creation/update logic

### TODO Logic:
- [ ] Store code uniqueness validation
- [ ] Store configuration management
- [ ] Manager assignment
- [ ] Area assignment for area managers
- [ ] Feature toggle management per store
- [ ] Audit trail for store changes

---

## Screen 3: User Management

**Screen Name**: User Management  
**Route**: `/setup/users`  
**Role Access**: Admin, Superadmin  
**Purpose**: Manage user accounts and access

### UI Sections:
1. **Header Section**
   - Page title: Users
   - Button: Add New User

2. **Search & Filters Panel**
   - Search bar: Name / Email / Mobile
   - Filters: Role | Store | Status (Active/Inactive)
   - TODO: Search and filter logic

3. **Users Table**
   - Columns: User ID | Name | Email | Mobile | Role(s) | Store(s) | Status | Actions
   - Action buttons: Edit | Activate/Deactivate | Reset Password
   - TODO: User listing
   - TODO: Pagination

4. **User Form** (Add/Edit)
   - Input: Full Name (mandatory)
   - Input: Email (mandatory, unique)
   - Input: Mobile Number (mandatory, unique)
   - Multi-select: Roles (mandatory, allows multiple)
   - Multi-select: Store Access (mandatory for store-level roles)
   - Input: Password (mandatory for new user)
   - Checkbox: Active status
   - TODO: Form validation

5. **Role Assignment Panel**
   - Selected roles display
   - Role-specific settings (if any)
   - TODO: Multi-role assignment logic

6. **Actions Panel**
   - Button: Save User
   - Button: Send Credentials via Email
   - Button: Cancel
   - TODO: User creation/update logic

### TODO Logic:
- [ ] User creation with encrypted password
- [ ] Email and mobile uniqueness validation
- [ ] Multi-role assignment
- [ ] Store access assignment
- [ ] Password reset functionality
- [ ] Credential email dispatch
- [ ] Audit trail for user changes

---

## Screen 4: Role Management

**Screen Name**: Role Management  
**Route**: `/setup/roles`  
**Role Access**: Superadmin ONLY  
**Purpose**: Define and configure system roles and permissions

### UI Sections:
1. **Header Section**
   - Page title: Roles & Permissions
   - Warning: "Changes to roles affect user access immediately"
   - Button: Create Custom Role

2. **Roles Table**
   - Columns: Role Name | Type (System/Custom) | Users Count | Status | Actions
   - Action buttons: Edit Permissions | View Users | Activate/Deactivate
   - TODO: Role listing

3. **Role Configuration Form** (Add/Edit)
   - Input: Role Name (mandatory)
   - Dropdown: Role Type (System roles read-only)
   - Text area: Description
   - Checkbox: Active status
   - TODO: Form validation

4. **Permissions Matrix Panel**
   - Module-wise permission grid
   - Columns: Module | View | Create | Edit | Delete | Approve | Admin
   - Rows: POS, Inventory, Clinical, HR, Finance, Tasks, Expenses, Marketplace, AI, Setup
   - Checkboxes for each permission
   - TODO: Permission assignment logic

5. **Special Permissions Panel**
   - Discount override limit (%)
   - Price change approval
   - Financial period unlock
   - Report access level
   - TODO: Special permission configuration

6. **Actions Panel**
   - Button: Save Role
   - Button: Preview User Impact (shows how many users affected)
   - Button: Cancel
   - TODO: Role creation/update logic

### TODO Logic:
- [ ] Role creation and management
- [ ] Permission matrix management
- [ ] System roles protection (cannot be deleted)
- [ ] Custom role creation
- [ ] User impact preview before changes
- [ ] Immediate permission application
- [ ] Audit trail for role changes

---

## Screen 5: Category Management

**Screen Name**: Category Management  
**Route**: `/setup/categories`  
**Role Access**: Admin, Superadmin  
**Purpose**: Manage product categories and attributes

### UI Sections:
1. **Header Section**
   - Page title: Product Categories
   - Button: Add Category

2. **Category Tree View**
   - Hierarchical category structure
   - Parent categories with expandable sub-categories
   - TODO: Tree rendering

3. **Categories Table**
   - Columns: Category Name | Parent Category | Attributes Count | Products Count | Status | Actions
   - Action buttons: Edit | Add Sub-category | Manage Attributes | Activate/Deactivate
   - TODO: Category listing

4. **Category Form** (Add/Edit)
   - Input: Category Name (mandatory)
   - Dropdown: Parent Category (optional, for sub-categories)
   - Text area: Description
   - Checkbox: Active status
   - TODO: Form validation

5. **Category Attributes Panel**
   - Dynamic attributes for this category
   - For example, Frames: Size, Color, Material, Shape
   - Button: Add Attribute
   - For each attribute:
     - Input: Attribute Name
     - Dropdown: Attribute Type (Text/Number/Dropdown/Multi-select)
     - Checkbox: Mandatory
   - TODO: Attribute management

6. **Actions Panel**
   - Button: Save Category
   - Button: Cancel
   - TODO: Category creation/update logic

### TODO Logic:
- [ ] Category hierarchy management
- [ ] Category-specific attributes configuration
- [ ] Attribute type validation
- [ ] Product count tracking per category
- [ ] Audit trail for category changes

---

## Screen 6: System Settings

**Screen Name**: System Settings  
**Route**: `/setup/settings`  
**Role Access**: Superadmin ONLY  
**Purpose**: Global system configuration

### UI Sections:
1. **Header Section**
   - Page title: System Settings
   - Warning: "Changes here affect the entire system"

2. **General Settings Panel**
   - Input: Company Name
   - Input: Company GST Number
   - Upload: Company Logo
   - Input: Support Email
   - Input: Support Phone
   - TODO: General settings management

3. **Business Rules Panel**
   - Input: MRP vs Offer Price enforcement (dropdown: Block/Warn/Allow)
   - Input: Prescription validity (default days)
   - Input: Low stock threshold (%)
   - Input: High-value expense threshold (for approval)
   - TODO: Business rules configuration

4. **Financial Settings Panel**
   - Dropdown: Financial Year Start Month
   - Dropdown: Default GST Rate (%)
   - Checkbox: Enable GST validation API
   - Input: Currency symbol
   - TODO: Financial configuration

5. **POS Settings Panel**
   - Checkbox: Allow partial payments
   - Checkbox: Allow credit sales
   - Input: Maximum discount % (without approval)
   - Checkbox: Barcode mandatory for POS
   - TODO: POS configuration

6. **Notification Settings Panel**
   - Checkbox: Enable email notifications
   - Checkbox: Enable SMS notifications
   - Input: SMTP settings (if email enabled)
   - Input: SMS gateway settings (if SMS enabled)
   - TODO: Notification configuration

7. **Backup & Maintenance Panel**
   - Last backup date
   - Button: Trigger Manual Backup
   - Checkbox: Auto-backup enabled
   - Dropdown: Backup frequency
   - TODO: Backup configuration

8. **Actions Panel**
   - Button: Save Settings
   - Button: Reset to Defaults (with confirmation)
   - TODO: Settings save logic

### TODO Logic:
- [ ] System-wide settings management
- [ ] Business rules configuration
- [ ] Financial year configuration
- [ ] POS rules configuration
- [ ] Notification gateway integration
- [ ] Backup and maintenance settings
- [ ] Audit trail for settings changes

---

## Screen 7: Integration Settings

**Screen Name**: Integration Settings  
**Route**: `/setup/integrations`  
**Role Access**: Admin, Superadmin  
**Purpose**: Configure third-party integrations

### UI Sections:
1. **Header Section**
   - Page title: Integrations

2. **Available Integrations Panel**
   - List of available integrations:
     - Marketplace (Shopify, Amazon, Flipkart)
     - Payment Gateways
     - SMS Gateway
     - Email SMTP
     - Accounting (Tally)
     - GST Validation API
   - Each with: Status (Connected/Not Connected) | Configure button
   - TODO: Integration status display

3. **Integration Configuration Forms** (Per integration, shown when clicking configure)
   - Integration-specific fields
   - API credentials
   - Configuration settings
   - Test connection button
   - TODO: Integration-specific configuration

4. **Marketplace Integration** (Detailed in Marketplace module)
   - Redirect to Marketplace Configuration

5. **Payment Gateway Configuration**
   - Gateway selection (Razorpay/Paytm/Stripe/etc)
   - API Key
   - API Secret
   - Merchant ID
   - Button: Test Connection
   - TODO: Payment gateway integration

6. **SMS Gateway Configuration**
   - Provider selection
   - API Key
   - Sender ID
   - Button: Send Test SMS
   - TODO: SMS gateway integration

7. **Email SMTP Configuration**
   - SMTP Host
   - SMTP Port
   - Username
   - Password
   - From Email
   - Button: Send Test Email
   - TODO: SMTP configuration

8. **Tally Integration Configuration**
   - Tally installation path
   - Company name in Tally
   - Sync settings
   - TODO: Tally integration

9. **Actions Panel**
   - Button: Save Configuration
   - Button: Test Connection
   - TODO: Integration save logic

### TODO Logic:
- [ ] Multi-integration management
- [ ] Credential encryption
- [ ] Connection testing per integration
- [ ] Integration status monitoring
- [ ] Audit trail for integration changes

---

## Screen 8: Audit Log (System-wide)

**Screen Name**: System Audit Log  
**Route**: `/setup/audit-log`  
**Role Access**: Admin, Superadmin  
**Purpose**: View comprehensive system audit trail

### UI Sections:
1. **Header Section**
   - Page title: System Audit Log
   - Date range selector

2. **Search & Filters Panel**
   - Search bar: User / Action / Entity
   - Filters: Date Range | Module | Action Type | User | Severity
   - TODO: Search and filter logic

3. **Audit Log Table**
   - Columns: Timestamp | User | Module | Action | Entity | Previous Value | New Value | IP Address | Status
   - TODO: Audit log listing
   - TODO: Pagination

4. **Export Panel**
   - Button: Export Audit Log (date range)
   - TODO: Export logic

### TODO Logic:
- [ ] Comprehensive audit logging from all modules
- [ ] Immutable audit trail
- [ ] Search and filter across logs
- [ ] Export functionality
- [ ] Role-based access to audit logs

---

## Screen 9: Database Backup & Restore

**Screen Name**: Backup & Restore  
**Route**: `/setup/backup`  
**Role Access**: Superadmin ONLY  
**Purpose**: Database backup and restore operations

### UI Sections:
1. **Header Section**
   - Page title: Backup & Restore
   - Warning: "Restore operations cannot be undone. Proceed with caution."

2. **Backup Status Card**
   - Last successful backup date
   - Backup size
   - Backup location
   - TODO: Backup status display

3. **Create Backup Panel**
   - Checkbox: Full backup (entire database)
   - Checkbox: Incremental backup (changes only)
   - Input: Backup name
   - Button: Create Backup Now
   - TODO: Backup creation logic

4. **Backup History Table**
   - Columns: Date | Type | Size | Status | Actions
   - Action buttons: Download | Restore | Delete
   - TODO: Backup history listing

5. **Restore Panel**
   - File upload: Select backup file
   - Warning message
   - Confirmation checkbox: "I understand this will overwrite current data"
   - Button: Restore Database
   - TODO: Restore logic

6. **Auto-Backup Settings**
   - Checkbox: Enable auto-backup
   - Dropdown: Frequency (Daily/Weekly)
   - Time picker: Backup time
   - Input: Retention period (days)
   - TODO: Auto-backup configuration

### TODO Logic:
- [ ] Full and incremental backup creation
- [ ] Backup history management
- [ ] Restore functionality with safeguards
- [ ] Auto-backup scheduling
- [ ] Backup retention management
- [ ] Audit trail for backup/restore operations

---

## Screen 10: System Health & Monitoring

**Screen Name**: System Health  
**Route**: `/setup/health`  
**Role Access**: Superadmin ONLY  
**Purpose**: Monitor system health and performance

### UI Sections:
1. **Header Section**
   - Page title: System Health
   - Real-time status indicator

2. **System Status Cards**
   - Database status: Online/Offline
   - API status: Responsive/Slow/Down
   - Storage usage: X% of Y GB
   - Active users: Count
   - TODO: System health monitoring

3. **Performance Metrics Panel**
   - Average response time
   - API call success rate
   - Database query performance
   - TODO: Performance metrics display

4. **Recent Errors Table**
   - Columns: Timestamp | Error Type | Message | Module | User | Actions
   - Action: View Details
   - TODO: Error log listing

5. **Storage Analysis Panel**
   - Database size
   - File storage size
   - Backup storage size
   - Chart: Storage growth trend
   - TODO: Storage analysis

6. **Actions Panel**
   - Button: Run Health Check
   - Button: Clear Cache
   - Button: View Detailed Logs
   - TODO: System maintenance actions

### TODO Logic:
- [ ] Real-time system health monitoring
- [ ] Performance metrics tracking
- [ ] Error logging and alerting
- [ ] Storage usage monitoring
- [ ] Maintenance actions (cache clear, health check)

---

## Navigation Structure

### Setup Module Navigation (TODO):
- [ ] Admin → Stores, Users, Categories, Integration Settings
- [ ] Superadmin → All Setup screens including Roles, System Settings, Backup, System Health
- [ ] Critical settings require Superadmin approval

---

## Global Setup Rules (TODO):
- [ ] System roles cannot be deleted (Superadmin, Admin, etc.)
- [ ] Role changes apply immediately to all users
- [ ] Configuration changes logged in audit trail
- [ ] Backup before major configuration changes (recommended)
- [ ] Integration credentials encrypted in storage
- [ ] No deletion of audit logs (immutable)
- [ ] System settings changes require Superadmin approval

---

**END OF SETUP & CONFIGURATION SCREENS**