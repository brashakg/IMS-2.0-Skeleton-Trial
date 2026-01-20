import React, { useState, useEffect } from 'react';
import { PageHeader, Card, Button, Badge } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';
import APIService from '../../services/api';

// ALL CATEGORIES (from CATEGORY_ATTRIBUTE_MODEL.md)
const PRODUCT_CATEGORIES = [
  { id: 'FRAME_OPTICAL', name: 'Optical Frames', category: 'FRAME', prescriptionRequired: false, icon: '👓' },
  { id: 'FRAME_SUNGLASS', name: 'Sunglasses', category: 'FRAME', prescriptionRequired: false, icon: '🕶️' },
  { id: 'OPTICAL_LENS', name: 'Optical Lenses', category: 'OPTICAL_LENS', prescriptionRequired: true, icon: '🔬' },
  { id: 'CONTACT_LENS', name: 'Contact Lenses', category: 'CONTACT_LENS', prescriptionRequired: true, icon: '👁️' },
  { id: 'ACCESSORIES', name: 'Accessories', category: 'ACCESSORIES', prescriptionRequired: false, icon: '🎒' },
  { id: 'WATCHES', name: 'Watches', category: 'WATCHES', prescriptionRequired: false, icon: '⌚' },
  { id: 'SERVICES', name: 'Services', category: 'SERVICES', prescriptionRequired: false, icon: '🔧' },
];

