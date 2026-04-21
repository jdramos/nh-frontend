import React from "react";
import styles from "./LandingDominiosCorreo.module.css";

export default function HeroSection({ businessName, onPrimaryAction }) {
  return (
    <section className={`${styles.section} ${styles.hero}`}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div>
            <span className={styles.badge}>
              Soluciones para negocios en Nicaragua
            </span>

            <h1 className={styles.title}>
              Tu empresa se ve más{" "}
              <span className={styles.accentBlue}>profesional</span> con un{" "}
              <span className={styles.accentGreen}>dominio propio</span> y
              correo corporativo
            </h1>

            <p className={styles.lead}>
              En {businessName} te ayudamos a registrar tu dominio, activar tu
              correo empresarial y proyectar una imagen confiable desde el
              primer contacto con tus clientes.
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => onPrimaryAction("Correo Empresarial")}
              >
                Quiero empezar
              </button>

              <a href="#planes" className={styles.secondaryBtn}>
                Ver planes
              </a>
            </div>

            <div className={styles.heroMiniPoints}>
              <span>✔ Configuración guiada</span>
              <span>✔ Atención rápida</span>
              <span>✔ Imagen profesional</span>
            </div>
          </div>

          <div>
            <div className={styles.heroCard}>
              <div className={styles.heroCardTop}>
                <div>
                  <div className={styles.previewLabel}>Tu negocio</div>
                  <h3 className={styles.previewTitle}>ventas@tunegocio.com</h3>
                </div>
                <span className={styles.tag}>Listo para vender</span>
              </div>

              <div className={styles.heroCardBody}>
                <div className={styles.heroFeatureBox}>
                  <strong>Más confianza</strong>
                  <p>Tus clientes te perciben como una empresa seria.</p>
                </div>

                <div className={styles.heroFeatureBox}>
                  <strong>Más orden</strong>
                  <p>Separa tu comunicación personal de la empresarial.</p>
                </div>

                <div className={styles.heroFeatureBox}>
                  <strong>Más presencia</strong>
                  <p>Tu marca se ve sólida y memorable en internet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}