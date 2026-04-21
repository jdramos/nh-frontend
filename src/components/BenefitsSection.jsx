import React from "react";
import styles from "./LandingDominiosCorreo.module.css";
import { benefits } from "./landingData";

export default function BenefitsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          ¿Por qué esto ayuda a vender más?
        </h2>

        <p className={styles.sectionLead}>
          Un negocio con dominio propio y correo empresarial transmite orden,
          confianza y seriedad. Eso hace que más personas respondan, consulten y
          compren.
        </p>

        <div className={styles.benefitsGrid}>
          {benefits.map((item) => (
            <div key={item.title} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{item.icon}</div>
              <h3 className={styles.benefitTitle}>{item.title}</h3>
              <p className={styles.benefitDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}