import React, { useState } from 'react';
import { PageHeader, Card, Button, Badge, Table, Placeholder } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';

const POSHome = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('Frames');

  // TODO: Fetch cart items from state/context
  const cartItems = [];

  const categories = ['Frames', 'Lenses', 'Accessories', 'Services', 'Add-ons'];

  const cartColumns = [
    { header: 'Product', accessor: 'product' },
    { header: 'Barcode', accessor: 'barcode' },
    { header: 'MRP', accessor: 'mrp' },
    { header: 'Offer Price', accessor: 'offerPrice' },
    { header: 'Discount', accessor: 'discount' },
    { header: 'Final Price', accessor: 'finalPrice' },
    {
      header: 'Actions',
      render: () => (
        <Button variant="danger" size="sm">
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="POS - New Sale"
        subtitle={`Store: ${user?.store || 'N/A'} | Staff: ${user?.name}`}
        breadcrumbs={['Home', 'POS', 'New Sale']}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Customer & Product Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Selection */}
          <Card title="Customer Selection">
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search by Mobile / Customer ID / Name"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button variant="primary">Search</Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  New Customer
                </Button>
                <Button variant="outline" size="sm">
                  Link to Existing Patient
                </Button>
              </div>
              {/* TODO: Selected customer display card */}
              <Placeholder title="Selected Customer" description="Customer details will appear here" />
            </div>
          </Card>

          {/* Product Selection */}
          <Card title="Product Selection">
            <div className="space-y-4">
              {/* Barcode Scanner */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Barcode Scanner</label>
                <input
                  type="text"
                  placeholder="Scan barcode or enter manually"
                  className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
                />
              </div>

              {/* Product Search */}
              <div>
                <input
                  type="text"
                  placeholder="Search products by name or SKU"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 border-b border-gray-200">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 font-medium transition-colors ${
                      activeCategory === category
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Product Grid - TODO: Implement product listing */}
              <div className="min-h-[200px]">
                <Placeholder
                  title={`${activeCategory} Products`}
                  description="TODO: Product grid/list view with stock availability"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Cart & Summary */}
        <div className="space-y-6">
          {/* Cart Items */}
          <Card
            title="Cart"
            actions={
              <Badge variant="primary">{cartItems.length} items</Badge>
            }
          >
            {cartItems.length === 0 ? (
              <Placeholder title="Cart is empty" description="Add products to cart" />
            ) : (
              <Table columns={cartColumns} data={cartItems} />
            )}
          </Card>

          {/* Pricing Summary */}
          <Card title="Pricing Summary">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-semibold text-green-600">- ₹0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">CGST</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">SGST</span>
                <span>₹0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-lg font-bold">Grand Total</span>
                <span className="text-lg font-bold text-blue-600">₹0.00</span>
              </div>
            </div>
            {/* TODO: GST calculation logic */}
            {/* TODO: Discount cap enforcement by role */}
          </Card>

          {/* Actions */}
          <Card title="Actions">
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Apply Gift Card
              </Button>
              <Button variant="outline" className="w-full">
                Request Discount Override
              </Button>
              <Button variant="outline" className="w-full">
                Add Advance Payment
              </Button>
              <Button variant="secondary" className="w-full">
                Save as Draft
              </Button>
              <Button variant="primary" className="w-full" disabled={cartItems.length === 0}>
                Proceed to Payment
              </Button>
            </div>
            {/* TODO: Gift card validation */}
            {/* TODO: Override request workflow */}
            {/* TODO: Draft save logic */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default POSHome;
