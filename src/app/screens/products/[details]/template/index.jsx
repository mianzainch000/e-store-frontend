"use client";
import Link from "next/link";
import Image from "next/image";
import { setCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { apiConfig } from "@/config/apiConfig";
import styles from "@/css/ProductDetail.module.css";
import { useSnackbar } from "@/components/Snackbar";

const ProductDetail = ({ productData }) => {
  const showAlertMessage = useSnackbar();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // images normalize
  const images =
    productData?.images?.map((img) => img.replace(/\\/g, "/")) || [];

  // current image ke sizes
  const currentSizes = productData?.sizes?.[selectedImageIndex] || [];

  const handleEdit = (product) => {
    setCookie(`expense_${product._id}`, JSON.stringify(product), {
      maxAge: 60 * 60 * 24 * 7,
    });
  };

  // quantity

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const maxQty = currentSizes[selectedSizeIndex]?.quantity || 0;

    if (value > maxQty) {
      showAlertMessage({
        message: `Available quantity is only ${maxQty}`,
        type: "error",
      });

      setQuantity(maxQty); // force to max
    } else {
      setQuantity(value);
    }
  };

  // total Price

  useEffect(() => {
    setTotalPrice(productData?.price * quantity);
  }, [productData?.price, quantity]);

  return (
    <div className={styles.container}>
      {/* Left Side Images */}
      <div className={styles.left}>
        {images.length > 0 && (
          <Image
            src={`${apiConfig.baseUrl}${images[selectedImageIndex]}`}
            alt="Main Product"
            width={400}
            height={400}
            className={styles.mainImage}
          />
        )}

        <div className={styles.thumbnails}>
          {images.map((img, index) => (
            <Image
              key={index}
              src={`${apiConfig.baseUrl}${img}`}
              alt={`Thumb ${index + 1}`}
              width={80}
              height={80}
              className={index === selectedImageIndex ? styles.activeThumb : ""}
              onClick={() => {
                setSelectedImageIndex(index);
                setSelectedSizeIndex(0); // reset size when image changes
                setQuantity(1);
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Side Details */}
      <div className={styles.right}>
        <h2 className={styles.productName}>{productData?.name}</h2>
        <p className={styles.price}>Rs {productData?.price}</p>

        {/* Sizes per image */}
        <div className={styles.sizes}>
          <span>Sizes:</span>
          <>
            {currentSizes.map((s, index) => (
              <button
                key={index}
                className={`${styles.sizeBtn} ${
                  index === selectedSizeIndex ? styles.activeSize : ""
                }`}
                onClick={() => setSelectedSizeIndex(index)}
              >
                {s.name} ({s.quantity})
              </button>
            ))}
          </>
        </div>

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

        {/* Selected Size Info */}
        {currentSizes.length > 0 && (
          <div className={styles.selectedInfo}>
            {/* <p>
              Selected Size:{" "}
              <strong>{currentSizes[selectedSizeIndex]?.name}</strong>
            </p> */}
            <p>
              Quantity:{" "}
              <strong>{currentSizes[selectedSizeIndex]?.quantity}</strong>
            </p>
          </div>
        )}

        <div className={styles.total}>
          <span>Total Price:</span>
          <strong>Rs. {totalPrice}</strong>
        </div>

        <button className={styles.cartBtn}>Add to Cart</button>
        <Link
          href={`/screens/addProduct/${productData?._id}`}
          className={styles.editBtn}
          onClick={() => handleEdit(productData)}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
