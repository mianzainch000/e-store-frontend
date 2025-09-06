"use client";
import axios from "axios";
import Loader from "@/components/Loader";
import { setCookie } from "cookies-next";
import styles from "@/css/Products.module.css";
import { apiConfig } from "@/config/apiConfig";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";

const Products = () => {
  // hooks
  const showAlertMessage = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // unique categories
  //   new Set(...)

  // Set JavaScript ka built-in object hai jo sirf unique values rakhta hai.

  // Agar duplicates hain to wo automatically remove ho jate hain.
  const uniqueCategories = [...new Set(products.map((item) => item.category))];

  // filter products
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    if (uniqueCategories.length === 1) {
      setSelectedCategory(uniqueCategories[0]); // sirf ek bachi ho to usi ko active karo
    } else if (uniqueCategories.length > 1) {
      if (
        selectedCategory !== "all" &&
        !uniqueCategories.includes(selectedCategory)
      ) {
        // agar selected wali category delete ho gayi hai
        setSelectedCategory("all");
      }
    } else {
      setSelectedCategory(""); // koi category nahi bachi
    }
  }, [uniqueCategories, selectedCategory]);

  // get products
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("products/api");
      const prod = res?.data?.products || [];
      setProducts(prod);
      // new Set(...)

      // Set JavaScript ka built-in object hai jo sirf unique values rakhta hai.

      // Agar duplicates hain to wo automatically remove ho jate hain.
      const categories = [...new Set(prod.map((item) => item.category))];

      // set default category
      if (categories.length === 1) {
        setSelectedCategory(categories[0]); // only one category → auto active
      } else if (categories.length > 1) {
        setSelectedCategory("all"); // multiple categories → All active
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

  // delete product
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`products/api/${id}`, { data: { id } });

      if (res?.status === 200) {
        showAlertMessage({ message: res.data.message, type: "success" });
        setProducts((prev) => prev.filter((exp) => exp._id !== id));
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

  useEffect(() => {
    getProducts();
  }, []);

  // edit handler
  const handleEdit = (row) => {
    setCookie(`products_${row._id}`, JSON.stringify(row), {
      maxAge: 24 * 60 * 60,
    });
  };

  return (
    <div>
      {loading && <Loader />}

      {/* Categories */}
      {uniqueCategories.length > 0 && (
        <ul className={styles.categoryList}>
          {/* Show All only if 2 or more categories exist */}
          {uniqueCategories.length > 1 && (
            <li
              className={`${styles.categoryItem} ${selectedCategory === "all" ? styles.active : ""
                }`}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </li>
          )}

          {/* Categories */}
          {uniqueCategories.map((category) => (
            <li
              key={category}
              className={`${styles.categoryItem} ${selectedCategory === category ? styles.active : ""
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className={styles.cardContainer}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              image={`${apiConfig.baseUrl}${product.images?.[0]}`}
              price={product.price}
              productId={product._id}
              onClick={() => handleEdit(product)}
              onDelete={() => handleDelete(product._id)}
            />
          ))}
        </div>
      ) : (
        <p>No products found in this category</p>
      )}
    </div>
  );
};

export default Products;
