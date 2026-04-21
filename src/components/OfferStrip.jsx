import React from "react";
import styles from "./LandingDominiosCorreo.module.css";

export default function OfferStrip() {
  return (
    <section className={styles.offerStrip}>
      <div className={styles.container}>
        <div className={styles.offerGrid}>
          <div className={styles.offerItem}>
            <div className={styles.offerIcon}>🌐</div>
            <div>
              <strong>Dominio propio</strong>
              <p>Tu negocio con identidad profesional en internet</p>
            </div>
          </div>

          <div className={styles.offerItem}>
            <div className={styles.offerIcon}>📧</div>
            <div>
              <strong>Correo empresarial</strong>
              <p>Correos como ventas@tunegocio.com</p>
            </div>
          </div>

          <div className={styles.offerItem}>
            <div className={styles.offerIcon}>🤝</div>
            <div>
              <strong>Soporte personalizado</strong>
              <p>Te ayudamos en todo el proceso</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}