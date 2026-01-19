# Marketplace Integration Module — Screen Skeletons

**Module**: Marketplace Integration  
**Purpose**: Manage product listings and orders across Shopify, Amazon, Flipkart  
**Authority**: SYSTEM_INTENT.md

---

## Screen 1: Marketplace Dashboard

**Screen Name**: Marketplace Dashboard  
**Route**: `/marketplace/dashboard`  
**Role Access**: Admin, Superadmin, Marketplace Manager  
**Purpose**: Overview of all marketplace integrations and performance

### UI Sections:
1. **Header Section**
   - Page title: Marketplace Dashboard
   - Date range selector

2. **Integration Status Cards**
   - Shopify: Connected/Disconnected status
   - Amazon: Connected/Disconnected status
   - Flipkart: Connected/Disconnected status
   - TODO: Integration status check

3. **Sales Summary Cards**
   - Total marketplace orders (current month)
   - Total marketplace revenue
   - Pending orders
   - Failed sync count
   - TODO: Aggregation across marketplaces

4. **Marketplace-wise Performance Table**
   - Columns: Marketplace | Orders | Revenue | Pending | Failed Sync | Status
   - TODO: Performance data fetch

5. **Pending Actions Card**
   - Pending product uploads
   - Pending stock sync
   - Failed orders requiring attention
   - TODO: Action queue management

6. **Quick Actions Panel**
   - Button: Sync Products
   - Button: Sync Orders
   - Button: Configure Integrations
   - TODO: Navigation hooks

### TODO Logic:
- [ ] Multi-marketplace status monitoring
- [ ] Sales aggregation across platforms
- [ ] Sync failure tracking
- [ ] Real-time status updates

---

## Screen 2: Marketplace Configuration

**Screen Name**: Marketplace Configuration  
**Route**: `/marketplace/config`  
**Role Access**: Admin, Superadmin  
**Purpose**: Configure marketplace integrations

### UI Sections:
1. **Header Section**
   - Page title: Marketplace Configuration

2. **Shopify Configuration Panel**
   - Input: Store URL
   - Input: API Key
   - Input: API Secret
   - Button: Test Connection
   - Button: Connect/Disconnect
   - Connection status indicator
   - TODO: Shopify integration logic

3. **Amazon Configuration Panel**
   - Input: Seller ID
   - Input: MWS Auth Token
   - Input: Marketplace ID
   - Dropdown: Region
   - Button: Test Connection
   - Button: Connect/Disconnect
   - Connection status indicator
   - TODO: Amazon MWS integration logic

4. **Flipkart Configuration Panel**
   - Input: Seller ID
   - Input: App Key
   - Input: App Secret
   - Button: Test Connection
   - Button: Connect/Disconnect
   - Connection status indicator
   - TODO: Flipkart integration logic

5. **Sync Settings Panel**
   - Checkbox: Auto-sync products
   - Checkbox: Auto-sync orders
   - Checkbox: Auto-sync inventory
   - Input: Sync frequency (minutes)
   - TODO: Sync configuration

6. **Actions Panel**
   - Button: Save Configuration
   - Button: Test All Connections
   - TODO: Configuration save logic

### TODO Logic:
- [ ] API credential management (encrypted storage)
- [ ] Connection testing
- [ ] Multi-marketplace integration
- [ ] Sync frequency configuration
- [ ] Audit trail for configuration changes

---

## Screen 3: Product Listing Management

**Screen Name**: Marketplace Products  
**Route**: `/marketplace/products`  
**Role Access**: Admin, Superadmin, Marketplace Manager  
**Purpose**: Manage product listings across marketplaces

### UI Sections:
1. **Header Section**
   - Page title: Marketplace Products
   - Button: Add to Marketplace

2. **Search & Filters Panel**
   - Search bar: Product name / SKU
   - Filters: Marketplace (Shopify/Amazon/Flipkart/All) | Status (Listed/Unlisted/Pending) | Category
   - TODO: Search and filter logic

3. **Products Table**
   - Columns: Product | SKU | Shopify Status | Amazon Status | Flipkart Status | Last Synced | Actions
   - Status indicators: Listed (green) | Unlisted (gray) | Sync Failed (red)
   - Action buttons: Edit Listing | Sync Now | Unlist
   - TODO: Product listing status fetch
   - TODO: Pagination

4. **Bulk Actions Panel**
   - Select multiple products
   - Bulk actions: List to Marketplace | Unlist | Sync Inventory
   - TODO: Bulk operations logic

