// Shared localStorage helpers for ITBEES GLOBAL Portal Authentication

export const getAuthUser = () => {
  try {
    const raw = localStorage.getItem('itbees_auth');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setAuthUser = (payload) => {
  localStorage.setItem('itbees_auth', JSON.stringify(payload));
};

export const clearAuthUser = () => {
  localStorage.removeItem('itbees_auth');
};
