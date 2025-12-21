// Base API URL from env.js
const API_URL = window.ENV.API_BASE_URL_TEACHERS;

// Safely parse JSON
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// Get all teachers
export async function apiGetAll() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

// Get one teacher
export async function apiGetOne(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create teacher
export function apiCreate(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Update teacher
export function apiUpdate(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete teacher
export function apiDelete(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
