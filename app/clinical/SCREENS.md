# Clinical / Optometry Module — Screen Skeletons

**Module**: Clinical / Optometry  
**Purpose**: Eye tests, prescription management, and patient clinical data  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: Patient Registration

**Screen Name**: Patient Registration  
**Route**: `/clinical/patients/new`  
**Role Access**: Optometrist, Sales Staff, Store Manager  
**Purpose**: Register new patients and capture demographics

### UI Sections:
1. **Header Section**
   - Page title: New Patient Registration
   - Store name

2. **Basic Information Form**
   - Input: Full Name (mandatory)
   - Input: Mobile Number (mandatory, unique)
   - Input: Email (optional)
   - Input: Date of Birth
   - Dropdown: Gender
   - TODO: Field validation logic

3. **Contact Information Form**
   - Text area: Address
   - Input: City
   - Input: Pincode
   - TODO: Address validation

4. **Medical History Form** (Optional)
   - Checkbox: Diabetes
   - Checkbox: Hypertension
   - Text area: Other medical conditions
   - Text area: Allergies
   - TODO: Medical history capture

5. **Family Linking Panel** (Optional)
   - Search existing patients
   - Link as family member
   - TODO: Family linkage logic

6. **Actions Panel**
   - Button: Save Patient
   - Button: Save & Create Eye Test
   - Button: Cancel
   - TODO: Patient creation logic

### TODO Logic:
- [ ] Mobile number uniqueness check
- [ ] Patient ID generation
- [ ] Family linking logic
- [ ] Duplicate patient detection
- [ ] Audit trail for patient creation

---

## Screen 2: Patient Search & Listing

**Screen Name**: Patient Search  
**Route**: `/clinical/patients`  
**Role Access**: Optometrist, Sales Staff, Store Manager  
**Purpose**: Search and view patient records

### UI Sections:
1. **Header Section**
   - Page title: Patients
   - Button: New Patient

2. **Search & Filters Panel**
   - Search bar: Name / Mobile / Patient ID
   - Filters: Registration Date Range | Store
   - TODO: Search logic

3. **Patients Table**
   - Columns: Patient ID | Name | Mobile | Last Visit | Total Prescriptions | Actions
   - Action buttons: View Details | Create Eye Test
   - TODO: Patient listing logic
   - TODO: Pagination

### TODO Logic:
- [ ] Patient search across multiple fields
- [ ] Filter logic
- [ ] Pagination
- [ ] Role-based patient visibility (store-scoped)

---

## Screen 3: Patient Details & History

**Screen Name**: Patient Details  
**Route**: `/clinical/patients/:patientId`  
**Role Access**: Optometrist, Sales Staff, Store Manager  
**Purpose**: View complete patient profile and history

### UI Sections:
1. **Header Section**
   - Patient name
   - Patient ID
   - Registration date

2. **Patient Information Card**
   - Personal details (read-only)
   - Contact information
   - Medical history
   - Button: Edit Patient
   - TODO: Patient details fetch logic

3. **Family Members Panel** (If linked)
   - Family members list
   - TODO: Family linkage display

4. **Prescription History Table**
   - Columns: Date | Optometrist | Right Eye | Left Eye | Validity | Status | Actions
   - Action buttons: View Prescription | Use in POS
   - TODO: Prescription history fetch logic

5. **Order History Table**
   - Columns: Order ID | Date | Items | Amount | Status
   - TODO: Order history fetch logic

6. **Clinical Notes Timeline**
   - Chronological clinical notes
   - TODO: Clinical notes display

7. **Actions Panel**
   - Button: Create Eye Test
   - Button: View All Prescriptions
   - Button: Edit Patient
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Patient details fetch
- [ ] Prescription history integration
- [ ] Order history integration
- [ ] Family linkage display
- [ ] Clinical notes timeline

---

## Screen 4: Eye Test / Clinical Examination

