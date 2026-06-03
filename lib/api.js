/**
 * VitaMotus API Client
 * This utility handles communication with the Laravel backend.
 */

// Helper to determine the default host for LAN access
const getBaseHost = () => {
  if (typeof window !== 'undefined') {
    // If in browser, use the current hostname (e.g., 192.168.1.4 or localhost)
    return `http://${window.location.hostname}:8000`;
  }
  // Fallback for SSR
  return 'http://localhost:8000';
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || `${getBaseHost()}/api`;

/**
 * Image URL Helper
 * Maps specimen data to the nested directory structure:
 * uploads/{family}/{genus}/{species}/{id}.jpg
 */
export const getImageUrl = (specimen) => {
  if (!specimen) return 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=1000&auto=format&fit=crop';

  const baseHost = getBaseHost();

  // 1. Prioritize Profile Gallery (Admin Uploads)
  if (specimen.profile?.photo_gallery_urls && specimen.profile.photo_gallery_urls.length > 0) {
    const url = specimen.profile.photo_gallery_urls[0];
    if (url.startsWith('http')) return url;
    return `${baseHost}/${url}`;
  }
  
  // 2. Legacy Pattern Fallback
  if (specimen.family && specimen.genus) {
    const family = specimen.family.name;
    const genus = specimen.genus.name;
    const species = specimen.scientific_name;
    const id = specimen.wsc_species_id;
    return `${baseHost}/uploads/${family}/${genus}/${species}/${id}.jpg`;
  }

  // 3. Global Placeholder
  return 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=1000&auto=format&fit=crop';
};

/**
 * Generic fetch wrapper for the VitaMotus API
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('vm_token') : null;

  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Auth API Endpoints
 */
export const authApi = {
  login: (credentials) => fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  logout: () => fetchAPI('/logout', { method: 'POST' }),
  getUser: () => fetchAPI('/user'),
};

/**
 * Admin Management API
 */
export const adminApi = {
  // Families
  createFamily: (data) => fetchAPI('/admin/families', { method: 'POST', body: JSON.stringify(data) }),
  updateFamily: (id, data) => fetchAPI(`/admin/families/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFamily: (id) => fetchAPI(`/admin/families/${id}`, { method: 'DELETE' }),

  // Genera
  createGenus: (data) => fetchAPI('/admin/genera', { method: 'POST', body: JSON.stringify(data) }),
  updateGenus: (id, data) => fetchAPI(`/admin/genera/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteGenus: (id) => fetchAPI(`/admin/genera/${id}`, { method: 'DELETE' }),

  // Species
  createSpecies: (data) => fetchAPI('/admin/species', { method: 'POST', body: JSON.stringify(data) }),
  updateSpecies: (id, data) => fetchAPI(`/admin/species/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSpecies: (id) => fetchAPI(`/admin/species/${id}`, { method: 'DELETE' }),

  // Images
  uploadSpeciesImage: (speciesId, formData) => fetchAPI(`/admin/species/${speciesId}/upload`, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' } 
  }),
};

/**
 * Taxonomy API Endpoints
 */
export const taxonomyApi = {
  getFamilies: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/families?${query}`);
  },
  getFamily: (slug) => fetchAPI(`/families/${slug}`),
  getGenera: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/genera?${query}`);
  },
  getGenus: (slug) => fetchAPI(`/genera/${slug}`),
  getSpecies: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/species?${query}`);
  },
  getSpecimen: (slug) => fetchAPI(`/species/${slug}`),
  getSpeciesOfTheDay: () => fetchAPI('/species-of-the-day'),
  getMasterSheet: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/master-spider-sheet?${query}`);
  },
  search: (query) => fetchAPI(`/search?query=${query}`),
};

/**
 * Blog API Endpoints
 */
export const blogApi = {
  getPosts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/posts?${query}`);
  },
  getPost: (slug) => fetchAPI(`/posts/${slug}`),
};

/**
 * Blog Image URL Helper
 */
export const getBlogImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${getBaseHost()}/storage/${path}`;
};

/**
 * Admin Blog API Endpoints
 */
export const adminBlogApi = {
  getPosts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/admin/posts?${query}`);
  },
  getPost: (id) => fetchAPI(`/admin/posts/${id}`),
  createPost: (data) => fetchAPI('/admin/posts', { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id, data) => fetchAPI(`/admin/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePost: (id) => fetchAPI(`/admin/posts/${id}`, { method: 'DELETE' }),
  uploadImage: (id, formData) => fetchAPI(`/admin/posts/${id}/upload`, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' },
  }),
};

/**
 * Newsletter API Endpoints
 */
export const newsletterApi = {
  subscribe: (email) => fetchAPI('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),
  unsubscribe: (email) => fetchAPI('/newsletter/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),
};