const POSCanvas = () => {
  const { user } = useAuth();
  
  // Context state (side panel)
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [orderId, setOrderId] = useState(null);
  
  // POS state
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('FRAME_OPTICAL');
  const [pricingSnapshot, setPricingSnapshot] = useState(null);
  
  // Data
  const [customers, setCustomers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [products, setProducts] = useState([]);
  
  // UI state
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  
  // Form state
  const [newCustomer, setNewCustomer] = useState({ name: '', mobile: '', email: '' });
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: 'M' });
  
  useEffect(() => {
    loadCustomers();
    loadProducts('FRAME');
  }, []);
  
  const loadCustomers = async () => {
    try {
      const data = await APIService.searchCustomers();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Failed to load customers:', error);
    }
  };
  
  const loadProducts = async (category) => {
    try {
      const data = await APIService.searchProducts(category);
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };
  
  const handleCustomerSelect = async (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(false);
    setShowNewCustomerForm(false);
    
    // Load patients
    try {
      const data = await APIService.getCustomerPatients(customer.id);
      setPatients(data.patients || []);
    } catch (error) {
      console.error('Failed to load patients:', error);
    }
  };
  
  const handleCreateNewCustomer = async () => {
    if (!newCustomer.name || !newCustomer.mobile) {
      alert('⚠️ Name and Mobile are required');
      return;
    }
    
    try {
      const data = await APIService.createCustomer(newCustomer);
      const customer = { id: data.customer_id, ...newCustomer };
      
      // Add to customer list and auto-select
      setCustomers([...customers, customer]);
      handleCustomerSelect(customer);
      
      // Reset form
      setNewCustomer({ name: '', mobile: '', email: '' });
    } catch (error) {
      console.error('Failed to create customer:', error);
      alert('❌ Error creating customer: ' + (error.detail?.message || 'Unknown error'));
    }
  };
  
  const handleCreateNewPatient = async () => {
    if (!newPatient.name || !newPatient.age) {
      alert('⚠️ Name and Age are required');
      return;
    }
    
    try {
      const data = await APIService.createPatient({
        customer_id: selectedCustomer.id,
        name: newPatient.name,
        age: parseInt(newPatient.age),
        gender: newPatient.gender
      });
      
      const patient = { id: data.patient_id, ...newPatient, customer_id: selectedCustomer.id };
      
      // Add to patient list and auto-select
      setPatients([...patients, patient]);
      handlePatientSelect(patient);
      
      // Reset form
      setNewPatient({ name: '', age: '', gender: 'M' });
      setShowNewPatientForm(false);
    } catch (error) {
      console.error('Failed to create patient:', error);
      alert('❌ Error creating patient: ' + (error.detail?.message || 'Unknown error'));
    }
  };
  
  const handlePatientSelect = async (patient) => {
    setSelectedPatient(patient);
    
    // Load prescriptions
    try {
      const data = await APIService.getPatientPrescriptions(patient.id);
      setPrescriptions(data.prescriptions || []);
    } catch (error) {
      console.error('Failed to load prescriptions:', error);
    }
    
    // Create order if customer + patient selected
    if (selectedCustomer && !orderId) {
      try {
        const orderData = await APIService.createOrder({
          customer_id: selectedCustomer.id,
          patient_id: patient.id,
          location_id: user?.location_id || 'loc_store1',
          created_by: user?.user_id || 'user_sales1'
        });
        setOrderId(orderData.order_id);
      } catch (error) {
        console.error('Failed to create order:', error);
        alert('Error creating order: ' + (error.detail?.message || 'Unknown error'));
      }
    }
  };
  
  const handlePrescriptionSelect = (prescription) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(false);
  };
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    const category = PRODUCT_CATEGORIES.find(c => c.id === categoryId);
    if (category) {
      loadProducts(category.category);
    }
  };
  
  const handleAddToCart = async (product) => {
    // Check if order exists (customer + patient required)
    if (!orderId) {
      alert('⚠️ Please select Customer and Patient first');
      return;
    }
    
    // Check prescription requirement (SOFT BLOCK with message)
    const category = PRODUCT_CATEGORIES.find(c => c.category === product.category);
    if (category?.prescriptionRequired && !selectedPrescription) {
      alert('🔒 Prescription Required\n\nPlease select a prescription before adding optical lenses or contact lenses.');
      setShowPrescriptionModal(true);  // Open prescription selector as helper
      return;
    }
    
    const attributes = getDefaultAttributes(product.category);
    
    try {
      const itemData = await APIService.attachOrderItem(orderId, {
        product_id: product.id,
        quantity: 1,
        prescription_id: category?.prescriptionRequired ? selectedPrescription.id : null,
        attributes
      });
      
      setCart([...cart, { ...product, order_item_id: itemData.order_item_id, quantity: 1 }]);
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('❌ Error: ' + (error.detail?.message || 'Failed to add item'));
    }
  };
  
  const handleReviewPricing = async () => {
    if (!orderId || cart.length === 0) {
      alert('⚠️ Add products to cart first');
      return;
    }
    
    try {
      const data = await APIService.reviewPricing(orderId, user?.user_id || 'user_sales1');
      setPricingSnapshot(data.pricing_snapshot);
    } catch (error) {
      console.error('Failed to review pricing:', error);
      alert('❌ Error: ' + (error.detail?.message || 'Pricing review failed'));
    }
  };
  
  const handleLockPricing = async () => {
    try {
      await APIService.lockPricing(orderId, user?.user_id || 'user_sales1');
      alert('✅ Pricing locked successfully!\n\nOrder ready for billing (Phase 4)');
      resetPOS();
    } catch (error) {
      console.error('Failed to lock pricing:', error);
      alert('❌ Error: ' + (error.detail?.message || 'Lock failed'));
    }
  };
  
  const resetPOS = () => {
    setSelectedCustomer(null);
    setSelectedPatient(null);
    setSelectedPrescription(null);
    setOrderId(null);
    setCart([]);
    setPricingSnapshot(null);
    setPatients([]);
    setPrescriptions([]);
    loadCustomers();
    loadProducts('FRAME');
  };
  
  const getDefaultAttributes = (category) => {
    const defaults = {
      'FRAME': {
        frame_type: 'Optical',
        gender: 'Unisex',
        frame_shape: 'Rectangle',
        frame_material: 'Acetate',
        frame_colour: 'Black',
        size: '52-18-140',
        rim_type: 'Full Rim',
        frame_category: 'Mass',
        country_of_origin: 'India'
      },
      'OPTICAL_LENS': {
        lens_type: 'Single Vision',
        material: 'Plastic',
        index: '1.5',
        coating_type: 'Anti-reflective',
        power_range_supported: '-6.00 to +6.00',
        lens_category: 'Standard'
      },
      'CONTACT_LENS': {
        wear_type: 'Monthly',
        power_range: '-6.00 to +6.00',
        base_curve: '8.6',
        diameter: '14.0',
        pack_size: '6',
        expiry_tracking: 'Yes',
        batch_required: 'Yes'
      },
      'ACCESSORIES': {
        accessory_type: 'Case',
        material: 'Leather',
        usage_type: 'Storage'
      },
      'WATCHES': {
        watch_type: 'Analog',
        strap_material: 'Leather',
        dial_size: '42mm',
        water_resistance: '50m',
        warranty_period: '1 year',
        battery_type: 'Quartz'
      },
      'SERVICES': {
        service_type: 'Fitting',
        applicable_category: 'Frame',
        one_time_repeatable: 'Repeatable',
        duration: '15 minutes'
      }
    };
    
    return defaults[category] || {};
  };
  
  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="POS — Retail Counter"
        subtitle="Optical Flow: Customer → Patient → Prescription (resolver) → Products → Pricing"
        breadcrumbs={['Home', 'POS']}
        actions={
          <Button variant="outline" size="sm" onClick={resetPOS}>
            🔄 New Sale
          </Button>
        }
      />

      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Left: Context Panel (Customer, Patient, Prescription) */}
        <div className="col-span-3 space-y-4">
          {/* Customer */}
          <Card title="Customer" className="h-fit">
            {selectedCustomer ? (
              <div className="space-y-2">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-900">{selectedCustomer.name}</p>
                  <p className="text-sm text-green-700">{selectedCustomer.mobile}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowCustomerModal(true)} className="w-full">
                  Change Customer
                </Button>
              </div>
            ) : (
              <Button variant="primary" onClick={() => setShowCustomerModal(true)} className="w-full">
                + Select Customer
              </Button>
            )}
          </Card>

          {/* Patient */}
          <Card title="Patient" className="h-fit">
            {selectedPatient ? (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-900">{selectedPatient.name}</p>
                <p className="text-xs text-blue-700">Age: {selectedPatient.age}, {selectedPatient.gender}</p>
              </div>
            ) : selectedCustomer ? (
              showNewPatientForm ? (
                <div className="space-y-3">
                  <div className="bg-blue-50 p-2 rounded text-xs">
                    <p className="text-blue-800 font-medium">New Patient for {selectedCustomer.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      placeholder="Patient name"
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Age *</label>
                    <input
                      type="number"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                      placeholder="Age"
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Gender *</label>
                    <select
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1" onClick={handleCreateNewPatient}>
                      Create
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowNewPatientForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => handlePatientSelect(patient)}
                      className="p-2 border rounded cursor-pointer hover:bg-blue-50 text-sm"
                    >
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-xs text-gray-600">Age: {patient.age}</p>
                    </div>
                  ))}
                  <Button variant="primary" size="sm" className="w-full" onClick={() => setShowNewPatientForm(true)}>
                    + New Patient
                  </Button>
                </div>
              )
            ) : (
              <p className="text-sm text-gray-400">Select customer first</p>
            )}
          </Card>

          {/* Prescription (Resolver) */}
          <Card title="Prescription (Resolver)" className="h-fit border-2 border-blue-500">
            {selectedPrescription ? (
              <div className="space-y-2">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="font-semibold text-purple-900 text-sm">✅ Prescription Selected</p>
                  <p className="text-xs text-purple-700 mt-1">ID: {selectedPrescription.id.substring(0, 8)}</p>
                  <p className="text-xs text-purple-600">Valid until: {new Date(selectedPrescription.expiry_date).toLocaleDateString()}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowPrescriptionModal(true)} className="w-full">
                  Change Prescription
                </Button>
              </div>
            ) : selectedPatient ? (
              <div className="space-y-2">
                <div className="p-2 bg-yellow-50 border border-yellow-300 rounded text-xs">
                  <p className="text-yellow-800">🔒 Required for Lens/Contact Lens</p>
                </div>
                <Button variant="primary" size="sm" onClick={() => setShowPrescriptionModal(true)} className="w-full">
                  Select Prescription
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Select patient first</p>
            )}
          </Card>

          {/* Order Info */}
          {orderId && (
            <Card title="Order Info" className="h-fit">
              <div className="text-xs space-y-1">
                <p className="text-gray-600">Order ID:</p>
                <p className="font-mono text-xs break-all">{orderId}</p>
                <Badge variant="success" size="sm">Order Created</Badge>
              </div>
            </Card>
          )}
        </div>

        {/* Center: Product Selection (ALWAYS VISIBLE) */}
        <div className="col-span-6 space-y-4">
          <Card title="Product Selection" className="h-fit">
            {/* Category Tabs - ALL 7 CATEGORIES ALWAYS VISIBLE */}
            <div className="flex gap-2 border-b pb-2 mb-4 flex-wrap">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-t transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Prescription Required Warning (Soft Block - VISIBLE but informative) */}
            {PRODUCT_CATEGORIES.find(c => c.id === activeCategory)?.prescriptionRequired && !selectedPrescription && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">🔒</div>
                  <div>
                    <p className="font-semibold text-yellow-800">Prescription Required</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Select a prescription from the left panel to add optical lenses or contact lenses.
                    </p>
                    <Button
                      variant="warning"
                      size="sm"
                      className="mt-2"
                      onClick={() => setShowPrescriptionModal(true)}
                    >
                      Select Prescription Now
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid (ALWAYS VISIBLE) */}
            <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleAddToCart(product)}
                  className="border rounded-lg p-3 hover:shadow-lg transition-all cursor-pointer hover:border-blue-500"
                >
                  <p className="font-semibold text-sm truncate">{product.name}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-600">MRP: <span className="font-semibold">₹{product.mrp}</span></p>
                    {product.offer_price !== product.mrp && (
                      <p className="text-xs text-green-600">Offer: <span className="font-semibold">₹{product.offer_price}</span></p>
                    )}
                  </div>
                  <Badge variant="primary" size="sm" className="mt-2">{product.category}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Cart & Pricing (ALWAYS VISIBLE) */}
        <div className="col-span-3 space-y-4">
          {/* Cart */}
          <Card title={`Cart (${cart.length})`} className="h-fit">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No items in cart</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-sm border-b pb-2">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.offer_price}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {cart.length > 0 && (
              <Button variant="primary" className="w-full mt-4" onClick={handleReviewPricing}>
                Review Pricing
              </Button>
            )}
          </Card>

          {/* Pricing Summary (Server-Driven, ALWAYS VISIBLE) */}
          <Card title="Pricing" className="h-fit">
            {pricingSnapshot ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{pricingSnapshot.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>CGST</span>
                  <span>₹{pricingSnapshot.gst_breakdown.cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>SGST</span>
                  <span>₹{pricingSnapshot.gst_breakdown.sgst.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Grand Total</span>
                  <span className="text-blue-600">₹{pricingSnapshot.grand_total.toFixed(2)}</span>
                </div>
                
                <div className="pt-3 border-t space-y-2">
                  <Button variant="success" className="w-full" onClick={handleLockPricing}>
                    🔒 Lock & Proceed
                  </Button>
                  <p className="text-xs text-center text-gray-500">Pricing will be locked (irreversible)</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">
                <p className="text-sm">Add items and review pricing</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Customer Selection Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Select or Create Customer</h3>
                <button onClick={() => { setShowCustomerModal(false); setShowNewCustomerForm(false); }} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
              
              {!showNewCustomerForm ? (
                <>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search by mobile or name"
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto space-y-2 mb-4">
                    {customers.filter(c =>
                      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                      c.mobile.includes(customerSearch)
                    ).map((customer) => (
                      <div
                        key={customer.id}
                        onClick={() => handleCustomerSelect(customer)}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                      >
                        <p className="font-semibold">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.mobile}</p>
                        {customer.email && <p className="text-xs text-gray-500">{customer.email}</p>}
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="primary" className="w-full" onClick={() => setShowNewCustomerForm(true)}>
                    + Create New Customer
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">New Customer Form</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      placeholder="Enter customer name"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile *</label>
                    <input
                      type="tel"
                      value={newCustomer.mobile}
                      onChange={(e) => setNewCustomer({ ...newCustomer, mobile: e.target.value })}
                      placeholder="Enter mobile number"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="primary" className="flex-1" onClick={handleCreateNewCustomer}>
                      Create Customer
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setShowNewCustomerForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Prescription Selection Modal */}
      {showPrescriptionModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Select Prescription for {selectedPatient.name}</h3>
                <button onClick={() => setShowPrescriptionModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Required for:</strong> Optical Lenses, Contact Lenses
                </p>
              </div>
              
              <div className="max-h-96 overflow-y-auto space-y-3">
                {prescriptions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No prescriptions found for this patient</p>
                  </div>
                ) : (
                  prescriptions.map((rx) => {
                    const isExpired = new Date(rx.expiry_date) < new Date();
                    return (
                      <div
                        key={rx.id}
                        onClick={() => !isExpired && handlePrescriptionSelect(rx)}
                        className={`p-4 border-2 rounded-lg ${
                          isExpired
                            ? 'bg-red-50 border-red-300 cursor-not-allowed opacity-60'
                            : 'cursor-pointer hover:border-blue-500 hover:shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={isExpired ? 'danger' : 'success'}>
                                {isExpired ? '❌ Expired' : '✅ Valid'}
                              </Badge>
                              <span className="text-xs text-gray-600">
                                {isExpired ? `Expired: ${new Date(rx.expiry_date).toLocaleDateString()}` : `Valid until: ${new Date(rx.expiry_date).toLocaleDateString()}`}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">By: {rx.prescribed_by}</p>
                            <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-2 rounded">
                              <div>
                                <strong>Right Eye:</strong>
                                <div className="font-mono mt-1">
                                  SPH {rx.sph_r} CYL {rx.cyl_r} AXIS {rx.axis_r}
                                </div>
                              </div>
                              <div>
                                <strong>Left Eye:</strong>
                                <div className="font-mono mt-1">
                                  SPH {rx.sph_l} CYL {rx.cyl_l} AXIS {rx.axis_l}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1">+ Create New Prescription</Button>
                <Button variant="outline" className="flex-1">📤 Upload Prescription</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSCanvas;
