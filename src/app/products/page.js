"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "@/css/Navbar.module.css";
import { usePathname } from "next/navigation";

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
          {/* Cross icon */}

          <button className={styles.closeBtn} onClick={toggleMenu}>
            &times;
          </button>

          <Link
            href="/products"
            className={`${styles.btn} ${path === "/products" ? styles.activeSuccess : styles.btnPrimary}`}
          >
            Products
          </Link>

          <Link
            href="/addProduct"
            className={`${styles.btn} ${path === "/addProduct" ? styles.activeSuccess : styles.btnPrimary}`}
          >
            Add Product
          </Link>
          <Link
            href="/cart"
            className={`${styles.btn} ${path === "/cart" ? styles.activeSuccess : styles.btnPrimary}`}
          >
            Cart
          </Link>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            Light Mode
          </button>
          <button className={`${styles.btn} ${styles.btnRed}`}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
