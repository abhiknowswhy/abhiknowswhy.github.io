import React from "react";
import { styles } from "./styles";

export const LoadingSpinner: React.FC = () => (
  <div className={styles.container}>
    <svg className={styles.spinner} viewBox="0 0 24 24">
      <circle className={styles.circle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className={styles.path} d="M4 12a8 8 0 018-8v8z" />
    </svg>
  </div>
);
