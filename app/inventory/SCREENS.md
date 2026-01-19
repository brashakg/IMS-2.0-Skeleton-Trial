# Inventory Module — Screen Skeletons

**Module**: Inventory Management  
**Purpose**: Complete product lifecycle from HQ cataloging to store-level stock management  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: Product Catalog (HQ View)

**Screen Name**: Product Catalog  
**Route**: `/inventory/catalog`  
**Role Access**: Catalog Manager (HQ), Admin, Superadmin  
**Purpose**: Central product cataloging and activation

### UI Sections:
1. **Header Section**
   - Page title: Product Catalog
   - Button: Add New Product
   - Button: Bulk Upload

2. **Search & Filters Panel**
   - Search bar: Product name / SKU / Barcode
   - Filters: Category | Brand | Status (Active/Inactive/Pending) | Price Range
   - TODO: Search and filter logic

3. **Products Table**
   - Columns: SKU | Product Name | Category | Brand | MRP | Offer Price | Status | Actions
   - Action buttons: Edit | Activate/Deactivate | View Details
   - TODO: Product listing logic
   - TODO: Pagination

4. **Bulk Actions Panel**
   - Select multiple products
   - Bulk actions: Activate | Deactivate | Price Update
   - TODO: Bulk operation logic

### TODO Logic:
- [ ] Product search across multiple fields
- [ ] Filter and sort logic
- [ ] Activation/deactivation workflow
- [ ] Bulk operations with validation
- [ ] Audit trail for all catalog changes
- [ ] Same SKU must have same price across stores validation

---

## Screen 2: Add/Edit Product (HQ)

**Screen Name**: Add/Edit Product  
**Route**: `/inventory/catalog/product/:productId?`  
**Role Access**: Catalog Manager (HQ), Admin, Superadmin  
**Purpose**: Create or modify product details

### UI Sections:
1. **Header Section**
   - Page title: Add New Product / Edit Product
   - Product status indicator (if editing)

2. **Basic Information Form**
   - Input: Product Name (mandatory)
   - Input: SKU (auto-generated or manual)
   - Input: Brand
   - Dropdown: Category (mandatory)
   - Dropdown: Sub-category
   - Text area: Description
   - TODO: Field validation logic

3. **Pricing Form**
   - Input: MRP (mandatory)
   - Input: Offer Price (mandatory)
   - Validation indicator: MRP vs Offer Price check
   - TODO: Pricing validation (MRP >= Offer Price)
   - TODO: Price change approval workflow (if editing)

4. **Product Attributes Form** (Category-specific)
   - Dynamic fields based on category (e.g., Frame: Size, Color, Material; Lens: Type, Power Range)
   - TODO: Dynamic form rendering logic

5. **Inventory Settings Form**
   - Input: Reorder level (low stock threshold)
   - Checkbox: Available for POS
   - Checkbox: Available for Marketplace
   - TODO: Inventory rules configuration

6. **GST & Compliance Form**
   - Input: HSN Code
   - Dropdown: GST Rate
   - TODO: GST validation via API

7. **Images & Documents Panel**
   - Upload product images
   - Upload product documents (if any)
   - TODO: File upload logic

8. **Actions Panel**
   - Button: Save as Draft
   - Button: Activate Product
   - Button: Cancel
   - TODO: Product creation/update logic
   - TODO: Approval workflow (if needed)

### TODO Logic:
- [ ] Form validation (mandatory fields, pricing rules)
- [ ] SKU generation and uniqueness check
- [ ] Category-specific attribute rendering
- [ ] Image and document upload
- [ ] Price change approval workflow
- [ ] GST validation API integration
- [ ] Audit trail for all product changes

---

## Screen 3: Stock Receipt & Acceptance (Store View)

**Screen Name**: Stock Receipt  
**Route**: `/inventory/stock-receipt`  
**Role Access**: Store Manager, Inventory Staff  
**Purpose**: Receive and verify stock sent from HQ or vendors

### UI Sections:
1. **Header Section**
   - Page title: Stock Receipt
   - Store name

2. **Pending Shipments Table**
   - Columns: Shipment ID | Source | Expected Date | Items Count | Status | Actions
   - Action button: Accept Shipment
   - TODO: Pending shipments fetch logic

3. **Shipment Details Panel** (On selecting a shipment)
   - Shipment ID
   - Source (HQ / Vendor)
   - Expected items list
   - Actual receipt form
   - TODO: Shipment details fetch logic

4. **Item Verification Table**
   - Columns: Product | SKU | Expected Qty | Received Qty | Barcode Scan | Status | Remarks
   - Input: Barcode scanner field
   - TODO: Barcode scanning and verification logic
   - TODO: Mismatch detection

