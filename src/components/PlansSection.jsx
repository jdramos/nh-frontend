import React from "react";
import styles from "./LandingDominiosCorreo.module.css";
import { plans } from "./landingData";

export default function PlansSection({ businessName, onSelectPlan }) {
  return (
    <section id="planes" className={`${styles.section} ${styles.lightSection}`}>
      <div className={styles.container}>
        <h2 className={`${styles.sectionTitle} ${styles.darkText}`}>
          Planes de {businessName}
        </h2>

        <p className={`${styles.sectionLead} ${styles.lightSectionLead}`}>
          Elige la opción que mejor se adapte a tu negocio y solicita atención
          por WhatsApp en pocos segundos.
        </p>

        <div className={styles.plansGrid}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlighted
                  ? styles.planOuterFeatured
                  : styles.planOuter
              }
            >
              <div className={styles.planCard}>
                {plan.highlighted && (
                  <span className={styles.tag}>Recomendado</span>
                )}

                <h3 className={styles.planTitle}>{plan.name}</h3>
                <div className={styles.planPrice}>{plan.price}</div>

                <div className={styles.planItems}>
                  {plan.items.map((item) => (
                    <div key={item}>✔ {item}</div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.name)}
                  className={`${styles.primaryBtn} ${styles.fullWidthBtn}`}
                >
                  Solicitar este plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}