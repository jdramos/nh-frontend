import React from "react";
import styles from "./LandingDominiosCorreo.module.css";

export default function TrustSection() {
  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <div className={styles.trustGrid}>
          <div className={styles.trustItem}>
            <strong>Soporte local</strong>
            <span>Atención cercana para ayudarte a comenzar rápido.</span>
          </div>

          <div className={styles.trustItem}>
            <strong>Configuración asistida</strong>
            <span>No necesitas ser técnico para tener tu correo empresarial.</span>
          </div>

          <div className={styles.trustItem}>
            <strong>Enfoque en negocios</strong>
            <span>Soluciones pensadas para vender, cotizar y dar confianza.</span>
          </div>
        </div>
      </div>
    </section>
  );
}