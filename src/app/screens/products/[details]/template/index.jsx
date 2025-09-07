"use client";
import axios from "axios";
import Link from "next/link";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import { apiConfig } from "@/config/apiConfig";
import NextImage from "@/components/NextImage";
import CustomButton from "@/components/Button";
import styles from "@/css/ProductDetail.module.css";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";

const ProductDetail = ({ productData }) => {
  const showAlertMessage = useSnackbar();

  // Local state copy for runtime updates
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [localProductData, setLocalProductData] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Normalize images
  const images =
    localProductData?.images?.map((img) => img.replace(/\\/g, "/")) || [];

  // Sizes for current selected image
  const currentSizes = localProductData?.sizes?.[selectedImageIndex] || [];

  // data show
  // ✅ Fetch fresh product using getProductById API
  useEffect(() => {
    const fetchFreshProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/screens/products/api/${productData._id}`);

        if (res?.data) setLocalProductData(res.data);
      } catch (err) {
        console.error("Failed to fetch fresh product:", err);
        setLocalProductData(productData);
      } finally {
        setLoading(false);
      }
    };

    if (productData?._id) fetchFreshProduct();
  }, [productData?._id]);

  // Update total price whenever quantity or price changes
  useEffect(() => {
    setTotalPrice(localProductData?.price * quantity);
  }, [localProductData?.price, quantity]);

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const maxQty = currentSizes[selectedSizeIndex]?.quantity || 0;

    if (value > maxQty) {
      showAlertMessage({
        message: `Available quantity is only ${maxQty}`,
        type: "error",
      });
      setQuantity(maxQty);
    } else {
      setQuantity(value);
    }
  };

  // Add to cart
  const addToCart = async () => {
    if (!currentSizes[selectedSizeIndex]) return;

    try {
      setLoading(true);

      const payload = {
        productId: localProductData._id,
        sizeName: currentSizes[selectedSizeIndex].name,
        quantity,
      };

      const res = await axios.post("/screens/products/api", payload);

      if (res?.status === 201) {
        showAlertMessage({ message: res?.data.message, type: "success" });

        // Runtime update of selected size quantity
        setLocalProductData((prev) => ({
          ...prev,
          sizes: prev.sizes.map((imgSizes, imgIndex) =>
            imgSizes.map((size, sizeIndex) =>
              imgIndex === selectedImageIndex && sizeIndex === selectedSizeIndex
                ? { ...size, quantity: size.quantity - quantity }
                : size
            )
          ),
        }));

        setQuantity(1); // Reset quantity input
      } else {
        showAlertMessage({
          message: res?.data?.message || "Something went wrong",
          type: "error",
        });
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        {/* Left: Images */}
        <div className={styles.left}>
          {images.length > 0 && (
            <NextImage
              src={`${apiConfig.baseUrl}${images[selectedImageIndex]}`}
              alt="Main Product"
              fill={false}
              style={{ objectFit: "fill" }}
              width={300}
              height={300}
              className={styles.mainImage}
            />
          )}
          <div className={styles.thumbnails}>
            {images.map((img, index) => (
              <NextImage
                key={index}
                src={`${apiConfig.baseUrl}${img}`}
                alt={`Thumb ${index + 1}`}
                style={{ objectFit: "fill" }}
                width={80}
                height={80}
                className={
                  index === selectedImageIndex ? styles.activeThumb : ""
                }
                onClick={() => {
                  setSelectedImageIndex(index);
                  setSelectedSizeIndex(0);
                  setQuantity(1);
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className={styles.right}>
          <h2 className={styles.productName}>{localProductData?.name}</h2>
          <p className={styles.price}>Rs {localProductData?.price}</p>

          {/* Sizes */}
          <div className={styles.sizes}>
            <span>Sizes:</span>
            {currentSizes.map((s, index) => (
              <button
                key={index}
                className={`${styles.sizeBtn} ${index === selectedSizeIndex ? styles.activeSize : ""}`}
                onClick={() => setSelectedSizeIndex(index)}
              >
                {s.name} ({s.quantity})
              </button>
            ))}
          </div>

          {/* Quantity */}
          <div className={styles.quantity}>
            <span>Quantity:</span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              disabled={currentSizes.length === 0}
            />
          </div>

          {/* Total Price */}
          <div className={styles.total}>
            <span>Total Price:</span>
            <strong>Rs. {totalPrice}</strong>
          </div>

          {/* Buttons */}
          {/* <button className={styles.cartBtn} onClick={addToCart}>
            Add to Cart
          </button> */}
          <CustomButton
            type="submit"
            text="Add to Cart"
            variant="primary"
            onClick={addToCart}
            className={styles.cartBtn}
          />
          <Link href={`/screens/addProduct/${localProductData?._id}`}>
            <CustomButton
              text="Edit"
              variant="warning"
              className={styles.cartBtn}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
