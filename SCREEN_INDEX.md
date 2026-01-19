# IMS 2.0 — Screen Skeletons Index

**Build Pass #1 Complete**  
**Total Screens**: 126  
**Total Modules**: 12

---

## Quick Navigation to Screen Definitions

### Module 1: Dashboards (7 screens)
**File**: [/app/app/dashboards/SCREENS.md](/app/app/dashboards/SCREENS.md)

1. Staff Dashboard → `/dashboard/staff`
2. Store Manager Dashboard → `/dashboard/manager`
3. Area Manager Dashboard → `/dashboard/area-manager`
4. Admin Dashboard (HQ) → `/dashboard/admin`
5. Superadmin Dashboard → `/dashboard/superadmin`
6. Catalog Manager Dashboard (HQ) → `/dashboard/catalog`
7. Accountant Dashboard (HQ) → `/dashboard/accountant`

---

### Module 2: POS / Sales (11 screens)
**File**: [/app/app/pos/SCREENS.md](/app/app/pos/SCREENS.md)

1. POS Home / Sale Entry → `/pos`
2. Payment Processing → `/pos/payment`
3. Order Confirmation & Receipt → `/pos/order-confirm/:orderId`
4. Order Search & Listing → `/pos/orders`
5. Order Details & Edit → `/pos/orders/:orderId`
6. Discount Override Request → `/pos/discount-override`
7. Discount Approvals (Manager) → `/pos/approvals/discounts`
8. Gift Card Management → `/pos/gift-cards`
9. Prescription Attachment → `/pos/orders/:orderId/prescription`
10. Draft Orders → `/pos/drafts`
11. Barcode Printing → `/pos/barcode-print`

---

### Module 3: Inventory Management (12 screens)
**File**: [/app/app/inventory/SCREENS.md](/app/app/inventory/SCREENS.md)

1. Product Catalog (HQ) → `/inventory/catalog`
2. Add/Edit Product (HQ) → `/inventory/catalog/product/:productId?`
3. Stock Receipt & Acceptance → `/inventory/stock-receipt`
4. Store Stock Overview → `/inventory/stock`
5. Product Stock Details → `/inventory/stock/product/:productId`
6. Stock Transfer Between Stores → `/inventory/transfer`
7. Stock Audit → `/inventory/audit`
8. Quarantine Management → `/inventory/quarantine`
9. Vendor Return Management → `/inventory/vendor-returns`
10. Barcode Generation & Printing → `/inventory/barcodes`
11. Low Stock Alerts & Reorders → `/inventory/low-stock`
12. Inventory HQ Dashboard → `/inventory/hq-dashboard`

---

### Module 4: Clinical / Optometry (12 screens)
**File**: [/app/app/clinical/SCREENS.md](/app/app/clinical/SCREENS.md)

1. Patient Registration → `/clinical/patients/new`
2. Patient Search & Listing → `/clinical/patients`
3. Patient Details & History → `/clinical/patients/:patientId`
4. Eye Test / Clinical Examination → `/clinical/eye-test/new`
5. Prescription Details & Edit → `/clinical/prescriptions/:prescriptionId`
6. Prescription Renewal → `/clinical/prescriptions/:prescriptionId/renew`
7. Prescription Search & Listing → `/clinical/prescriptions`
8. Clinical Dashboard → `/clinical/dashboard`
9. Print Prescription → `/clinical/prescriptions/:prescriptionId/print`
10. Optometrist Schedule → `/clinical/schedule`
11. Clinical Reports → `/clinical/reports`
12. Clinical Compliance & Audit → `/clinical/compliance`

---

### Module 5: HR & Attendance (12 screens)
**File**: [/app/app/hr/SCREENS.md](/app/app/hr/SCREENS.md)

1. Staff Directory → `/hr/staff`
2. Add/Edit Staff → `/hr/staff/new` or `/hr/staff/:staffId/edit`
3. Staff Details & Profile → `/hr/staff/:staffId`
4. Attendance Marking → `/hr/attendance/mark`
5. Attendance History & Reports → `/hr/attendance/history`
6. Leave Application → `/hr/leave/apply`
7. Leave Approvals → `/hr/leave/approvals`
8. Leave History & Balance → `/hr/leave/management`
9. HR Dashboard → `/hr/dashboard`
10. HR Reports → `/hr/reports`
11. Shift Management → `/hr/shifts`
12. Staff Performance Tracking → `/hr/performance`

