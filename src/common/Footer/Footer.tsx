import React from "react";
import { styles } from "./styles";

export interface IFooterProps {
  companyName: string;
  year: number;
}

export const Footer: React.FC<IFooterProps> = ({ companyName, year }) => {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>
        &copy; {year} {companyName}. All rights reserved.
      </span>
    </footer>
  );
};
