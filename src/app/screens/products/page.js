"use client";
import axios from "axios";
import Loader from "@/components/Loader";
import styles from "./Products.module.css";
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

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("products/api");

      setProducts(res?.data?.products || []);
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

  return (
    <div>
      {loading && <Loader />}

      {products.length > 0 ? (
        <div className={styles.cardContainer}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              image={`${apiConfig.baseUrl}${product.images?.[0]}`}
              price={product.price}
            // productId={product._id}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Products;
