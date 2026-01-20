import React from 'react';
import { PageHeader, Card, Button, Placeholder } from '../../components/UI';

const BarcodePrinting = () => {
  return (
    <div>
      <PageHeader
        title="Print Barcodes"
        subtitle="Print barcodes for products at store level"
        breadcrumbs={['Home', 'POS', 'Barcode Printing']}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Product Selection */}
        <Card title="Product Selection">
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by Product Name or SKU"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button variant="primary">Search</Button>
            </div>
            <Placeholder title="Selected product" description="TODO: Product search and display" />
          </div>
          {/* TODO: Product search logic */}
        </Card>

        {/* Barcode Configuration */}
        <Card title="Barcode Configuration">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Code *</label>
              <input
                type="text"
                placeholder="Enter location code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Number of Copies) *</label>
              <input
                type="number"
                placeholder="Enter quantity"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Barcode Format</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Code 128</option>
                <option>Code 39</option>
                <option>EAN-13</option>
              </select>
            </div>
            <Placeholder title="Barcode preview" description="TODO: Barcode generation with location code" />
          </div>
          {/* TODO: Barcode generation logic with location code */}
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="primary" className="flex-1">Print Barcodes</Button>
          <Button variant="outline" className="flex-1">Cancel</Button>
        </div>
        {/* TODO: Printer integration */}
      </div>
    </div>
  );
};

export default BarcodePrinting;
