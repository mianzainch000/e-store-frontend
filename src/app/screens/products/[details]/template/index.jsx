"use client";
import axios from "axios";
import Link from "next/link";
import Loader from "@/components/Loader";
import { getCookie } from "cookies-next";
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
  const userRole = getCookie("role");

  // Normalize images
  const images =
    localProductData?.images?.map((img) => img.replace(/\\/g, "/")) || [];

  // Sizes for current selected image
  const currentSizes = localProductData?.sizes?.[selectedImageIndex] || [];

  //  Fetch fresh product using getProductById API
  const fetchFreshProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/screens/products/api/${productData._id}`);
      setLocalProductData(res.data);
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
    if (productData?._id) fetchFreshProduct();
  }, [productData?._id]);

  // Update total price whenever quantity or price/discount changes
  useEffect(() => {
    if (!localProductData) return;

    const discount = Number(localProductData.discount);
    const price =
      discount && discount > 0
        ? discount // discount available
        : Number(localProductData.price || 0);

    setTotalPrice(price * quantity);
  }, [localProductData?.price, localProductData?.discount, quantity]);

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
        fetchFreshProduct();
        setQuantity(1);
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
      {!localProductData || loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          {/* Left: Images */}
          <div className={styles.left}>
            {images.length > 0 && (
              <NextImage
                src={
                  images?.[selectedImageIndex]
                    ? `${apiConfig.baseUrl}${images[selectedImageIndex]}`
                    : "/shirt.jpeg"
                }
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
            <h2 className={styles.productName}>
              <span>ProductName:</span>
              {localProductData?.name || "Product Name"}
            </h2>

            {/* Price Display */}
            <p className={styles.price}>
              Price:{" "}
              {localProductData?.discount &&
              Number(localProductData.discount) > 0 ? (
                <>
                  <del>{localProductData?.price || "00"} Rs</del>{" "}
                  <span className={styles.discountedPrice}>
                    Rs {localProductData.discount}
                  </span>
                </>
              ) : (
                <span>{localProductData?.price || "00"} Rs</span>
              )}
            </p>

            {/* Sizes */}
            <div className={styles.sizes}>
              <span>Sizes:</span>
              {currentSizes.length > 0 ? (
                currentSizes.map((s, index) => (
                  <button
                    key={index}
                    className={`${styles.sizeBtn} ${
                      index === selectedSizeIndex ? styles.activeSize : ""
                    }`}
                    onClick={() => setSelectedSizeIndex(index)}
                  >
                    {s.name} ({s.quantity})
                  </button>
                ))
              ) : (
                <span className={styles.noSize}>No Sizes Available</span>
              )}
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
              <strong> {totalPrice || "00"} Rs </strong>
            </div>

            <CustomButton
              type="submit"
              text="Add to Cart"
              variant="primary"
              onClick={addToCart}
              className={styles.cartBtn}
            />
            {userRole === "admin" && (
              <Link href={`/screens/addProduct/${localProductData?._id}`}>
                <CustomButton
                  text="Edit"
                  variant="warning"
                  className={styles.cartBtn}
                />
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
