"use client"
import React, { useState } from "react";
import styles from "@/css/Auth.module.css";
import Link from "next/link";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: API call for forgot password
        console.log("Forgot Password Email:", email);

        // reset field
        setEmail("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Forgot Password 🔑</h2>
                <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
                    Enter your registered email address, we’ll send you a reset link.
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className={styles.inputField}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit" className={styles.submitBtn}>
                        Send Reset Link
                    </button>
                </form>

                <p className={styles.loginText}>
                    Remember your password? <Link href="/auth/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
