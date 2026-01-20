// API Service for IMS 2.0
// Auth-enabled API calls

const API_BASE = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const getAuthHeaders = () => {
  const token = localStorage.getItem('ims_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

class APIService {
  // Auth
  static async login(username, password, location_id) {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, location_id })
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async getCurrentUser() {
    const response = await fetch(`${API_BASE}/api/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  // Orders
  static async createOrder(data) {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async attachOrderItem(orderId, data) {
    const response = await fetch(`${API_BASE}/api/orders/${orderId}/items`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async reviewPricing(orderId, userId) {
    const response = await fetch(`${API_BASE}/api/orders/${orderId}/pricing/review`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ requested_by: userId })
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async requestDiscount(orderId, data) {
    const response = await fetch(`${API_BASE}/api/orders/${orderId}/discounts/request`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async lockPricing(orderId, userId) {
    const response = await fetch(`${API_BASE}/api/orders/${orderId}/pricing/lock`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ locked_by: userId })
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async getOrderState(orderId) {
    const response = await fetch(`${API_BASE}/api/orders/${orderId}/state`);
    if (!response.ok) throw await response.json();
    return response.json();
  }

  // Customers & Patients
  static async searchCustomers(search = '') {
    const response = await fetch(`${API_BASE}/api/customers?search=${encodeURIComponent(search)}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async createCustomer(data) {
    const response = await fetch(`${API_BASE}/api/customers`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async getCustomerPatients(customerId) {
    const response = await fetch(`${API_BASE}/api/customers/${customerId}/patients`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async createPatient(data) {
    const response = await fetch(`${API_BASE}/api/patients`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async getPatientPrescriptions(patientId) {
    const response = await fetch(`${API_BASE}/api/patients/${patientId}/prescriptions`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  // Products
  static async searchProducts(category = '', search = '') {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    const response = await fetch(`${API_BASE}/api/products?${params}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  // Discounts
  static async approveDiscount(discountRequestId, data) {
    const response = await fetch(`${API_BASE}/api/discounts/${discountRequestId}/approve`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async rejectDiscount(discountRequestId, data) {
    const response = await fetch(`${API_BASE}/api/discounts/${discountRequestId}/reject`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async getPendingDiscounts() {
    const response = await fetch(`${API_BASE}/api/discounts/pending`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  // Phase 4: Billing, Payments, Invoice
  static async createBill(data) {
    const response = await fetch(`${API_BASE}/api/bills`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async getBill(billId) {
    const response = await fetch(`${API_BASE}/api/bills/${billId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async recordPayment(billId, data) {
    const response = await fetch(`${API_BASE}/api/bills/${billId}/payments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async getBillPayments(billId) {
    const response = await fetch(`${API_BASE}/api/bills/${billId}/payments`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async generateInvoice(data) {
    const response = await fetch(`${API_BASE}/api/invoices`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }

  static async getInvoice(invoiceId) {
    const response = await fetch(`${API_BASE}/api/invoices/${invoiceId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw await response.json();
    return response.json();
  }
}

export default APIService;