**Screen Name**: Eye Test  
**Route**: `/clinical/eye-test/new`  
**Role Access**: Optometrist  
**Purpose**: Conduct eye examination and capture clinical data

### UI Sections:
1. **Header Section**
   - Page title: Eye Test
   - Patient name (from selection)
   - Date & time

2. **Patient Selection Panel**
   - Search bar: Patient name / mobile / ID
   - Button: New Patient (quick registration)
   - Selected patient card
   - Previous prescription reference (if exists)
   - TODO: Patient search and selection logic

3. **Visual Acuity Form**
   - Right Eye: Input distant vision, near vision
   - Left Eye: Input distant vision, near vision
   - TODO: Visual acuity data capture

4. **Refraction / Prescription Form**
   - **Right Eye:**
     - Input: Sphere (SPH)
     - Input: Cylinder (CYL)
     - Input: Axis (with validation 0-180)
     - Input: Addition (ADD)
   - **Left Eye:**
     - Input: Sphere (SPH)
     - Input: Cylinder (CYL)
     - Input: Axis (with validation 0-180)
     - Input: Addition (ADD)
   - TODO: Axis validation logic (0-180 degrees)
   - TODO: Prescription value validation

5. **Pupillary Distance (PD) Form**
   - Input: PD (single value or dual)
   - TODO: PD capture

6. **Clinical Findings Form**
   - Text area: Observations
   - Text area: Recommendations
   - Checkbox: Refer to ophthalmologist (if needed)
   - TODO: Clinical notes capture

7. **Prescription Settings Form**
   - Dropdown: Prescription Type (Distance / Reading / Bifocal / Progressive)
   - Dropdown: Prescription Validity (3 months / 6 months / 1 year / Custom)
   - Input: Custom validity date (if selected)
   - TODO: Validity calculation logic

8. **Actions Panel**
   - Button: Save as Draft
   - Button: Issue Prescription
   - Button: Cancel
   - TODO: Eye test save logic
   - TODO: Prescription generation

### TODO Logic:
- [ ] Patient selection and context loading
- [ ] Axis validation (0-180 degrees)
- [ ] Prescription value validation
- [ ] Prescription validity calculation (optometrist-controlled)
- [ ] Draft save functionality
- [ ] Prescription generation and ID creation
- [ ] Audit trail for all clinical data
- [ ] Clinical data immutability after prescription issuance

---

## Screen 5: Prescription Details & Edit

**Screen Name**: Prescription Details  
**Route**: `/clinical/prescriptions/:prescriptionId`  
**Role Access**: Optometrist  
**Purpose**: View and edit prescription (with restrictions)

### UI Sections:
1. **Header Section**
   - Prescription ID
   - Patient name
   - Issue date
   - Validity indicator (active/expired)

2. **Prescription Information Card**
   - Right Eye: SPH, CYL, Axis, ADD
   - Left Eye: SPH, CYL, Axis, ADD
   - PD
   - Prescription type
   - Validity date
   - Optometrist name
   - TODO: Prescription details fetch logic

3. **Clinical Findings Card**
   - Visual acuity
   - Observations
   - Recommendations
   - Referrals (if any)
   - TODO: Clinical notes display

4. **Prescription Usage History**
   - Orders linked to this prescription
   - TODO: Usage tracking

5. **Version History Panel** (If edited)
   - Previous versions list
   - Columns: Date | Changed By | Changes | Reason
   - TODO: Version history display

6. **Actions Panel**
   - Button: Edit Prescription (if allowed)
   - Button: Renew Prescription
   - Button: Print Prescription
   - Button: Use in POS
   - TODO: Edit restrictions based on usage
   - TODO: Print integration

### TODO Logic:
- [ ] Prescription details fetch
- [ ] Edit restrictions (no edit after invoice)
- [ ] Version history tracking
- [ ] Prescription validity check
- [ ] Usage tracking (linked orders)
- [ ] Print integration
- [ ] Audit trail for all prescription actions

---

## Screen 6: Prescription Renewal

