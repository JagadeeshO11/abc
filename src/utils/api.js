const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const auth = localStorage.getItem('itbees_auth');
  if (auth) {
    const { accessToken } = JSON.parse(auth);
    return { 'Authorization': `Bearer ${accessToken}` };
  }
  return {};
};

// Generic fetch wrapper with automatic token refresh
export const apiFetch = async (endpoint, options = {}) => {
  const isFormData = options.body instanceof FormData;
  
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle Token Refresh
  if (response.status === 401 && !endpoint.includes('/admin/login')) {
    const auth = localStorage.getItem('itbees_auth');
    if (auth) {
      const { refreshToken } = JSON.parse(auth);
      const refreshRes = await fetch(`${API_URL}/admin/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const { data } = await refreshRes.json();
        const updatedAuth = { ...JSON.parse(auth), accessToken: data.accessToken };
        localStorage.setItem('itbees_auth', JSON.stringify(updatedAuth));
        
        // Retry the original request
        headers['Authorization'] = `Bearer ${data.accessToken}`;
        response = await fetch(`${API_URL}${endpoint}`, {
          ...options,
          headers,
        });
      } else {
        localStorage.removeItem('itbees_auth');
        window.location.href = '/login';
      }
    }
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

// Public APIs
export const publicApi = {
  getCourses: () => apiFetch('/public/courses'),
  getJobs: () => apiFetch('/public/jobs'),
  getJobById: (id) => apiFetch(`/public/jobs/${id}`),
  getAssessments: () => apiFetch('/public/assessments'),
  getAssessmentDetails: (id) => apiFetch(`/public/assessments/${id}`),
  submitInquiry: (data) => apiFetch('/public/inquiries', { method: 'POST', body: JSON.stringify(data) }),
  applyJob: (formData) => apiFetch('/public/jobs/apply', { method: 'POST', body: formData }),
  requestPurchaseOtp: (email) => apiFetch('/public/purchase/otp', { method: 'POST', body: JSON.stringify({ email }) }),
  initiatePurchase: (data) => apiFetch('/public/purchase/initiate', { method: 'POST', body: JSON.stringify(data) }),
  verifyPayment: (data) => apiFetch('/public/purchase/verify', { method: 'POST', body: JSON.stringify(data) }),
  submitAssessment: (data) => apiFetch('/public/assessments/submit', { method: 'POST', body: JSON.stringify(data) }),
};

// Admin APIs
export const adminApi = {
  login: (data) => apiFetch('/admin/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: (refreshToken) => apiFetch('/admin/logout', { method: 'POST', body: JSON.stringify({ refreshToken }) }),
  
  // Courses
  createCourse: (data) => apiFetch('/admin/courses', { method: 'POST', body: JSON.stringify(data) }),
  updateCourse: (id, data) => apiFetch(`/admin/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  archiveCourse: (id) => apiFetch(`/admin/courses/${id}/archive`, { method: 'PATCH' }),
  deleteCourse: (id) => apiFetch(`/admin/courses/${id}`, { method: 'DELETE' }),

  // Jobs
  createJob: (data) => apiFetch('/admin/jobs', { method: 'POST', body: JSON.stringify(data) }),
  updateJob: (id, data) => apiFetch(`/admin/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteJob: (id) => apiFetch(`/admin/jobs/${id}`, { method: 'DELETE' }),

  // Management
  getInquiries: () => apiFetch('/admin/inquiries'),
  archiveInquiry: (id) => apiFetch(`/admin/inquiries/${id}/archive`, { method: 'PATCH' }),
  getApplications: () => apiFetch('/admin/applications'),
  updateApplication: (id, data) => apiFetch(`/admin/applications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateApplicationStatus: (id, status) => apiFetch(`/admin/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteApplication: (id) => apiFetch(`/admin/applications/${id}`, { method: 'DELETE' }),
  getPurchases: () => apiFetch('/admin/purchases'),
  getAuditLogs: () => apiFetch('/admin/audit-logs'),
  uploadImage: (formData) => apiFetch('/admin/upload/image', { method: 'POST', body: formData }),

  // Assessment Management
  createCategory: (data) => apiFetch('/admin/assessments/categories', { method: 'POST', body: JSON.stringify(data) }),
  createAssessment: (data) => apiFetch('/admin/assessments', { method: 'POST', body: JSON.stringify(data) }),
  addQuestion: (assessmentId, data) => apiFetch(`/admin/assessments/${assessmentId}/questions`, { method: 'POST', body: JSON.stringify(data) }),
  getAttempts: (assessmentId) => apiFetch(`/admin/assessments/${assessmentId}/attempts`),
};
