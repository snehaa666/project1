const API_URL = "/api/students";

export async function fetchAllProfiles() {
  const res = await fetch(API_URL);
  return res.ok ? await res.json() : [];
}