**Screen Name**: Prescription Renewal  
**Route**: `/clinical/prescriptions/:prescriptionId/renew`  
**Role Access**: Optometrist  
**Purpose**: Renew existing prescription with minor adjustments

### UI Sections:
1. **Header Section**
   - Page title: Renew Prescription
   - Patient name
   - Previous prescription reference

2. **Previous Prescription Card (Read-only)**
   - Previous prescription details
   - Issue date
   - Expiry date

3. **New Prescription Form**
   - Pre-filled with previous values
   - Editable fields: SPH, CYL, Axis, ADD (both eyes)
   - Editable: PD
   - Editable: Prescription type
   - Dropdown: New validity period
   - Text area: Reason for renewal
   - TODO: Pre-fill logic from previous prescription

4. **Actions Panel**
   - Button: Issue Renewed Prescription
   - Button: Cancel
   - TODO: Renewal logic with version linking

### TODO Logic:
- [ ] Pre-fill from previous prescription
- [ ] Renewal validation
- [ ] Version linking between old and new
- [ ] Prescription validity calculation
- [ ] Audit trail for renewal

---

## Screen 7: Prescription Search & Listing

**Screen Name**: Prescription Search  
**Route**: `/clinical/prescriptions`  
**Role Access**: Optometrist, Sales Staff, Store Manager  
**Purpose**: Search and view all prescriptions

### UI Sections:
1. **Header Section**
   - Page title: Prescriptions
   - Button: New Eye Test

2. **Search & Filters Panel**
   - Search bar: Patient Name / Mobile / Prescription ID
   - Filters: Date Range | Validity Status (Active/Expired) | Optometrist | Store
   - TODO: Search and filter logic

3. **Prescriptions Table**
   - Columns: Prescription ID | Patient Name | Issue Date | Validity | Optometrist | Status | Actions
   - Action buttons: View Details | Print | Renew
   - TODO: Prescription listing logic
   - TODO: Pagination

### TODO Logic:
- [ ] Prescription search across multiple fields
- [ ] Filter logic (validity, date, optometrist)
- [ ] Pagination
- [ ] Role-based visibility

---

## Screen 8: Clinical Dashboard

**Screen Name**: Clinical Dashboard  
**Route**: `/clinical/dashboard`  
**Role Access**: Optometrist, Store Manager  
**Purpose**: Quick overview of clinical operations

### UI Sections:
1. **Header Section**
   - Page title: Clinical Dashboard
   - Date range selector

2. **Today's Summary Cards**
   - Eye tests conducted
   - Prescriptions issued
   - Patients served
   - TODO: Daily aggregation logic

3. **Pending Tasks Card**
   - Pending prescription validations
   - Follow-up appointments
   - TODO: Task tracking

4. **Recent Patients Table**
   - Columns: Patient Name | Test Date | Prescription Validity | Actions
   - Action: View Details
   - TODO: Recent patients fetch logic

5. **Quick Actions Panel**
   - Button: New Eye Test
   - Button: Search Patient
   - Button: View All Prescriptions
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Daily clinical metrics aggregation
- [ ] Pending tasks calculation
- [ ] Recent patients listing
- [ ] Real-time updates

---

## Screen 9: Print Prescription

**Screen Name**: Print Prescription  
**Route**: `/clinical/prescriptions/:prescriptionId/print`  
**Role Access**: Optometrist, Sales Staff  
**Purpose**: Generate printable prescription format

### UI Sections:
1. **Print Preview Panel**
   - Prescription layout preview
   - Header: Store logo, name, address
   - Patient details
   - Prescription values (Right Eye, Left Eye, PD)
   - Optometrist name and signature placeholder
   - Validity date
   - QR code (optional, for digital verification)
   - TODO: Print template rendering

2. **Print Settings**
   - Printer selection
   - Number of copies
   - TODO: Printer integration

3. **Actions Panel**
   - Button: Print
   - Button: Download PDF
   - Button: Cancel
   - TODO: Print and PDF generation logic

