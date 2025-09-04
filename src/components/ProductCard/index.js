"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/css/ProductCard.module.css";

const ProductCard = ({
  image,
  price,
  productId,
  onDelete,
  onViewDetail,
  onClick,
}) => {
  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt="Product"
        width={80}
        height={80}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.price}>Rs. {price}</h3>

        <div className={styles.buttons}>
          <Link href={`/screens/products/${productId}`} onClick={onViewDetail}>
            <button className={styles.viewButton} onClick={onClick}>
              View Detail
            </button>
          </Link>

          <button className={styles.deleteButton} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
