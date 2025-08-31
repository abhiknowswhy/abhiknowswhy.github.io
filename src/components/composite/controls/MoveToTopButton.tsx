import React from "react";
import { styles } from "./MoveToTopButton.styles";

export const MoveToTopButton: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label="Move to top"
    >
      <span className={styles.arrow}>↑</span>
    </button>
  );
};
