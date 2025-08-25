import React from "react";

export interface FooterProps {
  companyName: string;
  year: number;
}

const Footer: React.FC<FooterProps> = ({ companyName, year }) => {
  return (
    <footer className="w-full text-center py-4 bg-primary text-white mt-auto">
      &copy; {year} {companyName}. All rights reserved.
    </footer>
  );
};

export default Footer;
