import React from "react";
import { styles } from "./Footer.styles";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const companyName = "Abhiram";

  return (
    <footer className={styles.footer}>
      <span className={styles.text}>
        &copy; {currentYear} {companyName}. All rights reserved.
      </span>
    </footer>
  );
};
