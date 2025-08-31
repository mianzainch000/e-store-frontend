"use client";
import styles from "@/css/Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
    const path = usePathname();
    return (
        <>
            <div className={styles.container}>
                <div className={styles.navInner}>
                    <div>Logo</div>
                    <div className={styles.btnContainer}>
                        <Link href="/products">
                            <button
                                className={` ${path === "/products" ? styles.active : styles.btn}`}
                            >
                                Products
                            </button>
                        </Link>
                        <Link href="/products">
                            <button
                                className={` ${path === "/addProduct" ? styles.active : styles.btn}`}
                            >
                                Add Product
                            </button>
                        </Link>
                        <Link href="/products">
                            <button
                                className={` ${path === "/cart" ? styles.active : styles.btn}`}
                            >
                                Cart
                            </button>
                        </Link>

                        <button className={styles.btn}>Light Mode</button>
                        <button className={styles.logoutBtn}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
