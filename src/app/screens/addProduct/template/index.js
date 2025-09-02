"use client";
import axios from "axios";
import React, { useState } from "react";
import Loader from "@/components/Loader";
import styles from "@/css/AddProduct.module.css";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";
import UploadImageSection from "@/components/UploadImageSection";

const ProductForm = () => {
  //Hooks
  const showAlertMessage = useSnackbar();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

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

  function validate() {
    if (!name || name.trim() === "") {
      showAlertMessage({
        message: "❌ Product name is required.",
        type: "error",
      });
      return false;
    }

    if (!price || String(price).trim() === "") {
      showAlertMessage({
        message: "❌ Price is required.",
        type: "error",
      });
      return false;
    }

    if (!description || description.trim() === "") {
      showAlertMessage({
        message: "❌ Description is required.",
        type: "error",
      });
      return false;
    }

    if (!category || category.trim() === "") {
      showAlertMessage({
        message: "❌ Category is required.",
        type: "error",
      });
      return false;
    }

    if (!images || images.length === 0) {
      showAlertMessage({
        message: "❌ At least one image is required.",
        type: "error",
      });
      return false;
    }

    return true; // ✅ All validations passed
  }

  // Reset Form

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImages([]);
    setSizes([]);
    setCategory("");
  };

  //  Api Call

  const addProduct = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post("addProduct/api", formData);
      if (res?.status === 201) {
        showAlertMessage({
          message: res?.data.message,
          type: "success",
        });
        resetForm();
      } else {
        showAlertMessage({
          message: res?.data?.message || "Something went wrong",
          type: "error",
        });
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({
        message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  // Form Submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("sizes", JSON.stringify(sizes));

    const imageOrder = images.map((img, idx) => {
      if (img?.file) {
        // Store file and mark as newFile:index
        const fileIndex = idx;
        formData.append("images", img.file);
        return `newFile:${fileIndex}`;
      } else if (img?.url) {
        // Keep the existing image path
        return img.url;
      }
      return "";
    });

    formData.append("imageOrder", JSON.stringify(imageOrder));

    await addProduct(formData);
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            spellCheck={false} // ✅ prevent browser injection mismatch
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

export default ProductForm;
