const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

function getToken() {
  return localStorage.getItem("nh_token") || "";
}

export async function getLeads() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "No se pudieron cargar los leads");
  }

  return data;
}

export async function updateLeadStatus(id, status) {
  const res = await fetch(`${API_BASE_URL}/api/leads/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "No se pudo actualizar el estado");
  }

  return data;
}