### TODO Logic:
- [ ] Prescription template rendering
- [ ] Printer integration
- [ ] PDF generation
- [ ] QR code generation (optional)
- [ ] Audit trail for print actions

---

## Screen 10: Optometrist Schedule & Appointments

**Screen Name**: Optometrist Schedule  
**Route**: `/clinical/schedule`  
**Role Access**: Optometrist, Store Manager  
**Purpose**: Manage optometrist availability and appointments

### UI Sections:
1. **Header Section**
   - Page title: Optometrist Schedule
   - Week/Month view toggle

2. **Calendar View**
   - Calendar with appointment slots
   - Booked appointments highlighted
   - Available slots indicated
   - TODO: Calendar rendering logic

3. **Appointment List Panel**
   - Upcoming appointments list
   - Columns: Date | Time | Patient | Contact | Status | Actions
   - Action: Mark as Completed
   - TODO: Appointment listing logic

4. **Actions Panel**
   - Button: Book Appointment
   - Button: Set Availability
   - TODO: Appointment booking logic

### TODO Logic:
- [ ] Calendar integration
- [ ] Appointment booking and management
- [ ] Availability management
- [ ] Reminder notifications (future integration)
- [ ] Audit trail for appointments

---

## Screen 11: Clinical Reports (Optometrist / Manager)

**Screen Name**: Clinical Reports  
**Route**: `/clinical/reports`  
**Role Access**: Optometrist, Store Manager, Admin  
**Purpose**: Generate clinical performance and compliance reports

### UI Sections:
1. **Header Section**
   - Page title: Clinical Reports
   - Date range selector

2. **Report Type Selection Panel**
   - Radio: Eye Tests Summary
   - Radio: Prescriptions Issued
   - Radio: Optometrist Performance
   - Radio: Patient Demographics
   - TODO: Report type selection logic

3. **Filters Panel**
   - Date range
   - Optometrist (if applicable)
   - Store (for HQ users)
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

## Screen 12: Clinical Compliance & Audit

**Screen Name**: Clinical Compliance  
**Route**: `/clinical/compliance`  
**Role Access**: Store Manager, Admin, Superadmin  
**Purpose**: Monitor clinical compliance and audit clinical data

### UI Sections:
1. **Header Section**
   - Page title: Clinical Compliance
   - Date range selector

2. **Compliance Summary Cards**
   - Prescriptions without clinical notes
   - Expired prescriptions used in POS
   - Missing patient medical history
   - TODO: Compliance checks logic

3. **Audit Log Table**
   - Columns: Date | Action | Optometrist | Patient | Details | Status
   - TODO: Audit log fetch logic

4. **Non-Compliance Alerts Panel**
   - List of compliance violations
   - TODO: Alert generation logic

5. **Actions Panel**
   - Button: Export Audit Log
   - Button: Escalate Issues
   - TODO: Export and escalation logic

### TODO Logic:
- [ ] Compliance rule checks
- [ ] Audit log aggregation
- [ ] Non-compliance detection and alerts
- [ ] Export functionality
- [ ] Escalation workflows

---

## Navigation Structure

### Clinical Module Navigation (TODO):
- [ ] Optometrist → Eye Test, Prescriptions, Schedule
- [ ] Sales Staff → Patient Search, Prescription Search (read-only)
- [ ] Store Manager → All Clinical screens + Reports + Compliance
- [ ] HQ roles → Reports + Compliance across stores

---

## Global Clinical Rules (TODO):
- [ ] Axis validation: 0-180 degrees only
- [ ] Prescription validity controlled by optometrist
- [ ] Clinical data immutable after prescription issuance (version control)
- [ ] No prescription deletion, only expiry
- [ ] Full audit trail for all clinical actions
- [ ] Prescription mandatory for lens/frame POS sales (configurable)
- [ ] Patient linking to orders for tracking

---

**END OF CLINICAL SCREENS**
