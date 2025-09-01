"use client";
import React, { useState } from "react";
import styles from "@/css/AddProduct.module.css";
import UploadImageSection from "@/components/UploadImageSection";

const page = () => {
  //Hooks
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");

  // Functions

  const handleSizeChange = (imageIndex, sizeIndex, field, value) => {
    setSizes((prev) => {
      const updated = [...prev];
      updated[imageIndex] = [...(prev[imageIndex] || [])];
      updated[imageIndex][sizeIndex] = {
        ...(updated[imageIndex][sizeIndex] || {}),
        [field]: value,
      };
      return updated;
    });
  };

  const handleAddSize = (i) => {
    setSizes((prev) => {
      const updated = [...prev];
      updated[i] = [...(prev[i] || []), { name: "", quantity: "" }];
      return updated;
    });
  };

  const handleRemoveSize = (i, j) => {
    setSizes((prev) => {
      const updated = [...prev];
      updated[i] = (prev[i] || []).filter((_, index) => index !== j);
      return updated;
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <h2 className={styles.title}>Add Product</h2>

          <input
            type="text"
            className={styles.input}
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className={styles.input}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <textarea
            className={styles.textarea}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />

          <input
            type="text"
            className={styles.input}
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <UploadImageSection
            images={images}
            onUpdate={setImages}
            sizes={sizes}
            onSizeChange={handleSizeChange}
            onAddSize={handleAddSize}
            onRemoveSize={handleRemoveSize}
          />

          <button type="submit" className={styles.submitBtn}>
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default page;
