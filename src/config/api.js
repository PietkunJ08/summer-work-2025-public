export const API_BASE = "";

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE}/api/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) throw new Error("Failed to create order");
  return response.json();
};
