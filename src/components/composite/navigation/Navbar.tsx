import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "../controls/ThemeSwitcher";
import type { GlobalProps } from "../../../types/globalProps";
import { styles } from "./Navbar.styles";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../primitives/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../primitives/sheet";
import { Button } from "../../primitives/button";
import { Menu, X } from "lucide-react";
import pagesConfig from "../../../config/pages.json";

export interface INavbarProps {
  globalProps: GlobalProps;
}

export const Navbar: React.FC<INavbarProps> = ({ globalProps }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { viewMode } = globalProps;

  // Filter visible pages for navigation
  const menuItems = pagesConfig
    .filter(page => page.visible)
    .map(page => ({ name: page.name, path: page.path }));

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} navbar`}>
      <div className={styles.logoContainer}>
        <span className={styles.brandName}>Portfolio</span>
      </div>

      {viewMode === 'desktop' && (
        <div className={styles.desktopNav}>
          <NavigationMenu>
            <NavigationMenuList className={styles.menuList}>
              {menuItems.map((item, idx) => (
                <NavigationMenuItem key={idx} className={styles.menuItem}>
                  <Link to={item.path} onClick={closeMobileMenu}>
                    <NavigationMenuLink className={styles.menuLink}>
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className={styles.themeSwitcherContainer}>
            <ThemeSwitcher />
          </div>
        </div>
      )}

      {viewMode === 'mobile' && (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className={styles.mobileMenuButton}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className={styles.mobileMenuContent}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <SheetHeader className={styles.mobileMenuHeader}>
              <SheetTitle className={styles.mobileMenuTitle}>Menu</SheetTitle>
              <Button 
                variant="ghost" 
                size="icon"
                className={styles.mobileMenuCloseButton}
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </SheetHeader>
            
            <ul className={styles.mobileMenuList}>
              {menuItems.map((item, idx) => (
                <li key={idx} className={styles.mobileMenuItem}>
                  <Link to={item.path} onClick={closeMobileMenu} className={styles.mobileMenuLink}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className={styles.mobileThemeSwitcher}>
              <ThemeSwitcher />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </nav>
  );
};
