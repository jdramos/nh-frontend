import React from "react";
import styles from "./LandingDominiosCorreo.module.css";

export default function FloatingWhatsApp({ whatsappLink }) {
  return (
    <>
      <div className={styles.floatingLabel}>Escríbenos</div>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingWhatsApp}
        aria-label="WhatsApp Nicaragua Hosting"
      >
        💬
      </a>
    </>
  );
}