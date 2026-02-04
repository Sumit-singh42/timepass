import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c636fbbe`;

// Get stored auth token
export function getAuthToken(): string | null {
  return localStorage.getItem("prana_auth_token");
}

// Store auth token
export function setAuthToken(token: string) {
  localStorage.setItem("prana_auth_token", token);
}

// Clear auth token
export function clearAuthToken() {
  localStorage.removeItem("prana_auth_token");
}

// Generic API request helper
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "apikey": publicAnonKey, // Required by Supabase
    ...options.headers,
  };

  // Add auth token if available (for authenticated endpoints)
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    // Use anon key for unauthenticated requests
    headers["Authorization"] = `Bearer ${publicAnonKey}`;
  }

  const url = `${API_URL}${endpoint}`;
  console.log(`API Request: ${options.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`API Response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response:`, errorText);
      
      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { error: `HTTP ${response.status}: ${errorText}` };
      }
      
      throw new Error(error.error || error.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log(`API Success:`, data);
    return data;
  } catch (error: any) {
    console.error(`API Error [${endpoint}]:`, error.message || error);
    
    // Return empty arrays for GET requests that fail (graceful degradation)
    if (!options.method || options.method === 'GET') {
      if (endpoint === '/cattle') {
        return { cattle: [] };
      } else if (endpoint === '/scans') {
        return { scans: [] };
      } else if (endpoint === '/alerts') {
        return { alerts: [] };
      } else if (endpoint === '/profile') {
        return { profile: null };
      }
    }
    
    throw error;
  }
}

// ========== AUTH API ==========

export async function signUp(phone: string, name: string, location: string) {
  return apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ phone, name, location }),
  });
}

export async function signIn(phone: string, otp: string) {
  const data = await apiRequest("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ phone, otp }),
  });
  
  if (data.session?.access_token) {
    setAuthToken(data.session.access_token);
  }
  
  return data;
}

export async function getCurrentSession() {
  return apiRequest("/auth/session");
}

export function signOut() {
  clearAuthToken();
}

// ========== CATTLE API ==========

export async function getCattle() {
  return apiRequest("/cattle");
}

export async function addCattle(cattle: {
  name: string;
  breed: string;
  age?: number;
  gender?: string;
  muzzleId?: string;
}) {
  return apiRequest("/cattle", {
    method: "POST",
    body: JSON.stringify(cattle),
  });
}

export async function updateCattle(id: string, updates: any) {
  return apiRequest(`/cattle/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteCattle(id: string) {
  return apiRequest(`/cattle/${id}`, {
    method: "DELETE",
  });
}

// ========== SCAN API ==========

export async function getScans() {
  return apiRequest("/scans");
}

export async function createScan(cattleId: string, mode: string, results?: any) {
  return apiRequest("/scans", {
    method: "POST",
    body: JSON.stringify({ cattleId, mode, results }),
  });
}

// ========== ALERTS API ==========

export async function getAlerts() {
  return apiRequest("/alerts");
}

export async function createAlert(alert: {
  cattleId: string;
  severity: string;
  message: string;
  type: string;
}) {
  return apiRequest("/alerts", {
    method: "POST",
    body: JSON.stringify(alert),
  });
}

export async function markAlertAsRead(id: string) {
  return apiRequest(`/alerts/${id}/read`, {
    method: "PUT",
  });
}

// ========== PROFILE API ==========

export async function getProfile() {
  return apiRequest("/profile");
}

export async function updateProfile(updates: any) {
  return apiRequest("/profile", {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}