5. **Mismatch Handling Panel** (If mismatch detected)
   - Mismatch details
   - Input: Remarks (mandatory)
   - Button: Escalate to HQ
   - TODO: Mismatch escalation workflow

6. **Actions Panel**
   - Button: Confirm Receipt (if all verified)
   - Button: Escalate Mismatch
   - Button: Cancel
   - TODO: Stock acceptance logic
   - TODO: Stock addition to store inventory

### TODO Logic:
- [ ] Pending shipments listing
- [ ] Barcode scanning and verification
- [ ] Mismatch detection (expected vs received)
- [ ] Mandatory escalation for mismatches
- [ ] Stock acceptance and inventory update
- [ ] Audit trail for all receipt actions

---

## Screen 4: Store Stock Overview

**Screen Name**: Store Stock  
**Route**: `/inventory/stock`  
**Role Access**: Store Manager, Sales Staff (read-only), HQ roles  
**Purpose**: View current stock levels at store

### UI Sections:
1. **Header Section**
   - Page title: Store Stock
   - Store name
   - Button: Stock Audit

2. **Stock Summary Cards**
   - Total SKUs in stock
   - Low stock items count
   - Out of stock items count
   - Quarantine items count
   - TODO: Stock aggregation logic

3. **Search & Filters Panel**
   - Search bar: Product name / SKU / Barcode
   - Filters: Category | Stock Status (All, In Stock, Low Stock, Out of Stock, Quarantine)
   - TODO: Search and filter logic

4. **Stock Table**
   - Columns: Product | SKU | Category | Available Qty | Location | Status | Actions
   - Action buttons: View Details | Print Barcode | Move to Quarantine
   - TODO: Stock listing logic
   - TODO: Pagination

5. **Stock Alerts Panel**
   - Low stock items list
   - Pending reorders
   - TODO: Alert generation logic

### TODO Logic:
- [ ] Stock aggregation by store
- [ ] Low stock threshold checks
- [ ] Stock status calculation
- [ ] Barcode printing integration
- [ ] Quarantine management
- [ ] Real-time stock updates

---

## Screen 5: Product Details & Stock Movement History

**Screen Name**: Product Stock Details  
**Route**: `/inventory/stock/product/:productId`  
**Role Access**: Store Manager, HQ roles  
**Purpose**: View detailed stock information and movement history for a product

### UI Sections:
1. **Header Section**
   - Product name
   - SKU
   - Store name

2. **Product Information Card**
   - Product details (read-only)
   - Current stock quantity
   - Location in store
   - Status

3. **Stock Movement History Table**
   - Columns: Date | Type (Receipt/Sale/Transfer/Adjustment) | Quantity | Reference | Staff | Remarks
   - TODO: Movement history fetch logic
   - TODO: Pagination

4. **Location Mapping Panel**
   - Current location: Counter / Shelf / Cabinet / Display
   - Button: Update Location
   - TODO: Location update logic

5. **Actions Panel**
   - Button: Print Barcode
   - Button: Stock Adjustment (with approval)
   - Button: Move to Quarantine
   - TODO: Action logic with audit trails

### TODO Logic:
- [ ] Product details fetch
- [ ] Stock movement history
- [ ] Location mapping and update
- [ ] Stock adjustment with approval workflow
- [ ] Audit trail for all stock actions

---

## Screen 6: Stock Transfer Between Stores

**Screen Name**: Stock Transfer  
**Route**: `/inventory/transfer`  
**Role Access**: Store Manager, HQ Inventory Team  
**Purpose**: Initiate and manage stock transfers between stores

### UI Sections:
1. **Header Section**
   - Page title: Stock Transfer
   - Tabs: Create Transfer | Pending Transfers | Transfer History

2. **Create Transfer Form**
   - Dropdown: Source Store
   - Dropdown: Destination Store
   - Product selection table
   - Columns: Product | SKU | Available Qty | Transfer Qty | Remove
   - Button: Add Product
   - Input: Expected delivery date
   - Input: Courier details
   - Text area: Remarks
   - TODO: Transfer creation logic

3. **Pending Transfers Table**
   - Columns: Transfer ID | From | To | Items Count | Initiated Date | Expected Date | Status | Actions
   - Action buttons: View Details | Cancel Transfer
   - TODO: Pending transfers listing
   - TODO: SLA tracking

4. **Transfer Details Panel**
   - Transfer ID
   - Source and destination stores
   - Items list
   - Courier details
   - Status timeline
   - TODO: Transfer tracking logic

5. **Actions Panel**
   - Button: Initiate Transfer
   - Button: Cancel
   - TODO: Transfer creation and approval logic
   - TODO: Notification to destination store

