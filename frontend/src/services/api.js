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

const handleApiError = async (response) => {
  const error = await response.json();
  if (response.status === 401 && error.detail?.reason_code === 'TOKEN_EXPIRED') {
    localStorage.removeItem('ims_token');
    window.location.href = '/login';
  }
  throw error;
};

class APIService {
  // Auth
  static async login(username, password, location_id) {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, location_id })
    });
    if (!response.ok) await handleApiError(response);
    return response.json();
  }

  static async getCurrentUser() {
    const response = await fetch(`${API_BASE}/api/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) await handleApiError(response);
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
    if (!response.ok) await handleApiError(response);
    return response.json();
  }

  // Enquiries
  static async createEnquiry(data) {
    const response = await fetch(`${API_BASE}/api/enquiries`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) await handleApiError(response);
    return response.json();
  }

  static async listEnquiries(locationId = null) {
    const params = locationId ? `?location_id=${locationId}` : '';
    const response = await fetch(`${API_BASE}/api/enquiries${params}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) await handleApiError(response);
    return response.json();
  }

  static async getEnquiry(enquiryId) {
    const response = await fetch(`${API_BASE}/api/enquiries/${enquiryId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) await handleApiError(response);
    return response.json();
  }

  // Stock
  static async getStock(productId, locationId) {
    const response = await fetch(`${API_BASE}/api/stock/${productId}?location_id=${locationId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) await handleApiError(response);
    return response.json();
  }

  // Reports
  static async getDailySalesReport(date = null, locationId = null) {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (locationId) params.append('location_id', locationId);
    
    const response = await fetch(`${API_BASE}/api/reports/daily-sales?${params}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) await handleApiError(response);
    return response.json();
  }

  static async getInvoiceReport() {
    const response = await fetch(`${API_BASE}/api/reports/invoices`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) await handleApiError(response);
    return response.json();
  }

  static async getAuditLog(entityType = null) {
    const params = entityType ? `?entity_type=${entityType}` : '';
    const response = await fetch(`${API_BASE}/api/reports/audit-log${params}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) await handleApiError(response);
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
