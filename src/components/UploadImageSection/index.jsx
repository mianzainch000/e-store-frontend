"use client";
import React from "react";
import styles from "@/css/UploadImageSection.module.css";

const UploadImageSection = ({
  images,
  onUpdate,
  sizes = [],
  onSizeChange,
  onAddSize,
  onRemoveSize,
}) => {
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...images];
      updated[index] = { file };
      onUpdate(updated);
    }
  };

  const handleAdd = () => {
    onUpdate([...images, null]);
  };

  const handleRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedSizes = sizes.filter((_, i) => i !== index);
    onUpdate(updatedImages);
    // Optional: also call onSizeChange externally to reset sizes
  };

  const getImagePreview = (img) => {
    if (img?.file) {
      return URL.createObjectURL(img.file);
    } else if (img?.url) {
      return img.url;
    }
    return null;
  };

  return (
    <div className={styles.imageSection}>
      <button type="button" className={styles.addImageBtn} onClick={handleAdd}>
        {images.length === 0 ? "Upload Image" : "Add Another Image"}
      </button>

      {images.map((img, index) => (
        <div key={index} className={styles.imageCard}>
          <label className={styles.imageLabel}>
            <input
              type="file"
              className={styles.hiddenInput}
              onChange={(e) => handleFileChange(e, index)}
            />
            <div className={styles.imagePreview}>
              {getImagePreview(img) ? (
                <img
                  src={getImagePreview(img)}
                  alt={`Image ${index}`}
                  className={styles.previewImage}
                />
              ) : (
                <span className={styles.icon}>📷</span>
              )}
            </div>
          </label>

          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => handleRemove(index)}
          >
            ✖
          </button>

          <div className={styles.sizeGrid}>
            <h4 className={styles.sizeTitle}>Sizes & Quantity</h4>

            {(sizes[index] || []).map((item, sizeIndex) => (
              <div key={sizeIndex} className={styles.sizeRow}>
                <input
                  className={styles.sizeInput}
                  placeholder="Size (e.g. M)"
                  value={item.name}
                  onChange={(e) =>
                    onSizeChange(index, sizeIndex, "name", e.target.value)
                  }
                />
                <input
                  className={styles.sizeInput}
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    onSizeChange(index, sizeIndex, "quantity", e.target.value)
                  }
                />
                <button
                  type="button"
                  className={styles.removeSizeBtn}
                  onClick={() => onRemoveSize(index, sizeIndex)}
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              type="button"
              className={styles.addSizeBtn}
              onClick={() => onAddSize(index)}
            >
              + Add Size
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadImageSection;
