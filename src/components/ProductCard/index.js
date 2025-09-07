"use client";
import React from "react";
import Link from "next/link";
import NextImage from "@/components/NextImage";
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
      <div className={styles.image}>
        <NextImage
          src={image}
          alt="Prdouct"
          fill={false}
          style={{ objectFit: "fill" }}
        />
      </div>
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
