const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

const STORAGE_KEYS = {
  accessToken: "littlelemon_access_token",
  refreshToken: "littlelemon_refresh_token",
  username: "littlelemon_username",
};

function buildHeaders(extra = {}) {
  return {
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function fetchMenuSections() {
  return fetch(`${API_BASE_URL}/menu/`);
}

export async function fetchAvailabilityByDate(dateValue) {
  const query = new URLSearchParams({ date: dateValue }).toString();
  return fetch(`${API_BASE_URL}/availability/?${query}`);
}

export async function registerUserRequest(payload) {
  const response = await fetch(`${API_BASE_URL}/users/register/`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  let body = {};
  try {
    body = await response.json();
  } catch (_error) {
    body = {};
  }

  return { response, body };
}

export async function loginUserRequest(payload) {
  const response = await fetch(`${API_BASE_URL}/token/`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  let body = {};
  try {
    body = await response.json();
  } catch (_error) {
    body = {};
  }

  return { response, body };
}

export async function submitReservationWithRefresh(payload, accessToken) {
  return fetch(`${API_BASE_URL}/reservations/`, {
    method: "POST",
    headers: buildHeaders({
      Authorization: `Bearer ${accessToken}`,
    }),
    body: JSON.stringify(payload),
  });
}

export function readStoredAuth() {
  return {
    accessToken: localStorage.getItem(STORAGE_KEYS.accessToken) || "",
    refreshToken: localStorage.getItem(STORAGE_KEYS.refreshToken) || "",
    username: localStorage.getItem(STORAGE_KEYS.username) || "",
  };
}

export function storeAuth({ accessToken = "", refreshToken = "", username = "" }) {
  if (accessToken) {
    localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  }
  if (username) {
    localStorage.setItem(STORAGE_KEYS.username, username);
  }
}

export function clearStoredAuth() {
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS.username);
}
