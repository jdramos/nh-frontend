export const validateLeadForm = ({ selectedPlan, form }) => {
  const errors = {};

  if (!selectedPlan.trim()) {
    errors.plan = "Selecciona un plan antes de enviar.";
  }

  if (!form.name.trim()) {
    errors.name = "Ingresa tu nombre o empresa.";
  }

  if (!form.email.trim()) {
    errors.email = "Ingresa tu correo.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Ingresa un correo válido.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Ingresa tu teléfono.";
  } else if (!/^\d{8,15}$/.test(form.phone.replace(/\D/g, ""))) {
    errors.phone = "Ingresa un teléfono válido.";
  }

  if (!form.message.trim()) {
    errors.message = "Cuéntanos qué necesitas.";
  }

  return errors;
};

export const buildLeadPayload = ({ selectedPlan, form }) => ({
  plan: selectedPlan || "No especificado",
  name: form.name.trim(),
  email: form.email.trim(),
  phone: form.phone.trim(),
  message: form.message.trim(),
  source: "landing_nicaragua_hosting",
  createdAt: new Date().toISOString(),
});

export const buildWhatsAppMessage = ({ businessName, lead }) => {
  return `Hola ${businessName}, estoy interesado en uno de sus servicios.

Plan de interés: ${lead.plan}
Nombre o empresa: ${lead.name}
Correo: ${lead.email}
Teléfono: ${lead.phone}
Mensaje: ${lead.message}`;
};

export const saveLeadLocal = (lead) => {
  const key = "nh_leads";
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(
    key,
    JSON.stringify([{ id: Date.now(), ...lead }, ...current])
  );
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export const saveLeadApi = async (lead) => {
  await fetch(`${API_BASE_URL}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  });
};

export const buildGenericWhatsAppLink = ({
  businessName,
  whatsappNumber,
}) => {
  const text = encodeURIComponent(
    `Hola ${businessName}, deseo información sobre dominios y correo empresarial.`
  );

  return `https://wa.me/${whatsappNumber}?text=${text}`;
};