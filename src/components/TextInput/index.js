"use client";
import React from "react";
import styles from "@/css/TextInput.module.css";

const TextInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  startIcon,
  endIcon,
  onEndIconClick,
}) => {
  // dynamic class setup
  let inputClass = styles.inputField;
  if (startIcon) inputClass += " " + styles.hasStartIcon;
  if (endIcon) inputClass += " " + styles.hasEndIcon;

  return (
    <div className={styles.inputWrapper}>
      {startIcon && <span className={styles.icon}>{startIcon}</span>}

      <input
        type={type}
        placeholder={placeholder}
        className={inputClass}
        value={value}
        onChange={onChange}
      />

      {endIcon && (
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onEndIconClick}
        >
          {endIcon}
        </button>
      )}
    </div>
  );
};

export default TextInput;
