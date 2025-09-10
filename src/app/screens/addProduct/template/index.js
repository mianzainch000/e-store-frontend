"use client";
import axios from "axios";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { apiConfig } from "@/config/apiConfig";
import TextInput from "@/components/TextInput";
import CustomButton from "@/components/Button";
import styles from "@/css/AddProduct.module.css";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";
import UploadImageSection from "@/components/UploadImageSection";
const ProductForm = ({ editId }) => {
  //Hooks
  const router = useRouter();
  const [name, setName] = useState("");
  const showAlertMessage = useSnackbar();
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [shippingFee, setShippingFee] = useState("");

  // useEffect for update data

  useEffect(() => {
    if (editId) {
      setName(editId.name || "");
      setPrice(editId.price || "");
      setDiscount(editId.discount || "00");
      setDescription(editId.description || "");
      setCategory(editId.category || "");
      setShippingFee(editId.shippingFee || "");

      const formattedImages = (editId.images || []).map((imgPath) => ({
        url: `${apiConfig.baseUrl}${imgPath.replace(/\\/g, "/")}`,
      }));
      setImages(formattedImages);

      setSizes(editId.sizes || []);
    }
  }, [editId]);

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
    setDiscount("");
    setDescription("");
    setImages([]);
    setSizes([]);
    setCategory("");
    setShippingFee("");
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

  const updateProduct = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `/screens/addProduct/api/${editId?._id}`,
        formData,
      );
      if (res?.status === 200) {
        showAlertMessage({
          message: res?.data.message,
          type: "success",
        });
        router.push("/screens/addProduct");
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
    formData.append("discount", discount);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("shippingFee", shippingFee);
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

    if (!editId?._id) {
      await addProduct(formData);
    } else {
      await updateProduct(formData);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>
            {" "}
            {editId?._id ? "Update Product" : "Add Product"}
          </h2>

          <TextInput
            type="text"
            className={styles.input}
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextInput
            type="number"
            className={styles.input}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextInput
            type="number"
            className={styles.input}
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />

          <textarea
            className={styles.textarea}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            spellCheck={false}
          />

          <TextInput
            type="text"
            className={styles.input}
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <TextInput
            type="number"
            className={styles.input}
            placeholder="ShippingFee"
            value={shippingFee}
            onChange={(e) => setShippingFee(e.target.value)}
          />

          <UploadImageSection
            images={images}
            onUpdate={setImages}
            sizes={sizes}
            onSizeChange={handleSizeChange}
            onAddSize={handleAddSize}
            onRemoveSize={handleRemoveSize}
          />

          <CustomButton
            type="submit"
            text={editId?._id ? "Update Product" : "Add Product"}
            variant="primary"
          />
        </form>
      </div>
    </>
  );
};

export default ProductForm;
