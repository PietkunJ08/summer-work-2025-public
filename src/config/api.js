const base = process.env.REACT_APP_API_BASE;
if (!base) throw new Error("Missing REACT_APP_API_BASE env var");

export const API_BASE = base.replace(/\/+$/, "");
export const apiUrl = (path) => new URL(path, API_BASE).toString();

async function apiFetch(path, options = {}) {
  const res = await fetch(apiUrl(path), {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
  return data;
}

export const fetchProducts = () => apiFetch("/api/products");

export const createOrder = (orderData) =>
  apiFetch("/api/orders", { method: "POST", body: JSON.stringify(orderData) });
