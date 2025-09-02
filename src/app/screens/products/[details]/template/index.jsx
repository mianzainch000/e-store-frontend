"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { apiConfig } from "@/config/apiConfig";
import styles from "@/css/ProductDetail.module.css";
import { setCookie } from "cookies-next";

const ProductDetail = ({ productData }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images =
    productData?.images?.map((img) => img.replace(/\\/g, "/")) || [];

  const handleEdit = (product) => {
    setCookie(`expense_${product._id}`, JSON.stringify(product), {
      maxAge: 60 * 60 * 24 * 7,
    });
  };

  return (
    <div className={styles.container}>
      {/* Left Side Images */}
      <div className={styles.left}>
        <Image
          src={`${apiConfig.baseUrl}${images[selectedIndex]}`}
          alt="Main Product"
          width={400}
          height={400}
          className={styles.mainImage}
        />

        <div className={styles.thumbnails}>
          {images.map((img, index) => (
            <Image
              key={index}
              src={`${apiConfig.baseUrl}${img}`}
              alt={`Thumb ${index + 1}`}
              width={80}
              height={80}
              className={index === selectedIndex ? styles.activeThumb : ""}
              onClick={() => {
                setSelectedIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Side Details */}
      <div className={styles.right}>
        <h2 className={styles.productName}>Shirt</h2>
        <p className={styles.price}>Rs 2000</p>

        <div className={styles.sizes}>
          <span>Sizes:</span>
        </div>

        <div className={styles.total}>
          <span>Total Price:</span>
          <strong>Rs. 50000</strong>
        </div>

        <button className={styles.cartBtn}>Add to Cart</button>
        <Link
          href={`/screens/addProduct/${productData?._id}`}
          className={styles.editBtn}
          onClick={() => handleEdit(productData)}
        >
          {" "}
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
