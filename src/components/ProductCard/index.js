"use client";
import React from "react";
import styles from "./ProductCard.module.css";
import Link from "next/link";

const ProductCard = ({ image, price, productId, onDelete, onViewDetail }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt="Product" className={styles.image} />
            <div className={styles.content}>
                <h3 className={styles.price}>Rs. {price}</h3>

                <div className={styles.buttons}>
                    <Link href={`/products/${productId}`} onClick={onViewDetail}>
                        <button className={styles.viewButton}>View Detail</button>
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
