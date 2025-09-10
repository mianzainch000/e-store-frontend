"use client";
import React from "react";
import styles from "@/css/ConfirmModal.module.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* ❌ Close button */}
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>

        <p className={styles.message}>{message || "Are you sure?"}</p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
