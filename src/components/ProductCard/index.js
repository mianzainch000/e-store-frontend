"use client";
import React from "react";
import Link from "next/link";
import CustomButton from "../Button";
import { getCookie } from "cookies-next";
import NextImage from "@/components/NextImage";
import styles from "@/css/ProductCard.module.css";

const ProductCard = ({
  image,
  price,
  discount,
  productId,
  onDelete,
  onViewDetail,
  onClick,
}) => {
  const userRole = getCookie("role");
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <NextImage
          src={image || "/shirt.jpeg"}
          alt="Prdouct"
          fill={false}
          style={{ objectFit: "fill" }}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.price}>
          {discount ? (
            <>
              <del>{price} Rs</del> <span>{discount} Rs</span>
            </>
          ) : (
            <span>{price} Rs</span>
          )}
        </h3>

        <div className={styles.buttons}>
          <Link href={`/screens/products/${productId}`} onClick={onViewDetail}>
            <CustomButton
              text="View Detail"
              variant="primary"
              onClick={onClick}
            />
          </Link>
          {userRole === "admin" && (
            <CustomButton
              text=" Delete"
              onClick={onDelete}
              className={styles.deleteButton}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