### TODO Logic:
- [ ] Stock availability check before transfer
- [ ] Transfer creation and approval workflow
- [ ] SLA tracking for pending transfers
- [ ] Real-time notifications to destination store
- [ ] Stock deduction from source upon dispatch
- [ ] Stock addition to destination upon acceptance
- [ ] Audit trail for all transfer actions

---

## Screen 7: Stock Audit

**Screen Name**: Stock Audit  
**Route**: `/inventory/audit`  
**Role Access**: Store Manager, HQ roles  
**Purpose**: Conduct periodic stock audits and reconcile discrepancies

### UI Sections:
1. **Header Section**
   - Page title: Stock Audit
   - Button: Start New Audit

2. **Active Audits Table**
   - Columns: Audit ID | Started Date | Initiated By | Items Audited | Discrepancies | Status | Actions
   - Action buttons: Continue Audit | Complete Audit | View Details
   - TODO: Active audits listing

3. **Audit Form** (When audit is active)
   - Product selection or barcode scan
   - Input: Physical count
   - System count display
   - Discrepancy indicator
   - Input: Remarks (if discrepancy)
   - TODO: Audit data entry logic
   - TODO: Discrepancy detection

4. **Discrepancy Summary Panel**
   - Total items audited
   - Items with discrepancies
   - Total discrepancy value
   - TODO: Discrepancy calculations

5. **Actions Panel**
   - Button: Save Progress
   - Button: Complete Audit (with approval if discrepancies exist)
   - Button: Cancel Audit
   - TODO: Audit completion and approval logic

### TODO Logic:
- [ ] Audit creation and tracking
- [ ] Barcode scanning for physical count
- [ ] Discrepancy detection (system vs physical)
- [ ] Approval workflow for discrepancies
- [ ] Stock adjustment after audit completion
- [ ] Audit report generation
- [ ] Audit trail for all audit actions

---

## Screen 8: Quarantine Management

**Screen Name**: Quarantine Items  
**Route**: `/inventory/quarantine`  
**Role Access**: Store Manager, HQ roles  
**Purpose**: Manage defective, damaged, or mismatched items

### UI Sections:
1. **Header Section**
   - Page title: Quarantine Items
   - Quarantine count badge

2. **Quarantine Items Table**
   - Columns: Product | SKU | Quantity | Reason | Quarantined Date | Quarantined By | Actions
   - Action buttons: Release | Return to Vendor | Write-off
   - TODO: Quarantine items listing

3. **Quarantine Details Panel**
   - Product information
   - Quarantine reason
   - Images (if applicable)
   - History of actions

4. **Action Forms** (Conditional based on action)
   - Release: Input remarks, approve by manager
   - Return to Vendor: Vendor details, return reason, RMA number
   - Write-off: Approval required, financial impact
   - TODO: Action-specific workflows

5. **Actions Panel**
   - Button: Release from Quarantine
   - Button: Initiate Vendor Return
   - Button: Request Write-off
   - TODO: Action execution with approval workflows

### TODO Logic:
- [ ] Quarantine items listing
- [ ] Release workflow with manager approval
- [ ] Vendor return initiation and tracking
- [ ] Write-off approval and financial integration
- [ ] Audit trail for all quarantine actions

---

## Screen 9: Vendor Return Management

**Screen Name**: Vendor Returns  
**Route**: `/inventory/vendor-returns`  
**Role Access**: Store Manager, HQ Inventory Team  
**Purpose**: Manage returns to vendors with SLA tracking

### UI Sections:
1. **Header Section**
   - Page title: Vendor Returns
   - Tabs: Pending Returns | Completed Returns

2. **Pending Returns Table**
   - Columns: Return ID | Vendor | Items Count | Initiated Date | Expected Resolution | Status | SLA Status | Actions
   - Action buttons: View Details | Mark as Resolved | Escalate
   - TODO: Pending returns listing
   - TODO: SLA calculation and tracking

3. **Return Details Panel**
   - Return ID
   - Vendor details
   - Items list
   - Return reason
   - RMA number
   - Courier details
   - Status timeline
   - TODO: Return details fetch logic

4. **Escalation Panel** (If SLA breached)
   - SLA breach indicator
   - Escalation form
   - Button: Escalate to HQ
   - TODO: Escalation workflow

5. **Actions Panel**
   - Button: Mark as Resolved
   - Button: Escalate
   - TODO: Resolution and escalation logic

### TODO Logic:
- [ ] Vendor return creation
- [ ] SLA tracking with auto-escalation
- [ ] Vendor communication integration
- [ ] Resolution confirmation
- [ ] Stock and financial adjustments upon resolution
- [ ] Audit trail for all vendor return actions