### TODO Logic:
- [ ] Multi-marketplace product status tracking
- [ ] Sync status monitoring
- [ ] Bulk listing operations
- [ ] Integration with Inventory module
- [ ] Audit trail

---

## Screen 4: Add/Edit Marketplace Listing

**Screen Name**: Marketplace Listing  
**Route**: `/marketplace/products/list/:productId`  
**Role Access**: Admin, Superadmin, Marketplace Manager  
**Purpose**: Create or edit marketplace product listing

### UI Sections:
1. **Header Section**
   - Page title: Add to Marketplace
   - Product name (from catalog)

2. **Product Selection Panel** (If new listing)
   - Search bar: Product from catalog
   - Selected product details
   - TODO: Product selection from Inventory catalog

3. **Marketplace Selection Panel**
   - Checkbox: Shopify
   - Checkbox: Amazon
   - Checkbox: Flipkart
   - TODO: Marketplace selection logic

4. **Common Listing Details Form**
   - Input: Title (can be different from catalog)
   - Text area: Description
   - Input: MRP
   - Input: Selling Price
   - Dropdown: Category (marketplace-specific)
   - Input: Brand
   - TODO: Common fields capture

5. **Marketplace-Specific Fields Panel** (Dynamic based on selection)
   - Shopify: Product type, tags, collections
   - Amazon: ASIN, fulfillment type (FBA/FBM), item condition
   - Flipkart: Listing ID, fulfillment type, procurement SLA
   - TODO: Marketplace-specific field capture

6. **Images Panel**
   - Upload product images (min 1, max marketplace limit)
   - Image order management
   - TODO: Image upload and ordering

7. **Inventory Sync Settings**
   - Checkbox: Sync inventory automatically
   - Input: Buffer stock (units to keep reserved)
   - TODO: Inventory sync configuration

8. **Actions Panel**
   - Button: List Product
   - Button: Save as Draft
   - Button: Cancel
   - TODO: Listing creation logic

### TODO Logic:
- [ ] Product selection from Inventory catalog
- [ ] Multi-marketplace listing creation
- [ ] Marketplace-specific field validation
- [ ] Image upload and management
- [ ] Inventory sync configuration
- [ ] API calls to create listings
- [ ] Audit trail

---

## Screen 5: Marketplace Orders

**Screen Name**: Marketplace Orders  
**Route**: `/marketplace/orders`  
**Role Access**: Admin, Superadmin, Marketplace Manager, Store Staff  
**Purpose**: View and manage orders from marketplaces

### UI Sections:
1. **Header Section**
   - Page title: Marketplace Orders
   - Button: Sync Orders

2. **Search & Filters Panel**
   - Search bar: Order ID / Customer name
   - Filters: Marketplace | Status (Pending/Packed/Shipped/Delivered/Cancelled) | Date Range
   - TODO: Search and filter logic

3. **Orders Table**
   - Columns: Order ID | Marketplace | Date | Customer | Items | Amount | Status | Actions
   - Action buttons: View Details | Mark Packed | Mark Shipped | Cancel Order
   - TODO: Order listing from marketplace APIs
   - TODO: Pagination

4. **Status Tabs**
   - Tabs: All | Pending | Packed | Shipped | Delivered | Cancelled
   - TODO: Tab-based filtering

5. **Bulk Actions Panel**
   - Select multiple orders
   - Bulk actions: Mark Packed | Generate Shipping Labels
   - TODO: Bulk operations logic

### TODO Logic:
- [ ] Order sync from marketplace APIs
- [ ] Order status tracking
- [ ] Status update workflow
- [ ] Integration with Inventory for stock deduction
- [ ] Audit trail

---

## Screen 6: Marketplace Order Details

**Screen Name**: Marketplace Order Details  
**Route**: `/marketplace/orders/:orderId`  
**Role Access**: Admin, Superadmin, Marketplace Manager, Store Staff  
**Purpose**: View complete marketplace order details

### UI Sections:
1. **Header Section**
   - Order ID
   - Marketplace badge
   - Status badge

2. **Order Information Card**
   - Order date
   - Marketplace order ID
   - Customer details (name, address, phone)
   - TODO: Order details fetch

3. **Items Table**
   - Columns: Product | SKU | Quantity | Price | Total
   - TODO: Order items display

4. **Pricing Card**
   - Subtotal
   - Marketplace commission
   - Shipping charges
   - Net amount
   - TODO: Pricing breakdown

5. **Shipping Information Card**
   - Shipping address
   - Shipping method
   - Tracking number (if shipped)
   - Expected delivery date
   - TODO: Shipping details display

