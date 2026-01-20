import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import APIService from '../../services/api';

const PRODUCT_CATEGORIES = [
  { id: 'FRAME_OPTICAL', name: 'Frames', category: 'FRAME', icon: '👓', prescriptionRequired: false },
  { id: 'OPTICAL_LENS', name: 'Lenses', category: 'OPTICAL_LENS', icon: '🔬', prescriptionRequired: true },
  { id: 'CONTACT_LENS', name: 'Contacts', category: 'CONTACT_LENS', icon: '👁️', prescriptionRequired: true },
  { id: 'FRAME_SUNGLASS', name: 'Sunglasses', category: 'FRAME', icon: '🕶️', prescriptionRequired: false },
  { id: 'ACCESSORIES', name: 'Accessories', category: 'ACCESSORIES', icon: '🎒', prescriptionRequired: false },
  { id: 'WATCHES', name: 'Watches', category: 'WATCHES', icon: '⌚', prescriptionRequired: false },
];

const POSFinal = () => {
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
      console.error(error);
    }
  };
  
  const loadProducts = async (category) => {
    try {
      const data = await APIService.searchProducts(category);
      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };
  
  const handleCreateNewCustomer = async () => {
    if (!newCustomer.name || !newCustomer.mobile) {
      alert('Name and Mobile are required');
      return;
    }
    
    try {
      const data = await APIService.createCustomer(newCustomer);
      const customer = { id: data.customer_id, ...newCustomer };
      setCustomers([...customers, customer]);
      handleCustomerSelect(customer);
      setNewCustomer({ name: '', mobile: '', email: '' });
    } catch (error) {
      alert('Error: ' + (error.detail?.message || 'Failed'));
    }
  };
  
  const handlePatientSelect = async (patient) => {
    setSelectedPatient(patient);
    
    try {
      const data = await APIService.getPatientPrescriptions(patient.id);
      setPrescriptions(data.prescriptions || []);
    } catch (error) {
      console.error(error);
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
        alert('Error creating order');
      }
    }
  };
  
  const handleCreateNewPatient = async () => {
    if (!newPatient.name || !newPatient.age) {
      alert('Name and Age required');
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
      alert('Error');
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
      alert('Please select Customer and Patient first');
      return;
    }
    
    const category = PRODUCT_CATEGORIES.find(c => c.category === product.category);
    if (category?.prescriptionRequired && !selectedPrescription) {
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
      alert(error.detail?.message || 'Failed to add item');
    }
  };
  
  const handleReviewPricing = async () => {
    if (!orderId || cart.length === 0) return;
    
    setLoading(true);
    try {
      const data = await APIService.reviewPricing(orderId, user?.user_id || 'user_sales1');
      setPricingSnapshot(data.pricing_snapshot);
    } catch (error) {
      alert(error.detail?.message || 'Failed');
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
      alert(error.detail?.message || 'Failed');
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
    <div className="h-full flex flex-col">
      {/* Main Content: 3-Column Layout */}
      <div className="flex-1 grid grid-cols-12 gap-6 p-6 overflow-hidden">
        
        {/* LEFT ZONE: Context (De-emphasized) */}
        <div className="col-span-3 space-y-4 overflow-y-auto">
          {/* Customer */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Customer</h3>
            {selectedCustomer ? (
              <div className="space-y-2">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-medium text-green-900 text-sm">{selectedCustomer.name}</p>
                  <p className="text-xs text-green-700">{selectedCustomer.mobile}</p>
                </div>
                <button onClick={() => setShowCustomerModal(true)} className="w-full text-xs text-blue-600 hover:text-blue-800">
                  Change Customer
                </button>
              </div>
            ) : (
              <button onClick={() => setShowCustomerModal(true)} className="w-full py-2 px-4 bg-brand-primary text-white rounded-lg hover:bg-brand-dark text-sm font-medium">
                + Select Customer
              </button>
            )}
          </div>

          {/* Patient */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Patient</h3>
            {selectedPatient ? (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900 text-sm">{selectedPatient.name}</p>
                <p className="text-xs text-blue-700">Age {selectedPatient.age}, {selectedPatient.gender}</p>
              </div>
            ) : selectedCustomer ? (
              showNewPatientForm ? (
                <div className="space-y-2">
                  <input type="text" placeholder="Name" value={newPatient.name} onChange={(e) => setNewPatient({...newPatient, name: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                  <input type="number" placeholder="Age" value={newPatient.age} onChange={(e) => setNewPatient({...newPatient, age: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                  <select value={newPatient.gender} onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                  <div className="flex gap-2">
                    <button onClick={handleCreateNewPatient} className="flex-1 py-1.5 bg-brand-primary text-white rounded text-sm">Create</button>
                    <button onClick={() => setShowNewPatientForm(false)} className="flex-1 py-1.5 bg-gray-100 rounded text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {patients.map(p => (
                    <div key={p.id} onClick={() => handlePatientSelect(p)} className="p-2 border rounded cursor-pointer hover:bg-blue-50 text-sm">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-gray-600">Age {p.age}</p>
                    </div>
                  ))}
                  <button onClick={() => setShowNewPatientForm(true)} className="w-full py-1.5 text-sm text-brand-primary hover:text-brand-dark">+ New Patient</button>
                </div>
              )
            ) : (
              <p className="text-xs text-gray-400">Select customer first</p>
            )}
          </div>

          {/* Prescription */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Prescription</h3>
            {selectedPrescription ? (
              <div className="space-y-2">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="font-medium text-purple-900 text-xs">✓ Selected</p>
                  <p className="text-xs text-purple-700 mt-1">ID: {selectedPrescription.id.substring(0, 8)}</p>
                </div>
                <button onClick={() => setShowPrescriptionModal(true)} className="w-full text-xs text-blue-600 hover:text-blue-800">
                  Change
                </button>
              </div>
            ) : selectedPatient ? (
              <button onClick={() => setShowPrescriptionModal(true)} className="w-full py-2 px-4 border-2 border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 text-sm font-medium">
                Select Prescription
              </button>
            ) : (
              <p className="text-xs text-gray-400">Select patient first</p>
            )}
          </div>

          {orderId && (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500">Order ID</p>
              <p className="text-xs font-mono text-gray-700 mt-1 break-all">{orderId}</p>
            </div>
          )}
        </div>

        {/* CENTER ZONE: Products (Dominant Focus) */}
        <div className="col-span-6 space-y-4 overflow-y-auto">
          {/* Category Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex gap-2 flex-wrap mb-4">
              {PRODUCT_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Prescription Warning (Soft Block) */}
            {PRODUCT_CATEGORIES.find(c => c.id === activeCategory)?.prescriptionRequired && !selectedPrescription && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔒</div>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-900 text-sm">Prescription Required</p>
                    <p className="text-xs text-amber-700 mt-1">Select a prescription to add optical products</p>
                  </div>
                  <button onClick={() => setShowPrescriptionModal(true)} className="px-3 py-1.5 bg-amber-600 text-white rounded text-xs font-medium hover:bg-amber-700">
                    Select
                  </button>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-3">
              {products.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleAddToCart(product)}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-brand-primary hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-sm text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500 mt-1">MRP ₹{product.mrp}</p>
                  {product.offer_price !== product.mrp && (
                    <p className="text-xs text-green-600 mt-0.5">Offer ₹{product.offer_price}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT ZONE: Cart & Pricing (Clear, Sticky) */}
        <div className="col-span-3 space-y-4 overflow-y-auto">
          {/* Cart */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Cart ({cart.length})</h3>
            {cart.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-xs text-gray-400">No items added</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start py-2 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">₹{item.offer_price}</p>
                  </div>
                ))}
              </div>
            )}
            
            {cart.length > 0 && !pricingSnapshot && (
              <button
                onClick={handleReviewPricing}
                disabled={loading}
                className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Calculating...' : 'Calculate Total'}
              </button>
            )}
          </div>

          {/* Pricing Summary */}
          {pricingSnapshot && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Pricing</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{pricingSnapshot.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>GST</span>
                  <span>₹{(pricingSnapshot.gst_breakdown.cgst + pricingSnapshot.gst_breakdown.sgst).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-brand-primary">₹{pricingSnapshot.grand_total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleLockPricing}
                disabled={loading}
                className="w-full mt-4 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-dark font-semibold disabled:opacity-50 text-sm"
              >
                {loading ? 'Processing...' : 'Lock & Proceed to Billing'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Customer Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Select Customer</h3>
                <button onClick={() => { setShowCustomerModal(false); setShowNewCustomerForm(false); }} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
              </div>
              
              {!showNewCustomerForm ? (
                <>
                  <input
                    type="text"
                    placeholder="Search by name or mobile..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  
                  <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
                    {customers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.mobile.includes(customerSearch)).map(customer => (
                      <div key={customer.id} onClick={() => handleCustomerSelect(customer)} className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-brand-primary hover:bg-blue-50 transition-all">
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.mobile}</p>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={() => setShowNewCustomerForm(true)} className="w-full py-2.5 bg-brand-primary text-white rounded-lg hover:bg-brand-dark font-medium">
                    + Create New Customer
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input type="text" value={newCustomer.name} onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile *</label>
                    <input type="tel" value={newCustomer.mobile} onChange={(e) => setNewCustomer({...newCustomer, mobile: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={newCustomer.email} onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleCreateNewCustomer} className="flex-1 py-2.5 bg-brand-primary text-white rounded-lg hover:bg-brand-dark font-medium">Create Customer</button>
                    <button onClick={() => setShowNewCustomerForm(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">Cancel</button>
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
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Select Prescription</h3>
                <button onClick={() => setShowPrescriptionModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
              </div>
              
              <div className="space-y-3">
                {prescriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No prescriptions found</p>
                    <p className="text-xs text-gray-400 mt-2">Create a new prescription to continue</p>
                  </div>
                ) : (
                  prescriptions.map(rx => {
                    const isExpired = new Date(rx.expiry_date) < new Date();
                    return (
                      <div
                        key={rx.id}
                        onClick={() => !isExpired && handlePrescriptionSelect(rx)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          isExpired
                            ? 'border-red-200 bg-red-50 opacity-60 cursor-not-allowed'
                            : 'border-gray-200 hover:border-brand-primary cursor-pointer'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className={`text-xs px-2 py-1 rounded font-medium ${isExpired ? 'bg-red-200 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {isExpired ? '✗ Expired' : '✓ Valid'}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(rx.prescription_date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">By: {rx.prescribed_by}</p>
                        <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-3 rounded">
                          <div>
                            <p className="font-semibold text-gray-700 mb-1">Right Eye</p>
                            <p className="font-mono text-gray-600">SPH {rx.sph_r} CYL {rx.cyl_r} AXIS {rx.axis_r}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700 mb-1">Left Eye</p>
                            <p className="font-mono text-gray-600">SPH {rx.sph_l} CYL {rx.cyl_l} AXIS {rx.axis_l}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSFinal;
