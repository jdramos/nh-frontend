import React from "react";
import styles from "./LandingDominiosCorreo.module.css";

export default function HeaderBar({ businessName }) {
  return (
    <header className={styles.headerBar}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          <div className={styles.brandBlock}>
            <div className={styles.brandLogo}>NH</div>
            <div>
              <div className={styles.brandName}>{businessName}</div>
              <div className={styles.brandSub}>
                Dominios y correo empresarial
              </div>
            </div>
          </div>

          <a href="#contacto" className={styles.headerBtn}>
            Solicitar información
          </a>
        </div>
      </div>
    </header>
  );
}