
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// --- SECURITY: In-Memory Token Storage ---
// Tokens are stored here, in a closure, inaccessible to XSS attacks targeting localStorage
let _accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  _accessToken = token;
};

export const getAccessToken = () => _accessToken;

// --- Helper: Response Parser ---
export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Security Phase 2: Explicit 403 handling for clear permission errors
    if (response.status === 403) {
      throw new Error('Access Denied: You do not have permission to perform this action.');
    }

    // Standardized error message for other failures
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Request failed (${response.status}): ${errorText}`);
  }

  // Handle 204 No Content (common in DELETE/PUT)
  if (response.status === 204) return null;

  return response.json();
};

// --- Helper: Cookie Reader (for CSRF) ---
function getCookie(name: string): string | null {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  } catch (e) {
    // Document cookie access might be blocked in sandboxed frames
    return null;
  }
  return null;
}

// --- Secure HTTP Client ---
interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const client = async (endpoint: string, options: RequestOptions = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 1. Inject Authorization Token
  if (_accessToken) {
    headers['Authorization'] = `Bearer ${_accessToken}`;
  }

  // 2. Inject CSRF Token for mutation requests (Security Phase 2)
  const method = options.method?.toUpperCase() || 'GET';
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const csrfToken = getCookie('XSRF-TOKEN'); // Standard name, adjust if backend uses diff name
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
  }

  try {
    let response = await fetch(url, { ...options, headers });

    // 401 Logic (Silent Refresh)
    // If the server returns 401, it likely means the access token expired.
    // We attempt to refresh it using the HttpOnly cookie handled by the browser.
    if (response.status === 401) {
      // Avoid infinite loops: Don't refresh if the failed request was the refresh endpoint itself
      if (!endpoint.includes('refresh') && !endpoint.includes('login')) {
        try {
          // Attempt to refresh token
          const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, { method: 'POST' });

          if (refreshRes.ok) {
            const data = await refreshRes.json();

            // If we got a new token, update memory and retry original request
            if (data.accessToken) {
              setAccessToken(data.accessToken);

              // Update header with new token
              headers['Authorization'] = `Bearer ${data.accessToken}`;

              // Retry the original request
              response = await fetch(url, { ...options, headers });
            }
          } else {
            // Refresh failed (Session truly expired)
            setAccessToken(null);
            // In a real scenario, this might trigger a redirect to /login
            // or dispatch a 'session-expired' event.
          }
        } catch (e) {
          // Network error during refresh or other issue
          setAccessToken(null);
        }
      }
    }

    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};
