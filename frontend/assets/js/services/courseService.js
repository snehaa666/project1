// 1. Safe access: Fallback to an empty string if window.ENV or API_BASE_URL is missing
const BASE = (window.ENV?.API_BASE_URL || "").replace("/students", "");
const API_URL = BASE ? `${BASE}/courses` : "";

async function safeJson(res) {
  try { 
    return await res.json(); 
  } catch { 
    return null; 
  }
}

export async function apiGetAll() {
  // Guard clause: Don't fetch if the URL isn't ready
  if (!API_URL) return [];
  
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

export async function apiGetOne(id) {
  if (!API_URL) return null;
  
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

export function apiCreate(data) {
  if (!API_URL) return Promise.reject("API_URL is missing");
  
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export function apiUpdate(id, data) {
  if (!API_URL) return Promise.reject("API_URL is missing");
  
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export function apiDelete(id) {
  if (!API_URL) return Promise.reject("API_URL is missing");
  
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}