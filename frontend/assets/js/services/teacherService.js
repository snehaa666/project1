const API_URL = window.ENV.API_BASE_URL_TEACHERS;

// Safe JSON parsing
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return [];
  }
}

// Get all teachers
export async function apiGetAll() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch teachers");
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