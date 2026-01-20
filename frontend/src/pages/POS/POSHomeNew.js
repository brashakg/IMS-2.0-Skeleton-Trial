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

const POSHomeNew = () => {
  const { user } = useAuth();
  
  // POS Flow Steps (STRICT ORDER - Build Pass 4)
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('FRAME_OPTICAL');
  const [pricingSnapshot, setPricingSnapshot] = useState(null);
  
  // Search states
  const [customerSearch, setCustomerSearch] = useState('');
  const [customers, setCustomers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [products, setProducts] = useState([]);
  
  // Load customers on mount
  useEffect(() => {
    loadCustomers();
  }, []);
  
  const loadCustomers = async () => {
    try {
      const data = await APIService.searchCustomers();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Failed to load customers:', error);
    }
  };
  
  const handleCustomerSelect = async (customer) => {
    setSelectedCustomer(customer);
    // Load patients for this customer
    try {
      const data = await APIService.getCustomerPatients(customer.id);
      setPatients(data.patients || []);
      setCurrentStep(2);
    } catch (error) {
      console.error('Failed to load patients:', error);
    }
  };
  
  const handlePatientSelect = async (patient) => {
    setSelectedPatient(patient);
    // Load prescriptions for this patient
    try {
      const data = await APIService.getPatientPrescriptions(patient.id);
      setPrescriptions(data.prescriptions || []);
      setCurrentStep(3); // PRESCRIPTION STEP (MANDATORY for optical)
    } catch (error) {
      console.error('Failed to load prescriptions:', error);
    }
  };
  
  const handlePrescriptionSelect = async (prescription) => {
    setSelectedPrescription(prescription);
    
    // Create order now that we have Customer + Patient + Prescription
    try {
      const orderData = await APIService.createOrder({
        customer_id: selectedCustomer.id,
        patient_id: selectedPatient.id,
        location_id: user?.store || 'loc_store1',
        created_by: user?.id || 'user_sales1'
      });
      
      setOrderId(orderData.order_id);
      setCurrentStep(4); // PRODUCT SELECTION
      
      // Load products for first category
      loadProducts('FRAME');
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Error creating order: ' + (error.detail?.message || 'Unknown error'));
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
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    const category = PRODUCT_CATEGORIES.find(c => c.id === categoryId);
    if (category) {
      loadProducts(category.category);
    }
  };
  
  const handleAddToCart = async (product) => {
    if (!orderId) {
      alert('Please complete customer, patient, and prescription selection first');
      return;
    }
    
    // Check if prescription required
    const category = PRODUCT_CATEGORIES.find(c => c.category === product.category);
    if (category?.prescriptionRequired && !selectedPrescription) {
      alert('🔒 Prescription required for ' + category.name);
      return;
    }
    
    // TODO: Show attribute form based on category
    // For now, using default attributes
    const attributes = getDefaultAttributes(product.category);
    
    try {
      const itemData = await APIService.attachOrderItem(orderId, {
        product_id: product.id,
        quantity: 1,
        prescription_id: category?.prescriptionRequired ? selectedPrescription.id : null,
        attributes
      });
      
      // Add to cart (local state)
      setCart([...cart, { ...product, order_item_id: itemData.order_item_id, quantity: 1 }]);
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('Error: ' + (error.detail?.message || 'Failed to add item'));
    }
  };
  
  const handleReviewPricing = async () => {
    try {
      const data = await APIService.reviewPricing(orderId, user?.id || 'user_sales1');
      setPricingSnapshot(data.pricing_snapshot);
      setCurrentStep(5); // PRICING REVIEW
    } catch (error) {
      console.error('Failed to review pricing:', error);
      alert('Error: ' + (error.detail?.message || 'Pricing review failed'));
    }
  };
  
  const handleLockPricing = async () => {
    try {
      await APIService.lockPricing(orderId, user?.id || 'user_sales1');
      alert('✅ Pricing locked successfully! Order ready for billing (Phase 4)');
      // Reset flow
      resetPOSFlow();
    } catch (error) {
      console.error('Failed to lock pricing:', error);
      alert('Error: ' + (error.detail?.message || 'Lock failed'));
    }
  };
  
  const resetPOSFlow = () => {
    setCurrentStep(1);
    setSelectedCustomer(null);
    setSelectedPatient(null);
    setSelectedPrescription(null);
    setOrderId(null);
    setCart([]);
    setPricingSnapshot(null);
    loadCustomers();
  };
  
  const getDefaultAttributes = (category) => {
    // Simplified for Phase 3A - return minimal mandatory attributes
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
        power_range_supported': '-6.00 to +6.00',
        lens_category: 'Standard'
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
      }
    };
    
    return defaults[category] || {};
  };
  
  return (
    <div>
      <PageHeader
        title="POS - New Sale (Phase 3A)"
        subtitle={`Optical Flow: Customer → Patient → Prescription → Product → Pricing → Lock`}
        breadcrumbs={['Home', 'POS', 'New Sale']}
        actions={
          <Button variant="outline" size="sm" onClick={resetPOSFlow}>
            🔄 Reset Flow
          </Button>
        }
      />

      {/* Flow Progress Indicator */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          {['Customer', 'Patient', 'Prescription', 'Products', 'Pricing'].map((step, idx) => (
            <div key={idx} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold $${
                currentStep > idx + 1 ? 'bg-green-500 text-white' :
                currentStep === idx + 1 ? 'bg-blue-500 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {idx + 1}
              </div>
              <span className="ml-2 text-sm font-medium">{step}</span>
              {idx < 4 && <span className="mx-4 text-gray-400">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Flow Steps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* STEP 1: CUSTOMER SELECTION */}
          {currentStep === 1 && (
            <Card title="Step 1: Select Customer">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search by mobile or name"
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <Button variant="primary">Search</Button>
                  <Button variant="outline">New Customer</Button>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  {customers.filter(c => 
                    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                    c.mobile.includes(customerSearch)
                  ).map((customer) => (
                    <div
                      key={customer.id}
                      onClick={() => handleCustomerSelect(customer)}
                      className="p-3 border rounded-lg mb-2 cursor-pointer hover:bg-blue-50"
                    >
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.mobile}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* STEP 2: PATIENT SELECTION */}
          {currentStep === 2 && (
            <Card title={`Step 2: Select Patient for ${selectedCustomer?.name}`}>
              <div className="space-y-4">
                <Button variant="outline" size="sm">+ New Patient</Button>
                
                <div className="space-y-2">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => handlePatientSelect(patient)}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-blue-50"
                    >
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-600">Age: {patient.age}, Gender: {patient.gender}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* STEP 3: PRESCRIPTION SELECTION (CRITICAL FOR OPTICAL) */}
          {currentStep === 3 && (
            <Card title={`Step 3: Select Prescription for ${selectedPatient?.name}`} className="border-2 border-blue-500">
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-blue-800">
                  <strong>🔒 Prescription Required for Optical Sales</strong>
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Lens and Contact Lens categories are locked until prescription is selected.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">+ Create New Prescription</Button>
                  <Button variant="outline" size="sm">Upload Prescription</Button>
                </div>
                
                <div className="space-y-2">
                  {prescriptions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No prescriptions found for this patient</p>
                      <p className="text-sm mt-2">Create a new prescription to continue</p>
                    </div>
                  ) : (
                    prescriptions.map((rx) => {
                      const isExpired = new Date(rx.expiry_date) < new Date();
                      return (
                        <div
                          key={rx.id}
                          onClick={() => !isExpired && handlePrescriptionSelect(rx)}
                          className={`p-4 border rounded-lg ${
                            isExpired
                              ? 'bg-red-50 border-red-300 cursor-not-allowed'
                              : 'cursor-pointer hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Prescription ID: {rx.id.substring(0, 8)}</p>
                              <p className="text-sm text-gray-600">Date: {new Date(rx.prescription_date).toLocaleDateString()}</p>
                              <p className="text-sm text-gray-600">By: {rx.prescribed_by}</p>
                              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <strong>Right Eye:</strong> SPH {rx.sph_r} CYL {rx.cyl_r} AXIS {rx.axis_r}
                                </div>
                                <div>
                                  <strong>Left Eye:</strong> SPH {rx.sph_l} CYL {rx.cyl_l} AXIS {rx.axis_l}
                                </div>
                              </div>
                            </div>
                            <div>
                              {isExpired ? (
                                <Badge variant="danger">Expired</Badge>
                              ) : (
                                <Badge variant="success">Valid until {new Date(rx.expiry_date).toLocaleDateString()}</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* STEP 4: PRODUCT SELECTION (Category Tabs - ALL CATEGORIES) */}
          {currentStep >= 4 && (
            <Card title="Step 4: Select Products">
              {/* Category Tabs (ALL CATEGORIES VISIBLE) */}
              <div className="flex gap-2 border-b border-gray-200 mb-4 flex-wrap">
                {PRODUCT_CATEGORIES.map((cat) => {
                  const isPrescriptionRequired = cat.prescriptionRequired;
                  const isLocked = isPrescriptionRequired && !selectedPrescription;
                  
                  return (
                    <button
                      key={cat.id}
                      onClick={() => !isLocked && handleCategoryChange(cat.id)}
                      disabled={isLocked}
                      className={`px-4 py-2 font-medium transition-colors relative ${
                        activeCategory === cat.id
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {cat.icon} {cat.name}
                      {isLocked && <span className="ml-2">🔒</span>}
                    </button>
                  );
                })}
              </div>

              {/* Prescription Required Warning */}
              {PRODUCT_CATEGORIES.find(c => c.id === activeCategory)?.prescriptionRequired && !selectedPrescription && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 font-medium">🔒 Prescription Required</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Please select a prescription before choosing optical lenses or contact lenses.
                  </p>
                </div>
              )}

              {/* Product List */}
              <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleAddToCart(product)}
                  >
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">MRP: ₹{product.mrp}</p>
                    {product.offer_price && (
                      <p className="text-sm text-green-600">Offer: ₹{product.offer_price}</p>
                    )}
                    <Badge variant="primary" size="sm">{product.category}</Badge>
                  </div>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="mt-6">
                  <Button variant="primary" onClick={handleReviewPricing}>
                    Review Pricing ({cart.length} items)
                  </Button>
                </div>
              )}
            </Card>
          )}

          {/* STEP 5: PRICING REVIEW */}
          {currentStep === 5 && pricingSnapshot && (
            <Card title="Step 5: Pricing Review">
              <div className="space-y-4">
                {/* Items */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">MRP</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Offer</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {pricingSnapshot.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2">{item.product_name}</td>
                          <td className="px-4 py-2">₹{item.mrp}</td>
                          <td className="px-4 py-2">₹{item.offer_price}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2 text-right font-semibold">₹{item.item_total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pricing Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{pricingSnapshot.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>CGST</span>
                    <span>₹{pricingSnapshot.gst_breakdown.cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>SGST</span>
                    <span>₹{pricingSnapshot.gst_breakdown.sgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Grand Total</span>
                    <span className="text-blue-600">₹{pricingSnapshot.grand_total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="primary" onClick={handleLockPricing} className="flex-1">
                    🔒 Lock Pricing (Irreversible)
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentStep(4)} className="flex-1">
                    ← Back to Products
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Panel - Context Summary */}
        <div className="space-y-6">
          {/* Selected Context */}
          <Card title="Selected Context">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Customer</p>
                <p className="font-medium">{selectedCustomer?.name || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Patient</p>
                <p className="font-medium">{selectedPatient?.name || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Prescription</p>
                {selectedPrescription ? (
                  <div className="bg-green-50 p-2 rounded">
                    <p className="font-medium text-green-800">✅ Selected</p>
                    <p className="text-xs text-green-600">ID: {selectedPrescription.id.substring(0, 8)}</p>
                  </div>
                ) : (
                  <p className="font-medium text-gray-400">Not selected</p>
                )}
              </div>
              {orderId && (
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-mono text-xs">{orderId}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <Card title={`Cart (${cart.length} items)`}>
              <div className="space-y-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-medium">₹{item.offer_price}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Prescription Gating Info */}
          <Card title="🔒 Prescription Gating">
            <div className="text-sm space-y-2">
              <p className="font-medium">Categories requiring prescription:</p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Optical Lenses</li>
                <li>Contact Lenses</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                These categories are locked until a valid prescription is selected.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default POSHomeNew;
