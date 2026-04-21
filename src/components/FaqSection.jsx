import React, { useState } from "react";
import styles from "./LandingDominiosCorreo.module.css";

const faqItems = [
  {
    question: "¿Necesito conocimientos técnicos para contratar el servicio?",
    answer:
      "No. Te guiamos en el proceso para que puedas tener tu dominio y correo empresarial sin complicaciones técnicas.",
  },
  {
    question: "¿Me ayudan con la configuración?",
    answer:
      "Sí. Podemos orientarte para configurar tu correo y dejar tu servicio listo para comenzar a usarlo.",
  },
  {
    question: "¿Cuánto tiempo tarda la activación?",
    answer:
      "Depende del servicio solicitado, pero normalmente el proceso puede iniciarse rápidamente una vez que recibimos tus datos.",
  },
  {
    question: "¿Puedo empezar solo con correo empresarial?",
    answer:
      "Sí. Puedes comenzar con el servicio que más necesites y luego ampliar a un paquete más completo.",
  },
  {
    question: "¿Qué pasa si ya tengo un dominio?",
    answer:
      "También podemos ayudarte. Si ya cuentas con dominio, podemos orientarte para usarlo con tu correo empresarial.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Preguntas frecuentes</h2>
        <p className={styles.sectionLead}>
          Resolvemos las dudas más comunes para que tomes una decisión con más
          confianza.
        </p>

        <div className={styles.faqList}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => toggleItem(index)}
                >
                  <span>{item.question}</span>
                  <span className={styles.faqIcon}>{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className={styles.faqAnswer}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}