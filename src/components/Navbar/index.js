"use client";
import Link from "next/link";
import styles from "@/css/Navbar.module.css";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";

const Navbar = ({ initialTheme, firstName, lastName }) => {
    const path = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(initialTheme || "light");

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        const savedTheme = getCookie("theme") || theme;
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setCookie("theme", newTheme, { maxAge: 60 * 60 * 24 * 365 });
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <>
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
                            href="/screens/products"
                            className={`${styles.btn} ${path === "/screens/products" ? styles.activeSuccess : styles.btnPrimary}`}
                        >
                            Products
                        </Link>

                        <Link
                            href="/screens/addProduct"
                            className={`${styles.btn} ${path === "/screens/addProduct" ? styles.activeSuccess : styles.btnPrimary}`}
                        >
                            Add Product
                        </Link>
                        <Link
                            href="/screens/cart"
                            className={`${styles.btn} ${path === "/screens/cart" ? styles.activeSuccess : styles.btnPrimary}`}
                        >
                            Cart
                        </Link>
                        <button
                            className={`${styles.btn} ${styles.btnPrimary}`}
                            onClick={toggleTheme}
                        >
                            <span>
                                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                            </span>
                        </button>
                        <button className={`${styles.btn} ${styles.btnRed}`}>Logout</button>
                    </div>
                </div>
            </div>
            <h2 className={styles.welcomeText}> Welcome {firstName || "Guest"} {lastName || "Guest"}</h2>
        </>
    );
};

export default Navbar;