6. **Status Timeline**
   - Order placed
   - Packed
   - Shipped
   - Out for delivery
   - Delivered
   - TODO: Status timeline display

7. **Actions Panel**
   - Button: Mark as Packed
   - Button: Mark as Shipped (with tracking input)
   - Button: Cancel Order
   - Button: Print Invoice
   - TODO: Action logic with status validation

### TODO Logic:
- [ ] Order details fetch from marketplace API
- [ ] Status update workflow
- [ ] Tracking number capture
- [ ] Invoice generation
- [ ] Integration with Inventory for stock management
- [ ] Audit trail

---

## Screen 7: Inventory Sync

**Screen Name**: Inventory Sync  
**Route**: `/marketplace/inventory-sync`  
**Role Access**: Admin, Superadmin, Marketplace Manager  
**Purpose**: Sync inventory levels with marketplaces

### UI Sections:
1. **Header Section**
   - Page title: Inventory Sync
   - Button: Sync All Now

2. **Sync Status Card**
   - Last sync time
   - Next scheduled sync
   - Sync status: Success/Failed
   - TODO: Sync status display

3. **Products with Sync Issues Table**
   - Columns: Product | SKU | Store Stock | Shopify Stock | Amazon Stock | Flipkart Stock | Issue | Actions
   - Action: Sync Now | View Details
   - TODO: Sync mismatch detection

4. **Sync History Table**
   - Columns: Timestamp | Products Synced | Success Count | Failed Count | Details
   - TODO: Sync history log

5. **Actions Panel**
   - Button: Force Sync All
   - Button: View Sync Log
   - TODO: Manual sync trigger

### TODO Logic:
- [ ] Real-time inventory sync to marketplaces
- [ ] Buffer stock management (reserved inventory)
- [ ] Sync failure detection and alerts
- [ ] Sync history logging
- [ ] Integration with Inventory module
- [ ] API rate limit handling

---

## Screen 8: Marketplace Reports

**Screen Name**: Marketplace Reports  
**Route**: `/marketplace/reports`  
**Role Access**: Admin, Superadmin, Marketplace Manager  
**Purpose**: Generate marketplace performance reports

### UI Sections:
1. **Header Section**
   - Page title: Marketplace Reports
   - Date range selector

2. **Report Type Selection Panel**
   - Radio: Sales Summary
   - Radio: Order Status Report
   - Radio: Marketplace Commission
   - Radio: Inventory Sync Report
   - TODO: Report type selection

3. **Filters Panel**
   - Date range
   - Marketplace
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
- [ ] Report generation from marketplace data
- [ ] Sales and commission calculations
- [ ] Export functionality
- [ ] Role-based report access

---

## Screen 9: Sync Logs & Troubleshooting

**Screen Name**: Sync Logs  
**Route**: `/marketplace/logs`  
**Role Access**: Admin, Superadmin  
**Purpose**: View detailed sync logs for troubleshooting

### UI Sections:
1. **Header Section**
   - Page title: Sync Logs
   - Date range selector

2. **Filters Panel**
   - Marketplace
   - Sync type (Products/Orders/Inventory)
   - Status (Success/Failed)
   - TODO: Filter logic

3. **Logs Table**
   - Columns: Timestamp | Marketplace | Sync Type | Entity | Status | Error Message | Actions
   - Action: View Details | Retry
   - TODO: Log listing
   - TODO: Pagination

4. **Log Details Panel**
   - Full request/response data
   - Error stack trace (if failed)
   - TODO: Detailed log display

5. **Actions Panel**
   - Button: Retry Failed Syncs
   - Button: Export Logs
   - TODO: Retry and export logic

### TODO Logic:
- [ ] Comprehensive sync logging
- [ ] Error tracking and analysis
- [ ] Retry mechanism for failed syncs
- [ ] Export functionality
- [ ] Audit trail

---

## Navigation Structure

### Marketplace Module Navigation (TODO):
- [ ] Admin/Superadmin → All marketplace screens + configuration
- [ ] Marketplace Manager → Products, orders, inventory sync
- [ ] Store Staff → View marketplace orders (read-only)

---

## Global Marketplace Rules (TODO):
- [ ] API credentials encrypted in storage
- [ ] Auto-sync configurable with frequency control
- [ ] Inventory sync includes buffer stock management
- [ ] Order status updates must sync back to marketplace
- [ ] All sync operations logged for troubleshooting
- [ ] Rate limit handling for API calls
- [ ] Audit trail for all marketplace actions

---

**END OF MARKETPLACE INTEGRATION SCREENS**