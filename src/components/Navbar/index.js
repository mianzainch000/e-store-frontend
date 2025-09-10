"use client";
import Link from "next/link";
import React, { useState } from "react";
import { deleteCookie } from "cookies-next";
import styles from "@/css/Navbar.module.css";
import { useSnackbar } from "@/components/Snackbar";
import ConfirmModal from "@/components/ConfirmModal";
import { useRouter, usePathname } from "next/navigation";

const Navbar = ({ firstName, lastName, userRole }) => {
  const router = useRouter();
  const path = usePathname();
  const showAlertMessage = useSnackbar();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    deleteCookie("sessionToken", { path: "/" });
    router.push("/");
    deleteCookie("firstName", { path: "/" });
    deleteCookie("lastName", { path: "/" });
    showAlertMessage({
      message: "✅ Logout successful",
      type: "success",
    });
  };

  const confirmLogout = () => {
    handleLogout();
    setShowModal(false);
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
            className={`${styles.btnContainer} ${
              menuOpen ? styles.activeMenu : ""
            }`}
          >
            {/* Cross icon */}
            <button className={styles.closeBtn} onClick={toggleMenu}>
              &times;
            </button>

            <Link
              href="/screens/products"
              className={`${styles.btn} ${
                path === "/screens/products"
                  ? styles.activeSuccess
                  : styles.btnPrimary
              }`}
            >
              Products
            </Link>
            {userRole === "admin" && (
              <Link
                href="/screens/addProduct"
                className={`${styles.btn} ${
                  path === "/screens/addProduct"
                    ? styles.activeSuccess
                    : styles.btnPrimary
                }`}
              >
                Add Product
              </Link>
            )}
            <Link
              href="/screens/cart"
              className={`${styles.btn} ${
                path === "/screens/cart"
                  ? styles.activeSuccess
                  : styles.btnPrimary
              }`}
            >
              Cart
            </Link>

            {/* 🔴 Logout button → modal open */}
            <button
              className={`${styles.btn} ${styles.btnRed}`}
              onClick={() => setShowModal(true)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <h2 className={styles.welcomeText}>
        Welcome {firstName || "Guest"} {lastName || "Guest"}
      </h2>

      {/* 🔴 Confirm Modal */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmLogout}
        message="Are you sure you want to logout?"
      />
    </>
  );
};

export default Navbar;