---

### Module 6: Payroll & Incentives (13 screens)
**File**: [/app/app/finance/SCREENS.md](/app/app/finance/SCREENS.md)

1. Payroll Dashboard → `/payroll/dashboard`
2. Process Payroll → `/payroll/process`
3. Staff Payroll Details → `/payroll/staff/:staffId/:month`
4. Payslip Generation & Distribution → `/payroll/payslips`
5. Payslip View (Staff) → `/payroll/my-payslips`
6. Incentive Configuration → `/payroll/incentives/config`
7. Incentive Calculation & Processing → `/payroll/incentives/process`
8. Incentive Details & Breakdown → `/payroll/incentives/staff/:staffId/:month`
9. Incentive Approvals → `/payroll/incentives/approvals`
10. Advance Salary Management → `/payroll/advances`
11. Advance Request (Staff) → `/payroll/request-advance`
12. Payroll Reports → `/payroll/reports`
13. Payroll Lock & Period Management → `/payroll/lock-period`

---

### Module 7: Finance & Accounting (12 screens)
**File**: [/app/app/finance/FINANCE_SCREENS.md](/app/app/finance/FINANCE_SCREENS.md)

1. Finance Dashboard → `/finance/dashboard`
2. Revenue & Sales Accounting → `/finance/revenue`
3. Expense Accounting → `/finance/expenses`
4. GST Management & Filing → `/finance/gst`
5. Outstanding & Receivables → `/finance/receivables`
6. Bank Reconciliation → `/finance/reconciliation`
7. Financial Periods & Locking → `/finance/periods`
8. Profit & Loss Statement → `/finance/pnl`
9. Balance Sheet → `/finance/balance-sheet`
10. Financial Reports → `/finance/reports`
11. Financial Audit Log → `/finance/audit-log`
12. Tally Integration → `/finance/tally`

---

### Module 8: Tasks & SOPs (10 screens)
**File**: [/app/app/tasks/SCREENS.md](/app/app/tasks/SCREENS.md)

1. Tasks Dashboard → `/tasks/dashboard`
2. All Tasks Listing → `/tasks/all`
3. Create/Edit Task → `/tasks/new` or `/tasks/:taskId/edit`
4. Task Details → `/tasks/:taskId`
5. SOP Library → `/tasks/sops`
6. SOP Details & Checklist → `/tasks/sops/:sopId`
7. Create/Edit SOP → `/tasks/sops/new` or `/tasks/sops/:sopId/edit`
8. Task Escalations → `/tasks/escalations`
9. Task Reports → `/tasks/reports`
10. Recurring Tasks Management → `/tasks/recurring`

---

### Module 9: Expenses & Advances (10 screens)
**File**: [/app/app/expenses/SCREENS.md](/app/app/expenses/SCREENS.md)

1. Expenses Dashboard → `/expenses/dashboard`
2. Add Expense → `/expenses/new`
3. Expense Listing → `/expenses/all`
4. Expense Details → `/expenses/:expenseId`
5. Expense Approvals → `/expenses/approvals`
6. Expense Categories Management → `/expenses/categories`
7. Expense Reports → `/expenses/reports`
8. Advance Request (Staff) → `/expenses/advance/request`
9. Advance Approvals → `/expenses/advance/approvals`
10. Advance Settlement → `/expenses/advance/settle/:advanceId`

---

### Module 10: Marketplace Integration (9 screens)
**File**: [/app/app/marketplace/SCREENS.md](/app/app/marketplace/SCREENS.md)

1. Marketplace Dashboard → `/marketplace/dashboard`
2. Marketplace Configuration → `/marketplace/config`
3. Product Listing Management → `/marketplace/products`
4. Add/Edit Marketplace Listing → `/marketplace/products/list/:productId`
5. Marketplace Orders → `/marketplace/orders`
6. Marketplace Order Details → `/marketplace/orders/:orderId`
7. Inventory Sync → `/marketplace/inventory-sync`
8. Marketplace Reports → `/marketplace/reports`
9. Sync Logs & Troubleshooting → `/marketplace/logs`

