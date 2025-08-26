import React, { useState, useEffect } from "react";
import { styles } from "./styles";

export const MoveToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label="Move to top"
    >
      <span className={styles.arrow}>↑</span>
    </button>
  ) : null;
};
