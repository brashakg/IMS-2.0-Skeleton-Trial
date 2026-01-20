import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import APIService from '../../services/api';

const PRODUCT_CATEGORIES = [
  { id: 'FRAME_OPTICAL', name: 'Spectacles', category: 'FRAME', icon: '👓', prescriptionRequired: false },
  { id: 'FRAME_SUNGLASS', name: 'Sunglasses', category: 'FRAME', icon: '🕶️', prescriptionRequired: false },
  { id: 'CONTACT_LENS', name: 'Contact Lens', category: 'CONTACT_LENS', icon: '👁️', prescriptionRequired: true },
  { id: 'WATCHES', name: 'Watch', category: 'WATCHES', icon: '⌚', prescriptionRequired: false },
  { id: 'ACCESSORIES', name: 'Accessories', category: 'ACCESSORIES', icon: '🎒', prescriptionRequired: false },
  { id: 'OPTICAL_LENS', name: 'Repair', category: 'SERVICES', icon: '🔧', prescriptionRequired: false },
];

const POSCanvasRevised = () => {
  const { user } = useAuth();
  
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('FRAME_OPTICAL');
  const [pricingSnapshot, setPricingSnapshot] = useState(null);
  
  const [customers, setCustomers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  const [loading, setLoading] = useState(false);
  
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
      setCustomers([...customers, customer]);
      handleCustomerSelect(customer);
      setNewCustomer({ name: '', mobile: '', email: '' });
    } catch (error) {
      alert('❌ Error: ' + (error.detail?.message || 'Failed'));
    }
  };
  
  const handlePatientSelect = async (patient) => {
    setSelectedPatient(patient);
    
    try {
      const data = await APIService.getPatientPrescriptions(patient.id);
      setPrescriptions(data.prescriptions || []);
    } catch (error) {
      console.error('Failed to load prescriptions:', error);
    }
    
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
        alert('Error creating order: ' + (error.detail?.message || 'Unknown'));
      }
    }
  };
  
  const handleCreateNewPatient = async () => {
    if (!newPatient.name || !newPatient.age) {
      alert('⚠️ Name and Age required');
      return;
    }
    
    try {
      const data = await APIService.createPatient({
        customer_id: selectedCustomer.id,
        ...newPatient,
        age: parseInt(newPatient.age)
      });
      
      const patient = { id: data.patient_id, ...newPatient, customer_id: selectedCustomer.id };
      setPatients([...patients, patient]);
      handlePatientSelect(patient);
      setNewPatient({ name: '', age: '', gender: 'M' });
      setShowNewPatientForm(false);
    } catch (error) {
      alert('❌ Error: ' + (error.detail?.message || 'Failed'));
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
    if (!orderId) {
      alert('⚠️ Select Customer and Patient first');
      return;
    }
    
    const category = PRODUCT_CATEGORIES.find(c => c.category === product.category);
    if (category?.prescriptionRequired && !selectedPrescription) {
      alert('🔒 Prescription Required');
      setShowPrescriptionModal(true);
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
      alert('❌ ' + (error.detail?.message || 'Failed'));
    }
  };
  
  const handleReviewPricing = async () => {
    if (!orderId || cart.length === 0) return;
    
    setLoading(true);
    try {
      const data = await APIService.reviewPricing(orderId, user?.user_id || 'user_sales1');
      setPricingSnapshot(data.pricing_snapshot);
    } catch (error) {
      alert('❌ ' + (error.detail?.message || 'Failed'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleLockPricing = async () => {
    setLoading(true);
    try {
      await APIService.lockPricing(orderId, user?.user_id || 'user_sales1');
      
      if (window.confirm('Pricing locked! Proceed to billing?')) {
        window.location.href = '/pos/billing';
      } else {
        resetPOS();
      }
    } catch (error) {
      alert('❌ ' + (error.detail?.message || 'Failed'));
    } finally {
      setLoading(false);
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
      'FRAME': { frame_type: 'Optical', gender: 'Unisex', frame_shape: 'Rectangle', frame_material: 'Acetate', frame_colour: 'Black', size: '52-18-140', rim_type: 'Full Rim', frame_category: 'Mass', country_of_origin: 'India' },
      'OPTICAL_LENS': { lens_type: 'Single Vision', material: 'Plastic', index: '1.5', coating_type: 'Anti-reflective', power_range_supported: '-6.00 to +6.00', lens_category: 'Standard' },
      'CONTACT_LENS': { wear_type: 'Monthly', power_range: '-6.00 to +6.00', base_curve: '8.6', diameter: '14.0', pack_size: '6', expiry_tracking: 'Yes', batch_required: 'Yes' },
      'ACCESSORIES': { accessory_type: 'Case', material: 'Leather', usage_type: 'Storage' },
      'WATCHES': { watch_type: 'Analog', strap_material: 'Leather', dial_size: '42mm', water_resistance: '50m', warranty_period: '1 year', battery_type: 'Quartz' },
      'SERVICES': { service_type: 'Fitting', applicable_category: 'Frame', one_time_repeatable: 'Repeatable', duration: '15 minutes' }
    };
    return defaults[category] || {};
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Top Section: Customer Search */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Search Customer (by Name or Phone)</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type customer name or phone number..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button
                onClick={() => setShowCustomerModal(true)}
                className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark font-medium"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>

        {/* Selected Customer/Patient/Prescription Bar */}
        {(selectedCustomer || selectedPatient || selectedPrescription) && (
          <div className="mt-3 flex items-center gap-4 text-sm">
            {selectedCustomer && (
              <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                <span className="font-medium text-green-800">👤 {selectedCustomer.name}</span>
                <span className="text-green-600 ml-2">({selectedCustomer.mobile})</span>
              </div>
            )}
            {selectedPatient && (
              <div className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="font-medium text-blue-800">🧑 {selectedPatient.name}</span>
              </div>
            )}
            {selectedPrescription && (
              <div className="px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg">
                <span className="font-medium text-purple-800">📋 Prescription</span>
              </div>
            )}
            {orderId && (
              <div className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-lg">
                <span className="text-xs text-gray-600">Order: {orderId.substring(0, 8)}...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
        {/* Left: Product Categories & Items */}
        <div className="col-span-8 space-y-4 overflow-y-auto">
          {/* Category Buttons */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex gap-2 flex-wrap">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Prescription Panel (if prescription required category) */}
          {PRODUCT_CATEGORIES.find(c => c.id === activeCategory)?.prescriptionRequired && !selectedPrescription && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔒</span>
                <div>
                  <p className="font-semibold text-yellow-800">Prescription Required</p>
                  <p className="text-sm text-yellow-700">Select prescription to add optical products</p>
                </div>
                <button
                  onClick={() => setShowPrescriptionModal(true)}
                  className="ml-auto px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                >
                  Select
                </button>
              </div>
            </div>
          )}

          {/* Prescription Details Display */}
          {selectedPrescription && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">Prescription Details</h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Valid</span>
              </div>
              <div className="grid grid-cols-5 gap-4 text-sm">
                <div className="font-semibold text-gray-600">Eye</div>
                <div className="font-semibold text-gray-600">SPH</div>
                <div className="font-semibold text-gray-600">CYL</div>
                <div className="font-semibold text-gray-600">AXIS</div>
                <div className="font-semibold text-gray-600">VISION</div>
                
                <div>Right (OD)</div>
                <div>{selectedPrescription.sph_r}</div>
                <div>{selectedPrescription.cyl_r}</div>
                <div>{selectedPrescription.axis_r}</div>
                <div>6/6+</div>
                
                <div>Left (OS)</div>
                <div>{selectedPrescription.sph_l}</div>
                <div>{selectedPrescription.cyl_l}</div>
                <div>{selectedPrescription.axis_l}</div>
                <div>6/6+</div>
              </div>
            </div>
          )}

          {/* Order Items / Product Grid */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
            
            {/* Barcode Input */}
            <div className="mb-4">
              <label className="block text-xs text-gray-600 mb-1">Quick Add by Barcode</label>
              <input
                type="text"
                placeholder="||||| Scan barcode..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary"
              />
            </div>

            {/* Cart Items or Product Grid */}
            {cart.length > 0 ? (
              <div className="space-y-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-600">{item.category} • Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.offer_price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleAddToCart(product)}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-brand-primary hover:shadow-md transition-all"
                  >
                    <p className="font-semibold text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-600 mt-1">₹{product.mrp}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Details & Payment */}
        <div className="col-span-4 space-y-4 overflow-y-auto">
          {/* Order Details Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Order Details</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <label className="text-xs text-gray-600">Delivery Date</label>
                <input type="date" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" />
              </div>
              
              <div>
                <label className="text-xs text-gray-600">Sales Person</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm">
                  <option>Select Sales Person</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-gray-600">Notes</label>
                <textarea rows={2} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm" placeholder="Any special instructions..."></textarea>
              </div>
            </div>
          </div>

          {/* Payment Collection */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Payment Collection</h3>
            
            {pricingSnapshot ? (
              <div className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sub Total</span>
                    <span className="font-semibold">₹{pricingSnapshot.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>GST</span>
                    <span>₹{(pricingSnapshot.gst_breakdown.cgst + pricingSnapshot.gst_breakdown.sgst).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-lg font-bold">
                    <span>Net Total</span>
                    <span className="text-brand-primary">₹{pricingSnapshot.grand_total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <button
                    onClick={handleLockPricing}
                    disabled={loading}
                    className="w-full py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-dark font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Save Order'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-center py-6 text-gray-400">
                  <p className="text-sm">Add items to calculate total</p>
                </div>
                <button
                  onClick={handleReviewPricing}
                  disabled={cart.length === 0 || loading}
                  className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  Calculate Total
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add New Customer</h3>
                <button onClick={() => { setShowCustomerModal(false); setShowNewCustomerForm(false); }} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              
              {!showNewCustomerForm ? (
                <>
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                  />
                  
                  <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
                    {customers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.mobile.includes(customerSearch)).map((customer) => (
                      <div key={customer.id} onClick={() => handleCustomerSelect(customer)} className="p-3 border rounded-lg cursor-pointer hover:bg-blue-50">
                        <p className="font-semibold">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.mobile}</p>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={() => setShowNewCustomerForm(true)} className="w-full py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark">+ Create New Customer</button>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <input type="text" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mobile *</label>
                    <input type="tel" value={newCustomer.mobile} onChange={(e) => setNewCustomer({ ...newCustomer, mobile: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleCreateNewCustomer} className="flex-1 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark">Create</button>
                    <button onClick={() => setShowNewCustomerForm(false)} className="flex-1 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Prescription Modal */}
      {showPrescriptionModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Select Prescription</h3>
                <button onClick={() => setShowPrescriptionModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              
              <div className="space-y-3">
                {prescriptions.map((rx) => {
                  const isExpired = new Date(rx.expiry_date) < new Date();
                  return (
                    <div key={rx.id} onClick={() => !isExpired && handlePrescriptionSelect(rx)} className={`p-4 border-2 rounded-lg cursor-pointer ${isExpired ? 'bg-red-50 border-red-300 opacity-60 cursor-not-allowed' : 'hover:border-brand-primary'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${isExpired ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                          {isExpired ? '❌ Expired' : '✅ Valid'}
                        </span>
                        <span className="text-xs text-gray-600">{new Date(rx.prescription_date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">By: {rx.prescribed_by}</p>
                      <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-3 rounded">
                        <div>
                          <strong>Right Eye:</strong>
                          <div className="font-mono mt-1">SPH {rx.sph_r} CYL {rx.cyl_r} AXIS {rx.axis_r}</div>
                        </div>
                        <div>
                          <strong>Left Eye:</strong>
                          <div className="font-mono mt-1">SPH {rx.sph_l} CYL {rx.cyl_l} AXIS {rx.axis_l}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSCanvasRevised;
