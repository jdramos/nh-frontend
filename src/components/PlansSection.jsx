import React from "react";
import styles from "./LandingDominiosCorreo.module.css";
import { plans, pricingNote } from "./landingData";

export default function PlansSection({ businessName, onSelectPlan }) {
  return (
    <section id="planes" className={`${styles.section} ${styles.lightSection}`}>
      <div className={styles.container}>
        <div className={styles.pricingHeader}>
          <span className={styles.pricingEyebrow}>Hosting web</span>

          <h2 className={`${styles.sectionTitle} ${styles.darkText}`}>
            Planes de {businessName}
          </h2>

          <p className={`${styles.sectionLead} ${styles.lightSectionLead}`}>
            Hosting con cPanel, correos corporativos, SSL incluido y soporte
            local por WhatsApp.
          </p>
        </div>

        <div className={styles.plansGrid}>
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`${styles.planCardV2} ${
                plan.highlighted ? styles.planCardFeaturedV2 : ""
              }`}
            >
              {plan.highlighted && (
                <span className={styles.featuredRibbon}>Más recomendado</span>
              )}

              <div className={styles.planHeaderV2}>
                <span className={styles.planBadge}>
                  {plan.badge || "Hosting"}
                </span>

                <h3 className={styles.planTitleV2}>{plan.name}</h3>

                {plan.subtitle && (
                  <p className={styles.planSubtitle}>{plan.subtitle}</p>
                )}

                <p className={styles.planNote}>{plan.note}</p>

                <div className={styles.priceRow}>
                  <span className={styles.priceMain}>{plan.price}</span>
                  {plan.period && (
                    <span className={styles.pricePeriod}>{plan.period}</span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan(plan.name)}
                className={`${styles.planButtonV2} ${
                  plan.highlighted ? styles.planButtonFeaturedV2 : ""
                }`}
              >
                {plan.cta || "Solicitar este plan"}
              </button>

              <div className={styles.includesText}>Incluye:</div>

              <div className={styles.planItemsV2}>
                {plan.items.map((item) => (
                  <div key={item} className={styles.planItemV2}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {pricingNote && (
          <p className={styles.pricingNote}>
            {pricingNote}
          </p>
        )}
      </div>
    </section>
  );
}