const API_URL = import.meta.env.VITE_DJANGO_API_URL || 'https://comunidadesinteligentes.onrender.com';


export const loginWithGoogle = async (credential) => {
  const res = await fetch(-API_URL-/api/v1/auth/google/.replace('-API_URL-', API_URL), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential })
  });
  if (!res.ok) throw new Error('Google Login failed');
  const data = await res.json();
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
};

export const login = async (email, password) => {
  const res = await fetch(${API_URL}/api/v1/auth/token/, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
};

export const register = async (userData) => {
  const res = await fetch(${API_URL}/api/v1/auth/register/, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = Bearer ;
  }
  const res = await fetch(${API_URL}, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem('access_token');
    window.location.href = '/onboarding';
  }
  return res.json();
};

export const getCopropiedades = () => fetchWithAuth('/api/v1/ph/copropiedades/');
export const createCopropiedad = (data) => fetchWithAuth('/api/v1/ph/copropiedades/', { method: 'POST', body: JSON.stringify(data) });

export const getMisUnidades = () => fetchWithAuth('/api/v1/ph/mis-unidades/');
export const getEstadoCuenta = () => fetchWithAuth('/api/v1/ph/estado-cuenta/');

export const getMensajes = () => fetchWithAuth('/api/v1/ph/mensajes/');
export const enviarMensaje = (data) => fetchWithAuth('/api/v1/ph/mensajes/', { method: 'POST', body: JSON.stringify(data) });

