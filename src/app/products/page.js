"use client";
import styles from "@/css/Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
    const path = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className={styles.container}>
            <div className={styles.navInner}>
                <div className={styles.logo}>Logo</div>

                {/* Hamburger icon */}
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                {/* Fullscreen menu overlay */}
                <div
                    className={`${styles.btnContainer} ${menuOpen ? styles.activeMenu : ""}`}
                >
                    <button className={styles.closeBtn} onClick={toggleMenu}>
                        &times;
                    </button>

                    <Link
                        href="/products"
                        className={path === "/products" ? styles.active : styles.btn}
                    >
                        Products
                    </Link>

                    <Link
                        href="/products"
                        className={path === "/addProduct" ? styles.active : styles.btn}
                    >
                        Add Product
                    </Link>
                    <Link
                        href="/products"
                        className={path === "/cart" ? styles.active : styles.btn}
                    >
                        Cart
                    </Link>
                    <button className={styles.btn}>Light Mode</button>
                    <button className={styles.logoutBtn}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
