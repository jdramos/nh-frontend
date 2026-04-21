import React from "react";
import styles from "./LandingDominiosCorreo.module.css";
import { plans } from "./landingData";

export default function ContactSection({
  businessName,
  selectedPlan,
  form,
  errors,
  statusMessage,
  statusType,
  submitting,
  onPlanChange,
  onFieldChange,
  onSubmit,
}) {
  return (
    <section id="contacto" className={`${styles.section} ${styles.formSection}`}>
      <div className={styles.container}>
        <div className={styles.contactWrapper}>
          <div className={styles.contactInfo}>
            <span className={styles.contactBadge}>Atención rápida</span>
            <h2 className={styles.contactTitle}>
              Solicita información y te atendemos por WhatsApp
            </h2>
            <p className={styles.contactLead}>
              Déjanos tus datos y cuéntanos qué necesitas. Te ayudamos a elegir
              el mejor plan para tu negocio.
            </p>

            <div className={styles.contactChecklist}>
              <div>✔ Respuesta rápida</div>
              <div>✔ Orientación para tu negocio</div>
              <div>✔ Proceso simple</div>
            </div>
          </div>

          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Contáctanos</h3>

            <div className={styles.formGrid}>
              {statusMessage ? (
                <div
                  className={
                    statusType === "error"
                      ? styles.statusBoxError
                      : styles.statusBoxSuccess
                  }
                >
                  {statusMessage}
                </div>
              ) : null}

              <select
                value={selectedPlan}
                onChange={onPlanChange}
                className={styles.input}
              >
                <option value="">Selecciona un plan</option>
                {plans.map((plan) => (
                  <option key={plan.name} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </select>
              {errors.plan ? (
                <div className={styles.helperText}>{errors.plan}</div>
              ) : null}

              <input
                value={form.name}
                onChange={onFieldChange("name")}
                placeholder="Nombre o empresa"
                className={styles.input}
              />
              {errors.name ? (
                <div className={styles.helperText}>{errors.name}</div>
              ) : null}

              <input
                value={form.email}
                onChange={onFieldChange("email")}
                placeholder="Correo"
                className={styles.input}
              />
              {errors.email ? (
                <div className={styles.helperText}>{errors.email}</div>
              ) : null}

              <input
                value={form.phone}
                onChange={onFieldChange("phone")}
                placeholder="Teléfono"
                className={styles.input}
              />
              {errors.phone ? (
                <div className={styles.helperText}>{errors.phone}</div>
              ) : null}

              <textarea
                value={form.message}
                onChange={onFieldChange("message")}
                placeholder="Cuéntanos qué necesitas"
                className={styles.textarea}
              />
              {errors.message ? (
                <div className={styles.helperText}>{errors.message}</div>
              ) : null}

              <button
                type="button"
                onClick={onSubmit}
                className={styles.darkButton}
                disabled={submitting}
              >
                <span className={styles.buttonLoading}>
                  {submitting ? <span className={styles.spinner} /> : null}
                  {submitting ? "Enviando..." : "Enviar por WhatsApp"}
                </span>
              </button>

              <div className={styles.formNote}>
                Te contactaremos lo antes posible por WhatsApp o correo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}