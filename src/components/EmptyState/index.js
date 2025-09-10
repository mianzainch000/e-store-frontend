import React from "react";
import styles from "@/css/EmptyState.module.css";

const EmptyState = ({ message = "No product found" }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.iconBox}>
        <span className={styles.icon}>🛍️</span>
      </div>

      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default EmptyState;