---

## Screen 10: Barcode Generation & Printing (Inventory Context)

**Screen Name**: Barcode Management  
**Route**: `/inventory/barcodes`  
**Role Access**: Store Manager, Inventory Staff  
**Purpose**: Generate and print barcodes with embedded location codes

### UI Sections:
1. **Header Section**
   - Page title: Barcode Management

2. **Product Selection Panel**
   - Search bar: Product name / SKU
   - Product list with selection checkboxes
   - TODO: Product search logic

3. **Barcode Configuration Form**
   - Input: Location code (mandatory)
   - Input: Quantity (number of barcodes per product)
   - Dropdown: Barcode format
   - Preview panel showing sample barcode
   - TODO: Barcode generation with location code embedding

4. **Print Settings Panel**
   - Printer selection
   - Label size selection
   - Print preview
   - TODO: Printer integration

5. **Actions Panel**
   - Button: Generate Barcodes
   - Button: Print
   - Button: Cancel
   - TODO: Barcode generation and print logic

### TODO Logic:
- [ ] Barcode generation with embedded location code
- [ ] Multiple barcode format support
- [ ] Printer integration
- [ ] Print preview
- [ ] Audit trail for barcode printing

---

## Screen 11: Low Stock Alerts & Reorders

**Screen Name**: Low Stock Alerts  
**Route**: `/inventory/low-stock`  
**Role Access**: Store Manager, HQ Inventory Team  
**Purpose**: Monitor and act on low stock alerts

### UI Sections:
1. **Header Section**
   - Page title: Low Stock Alerts
   - Alert count badge

2. **Low Stock Items Table**
   - Columns: Product | SKU | Current Stock | Reorder Level | Last Sale Date | Status | Actions
   - Action buttons: Reorder | Ignore Alert
   - TODO: Low stock items listing
   - TODO: Reorder level calculation

3. **Reorder Form** (Modal/Panel)
   - Product details
   - Current stock
   - Input: Reorder quantity
   - Expected delivery date
   - Supplier selection
   - TODO: Reorder creation logic

4. **Reorder History Table**
   - Columns: Date | Product | Quantity | Supplier | Expected Date | Status
   - TODO: Reorder history listing

### TODO Logic:
- [ ] Low stock threshold monitoring
- [ ] Alert generation based on reorder levels
- [ ] Reorder creation and tracking
- [ ] Integration with purchase module (if exists)
- [ ] Audit trail for reorder actions

---

## Screen 12: Inventory HQ Dashboard

**Screen Name**: Inventory HQ Dashboard  
**Route**: `/inventory/hq-dashboard`  
**Role Access**: HQ Inventory Team, Admin, Superadmin  
**Purpose**: Enterprise-wide inventory oversight

### UI Sections:
1. **Header Section**
   - Page title: Inventory HQ Dashboard
   - Date range selector

2. **Enterprise Inventory Summary Cards**
   - Total SKUs (all stores)
   - Total stock value
   - Low stock alerts across stores
   - Pending transfers
   - Pending mismatches
   - TODO: Enterprise-wide aggregation

3. **Store-wise Stock Table**
   - Columns: Store | Total Stock Value | Low Stock Items | Pending Transfers | Quarantine Items | Status
   - TODO: Multi-store inventory aggregation

4. **Pending Actions Cards**
   - Mismatch escalations count
   - Pending stock approvals count
   - Vendor return SLA breaches
   - TODO: Action queue management

5. **Quick Actions Panel**
   - Button: Approve Catalog Items
   - Button: Review Mismatches
   - Button: Initiate Stock Transfer
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Enterprise-wide inventory aggregation
- [ ] Multi-store stock visibility
- [ ] Action queue management
- [ ] Real-time alert monitoring
- [ ] Drill-down to store-level details

---

## Navigation Structure

### Inventory Module Navigation (TODO):
- [ ] HQ users → Catalog + HQ Dashboard
- [ ] Store users → Store stock + Receipt + Transfer
- [ ] Role-based menu visibility
- [ ] Store context filtering (auto-select store for store users)

---

## Global Inventory Rules (TODO):
- [ ] Barcodes MUST include location codes
- [ ] Same SKU MUST have same price across stores
- [ ] Stock mismatches MUST be escalated, no silent acceptance
- [ ] All stock movements MUST be audited
- [ ] Quarantine items MUST have resolution workflows
- [ ] SLA tracking MUST trigger auto-escalation
- [ ] No deletion of stock records, only adjustments with approval

---

**END OF INVENTORY SCREENS**
