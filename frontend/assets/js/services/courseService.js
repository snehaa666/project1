// Resolve API base safely (works for students, courses, or any module)
const API_ROOT = window.ENV.API_BASE_URL.replace(/\/(students|courses)$/, "");
const API_URL = `${API_ROOT}/courses`;

// Safely parse JSON without crashing
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// Get all courses
export async function apiGetAll() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return await safeJson(res);
}

// Get one course by ID
export async function apiGetOne(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return await safeJson(res);
}

// Create new course
export function apiCreate(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

// Update existing course
export function apiUpdate(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

// Delete course
export function apiDelete(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
