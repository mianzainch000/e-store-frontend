"use client"
import styles from "@/css/Navbar.module.css"
import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.w}>
                    <div>Logo</div>
                    <div className={styles.btnContainer}>
                        <button className={styles.btn}>Products</button>
                        <button className={styles.btn}>Add Product</button>
                        <button className={styles.btn}>Cart</button>
                        <button className={styles.btn}>Light Mode</button>
                        <button className={styles.logoutBtn}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar