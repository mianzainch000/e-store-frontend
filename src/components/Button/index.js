"use client";
import React from "react";
import styles from "@/css/Button.module.css";

const CustomButton = ({
  type = "button",
  text,
  onClick,
  variant = "primary",
  disabled = false,
  startIcon,
  endIcon,
}) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className={styles.icon}>{startIcon}</span>}
      {text}
      {endIcon && <span className={styles.icon}>{endIcon}</span>}
    </button>
  );
};

export default CustomButton;
