import React from "react";
import { Navbar } from "./Navbar/Navbar";
import pagesData from '../config/pages.json';
import type { PageConfig } from '../config/types';
import { Footer } from "./Footer/Footer";
import { LoadingSpinner } from "./LoadingSpinner/LoadingSpinner";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { MoveToTopButton } from "./MoveToTopButton/MoveToTopButton";
import { styles } from "./styles";

export interface ILayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Layout: React.FC<ILayoutProps> = ({ children, isLoading = false }) => {
  // Get visible pages for the navbar
  const menuItems = (pagesData as PageConfig[]).filter(page => page.visible).map(page => ({ name: page.name, path: page.path }));
  
  return (
    <div className={styles.container}>
      <Navbar menuItems={menuItems} />
      <ThemeSwitcher />
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        <main className={styles.main}>{children}</main>
      )}
      <MoveToTopButton />
      <Footer companyName="Abhiram" year={new Date().getFullYear()} />
    </div>
  );
};
