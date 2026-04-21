
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export async function loginRequest(username, password) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Error de login");
  }

  return data;
}