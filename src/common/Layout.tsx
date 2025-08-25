import React from "react";
import Navbar from "./Navbar";
import pagesData from '../config/pages.json';
import type { PageConfig } from '../config/types';
import Footer from "./Footer";
import LoadingSpinner from "./LoadingSpinner";
import ThemeSwitcher from "./ThemeSwitcher";
import MoveToTopButton from "./MoveToTopButton";

export interface LayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}


const Layout: React.FC<LayoutProps> = ({ children, isLoading = false }) => {
  // Get visible pages for the navbar
  const menuItems = (pagesData as PageConfig[]).filter(page => page.visible).map(page => ({ name: page.name, path: page.path }));
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar menuItems={menuItems} />
      <ThemeSwitcher />
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      )}
      <MoveToTopButton />
  <Footer companyName="Abhiram" year={new Date().getFullYear()} />
    </div>
  );
};

export default Layout;
