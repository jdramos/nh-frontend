import React, { useEffect, useState } from "react";
import styles from "../components/LandingDominiosCorreo.module.css";
import {
  BUSINESS_NAME,
  WHATSAPP_NUMBER,
} from "../components/landingData";
import {
  validateLeadForm,
  buildLeadPayload,
  buildWhatsAppMessage,
  saveLeadLocal,
  saveLeadApi,
  buildGenericWhatsAppLink,
} from "./landingHelpers";
import FaqSection from "../components/FaqSection";
import HeaderBar from "../components/HeaderBar";
import HeroSection from "../components/HeroSection";
import TrustSection from "../components/TrustSection";
import BenefitsSection from "../components/BenefitsSection";
import PlansSection from "../components/PlansSection";
import ContactSection from "../components/ContactSection";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import OfferStrip from "../components/OfferStrip";

export default function LandingDominiosCorreo() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("idle");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Nicaragua Hosting | Dominios y correo empresarial";

    const ensureMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    ensureMeta(
      "description",
      "Nicaragua Hosting ofrece dominios, correo empresarial y soporte personalizado para negocios que desean una imagen profesional en internet."
    );
  }, []);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setStatusMessage("");
  };

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
    setErrors((prev) => ({ ...prev, plan: "" }));
    setStatusMessage("");
  };

  const scrollToContact = (planName = "") => {
    if (planName) {
      setSelectedPlan(planName);
      setErrors((prev) => ({ ...prev, plan: "" }));
    }

    setStatusMessage("");

    const section = document.getElementById("contacto");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sendToWhatsApp = async () => {
    if (submitting) return;

    const validationErrors = validateLeadForm({ selectedPlan, form });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatusType("error");
      setStatusMessage("Completa los campos obligatorios para continuar.");
      return;
    }

    setSubmitting(true);
    setStatusType("success");
    setStatusMessage("Estamos enviando tu solicitud. Por favor espera...");

    const lead = buildLeadPayload({ selectedPlan, form });

    try {
      saveLeadLocal(lead);

      try {
        await saveLeadApi(lead);
      } catch (apiError) {
        console.error("No se pudo guardar el lead en backend:", apiError);
      }

      const rawText = buildWhatsAppMessage({
        businessName: BUSINESS_NAME,
        lead,
      });

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        rawText
      )}`;

      setStatusType("success");
      setStatusMessage(
        "Solicitud enviada correctamente. Te estamos llevando a WhatsApp..."
      );

      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
        setSubmitting(false);
      }, 700);
    } catch (error) {
      console.error(error);
      setStatusType("error");
      setStatusMessage(
        "No se pudo procesar tu solicitud en este momento. Inténtalo nuevamente."
      );
      setSubmitting(false);
    }
  };

  const whatsappLink = buildGenericWhatsAppLink({
    businessName: BUSINESS_NAME,
    whatsappNumber: WHATSAPP_NUMBER,
  });

  return (
    <div className={styles.page}>
      <HeaderBar businessName={BUSINESS_NAME} />
      <HeroSection businessName={BUSINESS_NAME} onPrimaryAction={scrollToContact} />
      <OfferStrip />
      <TrustSection />
      <BenefitsSection />
      <PlansSection
        businessName={BUSINESS_NAME}
        onSelectPlan={scrollToContact}
      />

      <FaqSection />


      <ContactSection
        businessName={BUSINESS_NAME}
        selectedPlan={selectedPlan}
        form={form}
        errors={errors}
        statusMessage={statusMessage}
        statusType={statusType}
        submitting={submitting}
        onPlanChange={handlePlanChange}
        onFieldChange={handleChange}
        onSubmit={sendToWhatsApp}
      />
      <FloatingWhatsApp whatsappLink={whatsappLink} />
    </div>
  );
}