import React from "react";
import { Link } from "react-router-dom";
import { styles } from "./styles";

export interface INavbarProps {
  logoUrl?: string;
  menuItems: { name: string; path: string }[];
}

export const Navbar: React.FC<INavbarProps> = ({ logoUrl, menuItems }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        {logoUrl && <img src={logoUrl} alt="Logo" className={styles.logo} />}
        <span className={styles.brandName}>Portfolio</span>
      </div>
      <ul className={styles.menuList}>
        {menuItems.map((item, idx) => (
          <li key={idx} className={styles.menuItem}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="md:hidden">
        {/* Mobile menu icon or dropdown can be added here */}
        <button className={styles.mobileMenuButton} aria-label="Open menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </nav>
  );
};