---

### Module 11: AI Intelligence (8 screens) — SUPERADMIN ONLY
**File**: [/app/app/ai/SCREENS.md](/app/app/ai/SCREENS.md)

1. AI Intelligence Dashboard → `/ai/dashboard`
2. Ask AI Intelligence → `/ai/ask`
3. AI Insights & Patterns → `/ai/insights`
4. AI Insight Details → `/ai/insights/:insightId`
5. AI Change Proposals → `/ai/proposals`
6. AI Change Proposal Details → `/ai/proposals/:proposalId`
7. AI Analysis History → `/ai/history`
8. AI Configuration → `/ai/config`

---

### Module 12: Setup & Configuration (10 screens)
**File**: [/app/app/setup/SCREENS.md](/app/app/setup/SCREENS.md)

1. Setup Dashboard → `/setup/dashboard`
2. Store Management → `/setup/stores`
3. User Management → `/setup/users`
4. Role Management → `/setup/roles` (Superadmin only)
5. Category Management → `/setup/categories`
6. System Settings → `/setup/settings` (Superadmin only)
7. Integration Settings → `/setup/integrations`
8. System Audit Log → `/setup/audit-log`
9. Database Backup & Restore → `/setup/backup` (Superadmin only)
10. System Health & Monitoring → `/setup/health` (Superadmin only)

---

## Additional Documentation

### Navigation Structure
**File**: [/app/navigation/NAVIGATION_STRUCTURE.md](/app/navigation/NAVIGATION_STRUCTURE.md)
- Complete navigation hierarchy
- Role-based access matrix
- Route structure
- Breadcrumb and menu specifications

### Build Summary
**File**: [/app/BUILD_PASS_1_SUMMARY.md](/app/BUILD_PASS_1_SUMMARY.md)
- Complete build pass summary
- Screen count by module
- Compliance checklist
- Next steps

### System Intent (Authority)
**File**: [/app/docs/SYSTEM_INTENT.md](/app/docs/SYSTEM_INTENT.md)
- Supreme authority document
- Core philosophy
- Business laws
- AI governance
- Non-negotiables

---

## Screen Count Summary

| Module | Screens | File |
|--------|---------|------|
| Dashboards | 7 | `/app/app/dashboards/SCREENS.md` |
| POS / Sales | 11 | `/app/app/pos/SCREENS.md` |
| Inventory | 12 | `/app/app/inventory/SCREENS.md` |
| Clinical / Optometry | 12 | `/app/app/clinical/SCREENS.md` |
| HR & Attendance | 12 | `/app/app/hr/SCREENS.md` |
| Payroll & Incentives | 13 | `/app/app/finance/SCREENS.md` |
| Finance & Accounting | 12 | `/app/app/finance/FINANCE_SCREENS.md` |
| Tasks & SOPs | 10 | `/app/app/tasks/SCREENS.md` |
| Expenses & Advances | 10 | `/app/app/expenses/SCREENS.md` |
| Marketplace | 9 | `/app/app/marketplace/SCREENS.md` |
| AI Intelligence | 8 | `/app/app/ai/SCREENS.md` |
| Setup & Configuration | 10 | `/app/app/setup/SCREENS.md` |
| **TOTAL** | **126** | **12 files** |

---

## Role Access Quick Reference

### Superadmin (CEO)
- **Full Access**: All 126 screens including AI Intelligence

### Admin (HQ Directors)
- **Access**: All screens except AI Intelligence (118 screens)
- **Restricted**: AI Intelligence module

### Store Manager
- **Primary Access**: Dashboards, POS, Inventory (store), Clinical (reports), HR (store), Tasks, Expenses
- **Approvals**: Discounts, Leave, Tasks, Expenses

### Sales Staff / Optometrist / Other Roles
- **Limited Access**: Role-specific screens only
- **See**: Navigation Structure document for detailed role matrix

---

**Build Pass #1 Complete — Awaiting Review and Approval**

---

**END OF INDEX**
