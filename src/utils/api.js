const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const auth = localStorage.getItem('itbees_auth');
  if (auth) {
    const { token } = JSON.parse(auth);
    return { 'Authorization': `Bearer ${token}` };
  }
  return {};
};

export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

export const jobsApi = {
  getAll: () => apiFetch('/jobs'),
  create: (data) => apiFetch('/jobs', { method: 'POST', body: JSON.stringify(data) }),
};

export const coursesApi = {
  getAll: () => apiFetch('/courses'),
  create: (data) => apiFetch('/courses', { method: 'POST', body: JSON.stringify(data) }),
};

export const authApi = {
  login: (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};

export const appsApi = {
  create: (data) => apiFetch('/applications', { method: 'POST', body: JSON.stringify(data) }),
  getAll: () => apiFetch('/applications'),
};

export const inqsApi = {
  create: (data) => apiFetch('/inquiries', { method: 'POST', body: JSON.stringify(data) }),
  getAll: () => apiFetch('/inquiries'),
};

export const enrollsApi = {
  create: (data) => apiFetch('/enrollments', { method: 'POST', body: JSON.stringify(data) }),
  getAll: () => apiFetch('/enrollments'),
};

export const paymentsApi = {
  getAll: () => apiFetch('/payments'),
  create: (data) => apiFetch('/payments', { method: 'POST', body: JSON.stringify(data) }),
};

export const logsApi = {
  getAll: () => apiFetch('/logs'),
  create: (data) => apiFetch('/logs', { method: 'POST', body: JSON.stringify(data) }),
};
