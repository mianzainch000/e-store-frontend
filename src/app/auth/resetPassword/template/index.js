"use client"
import React, { useState } from "react";
import styles from "@/css/Auth.module.css";
import Link from "next/link";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // TODO: Call reset password API
        console.log("Reset Data:", { email, otp, password, confirmPassword });

        // Reset form
        setEmail("");
        setOtp("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Reset Password 🔒</h2>
                <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
                    Enter your email, OTP and new password to reset your account.
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.inputField}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className={styles.inputField}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            className={styles.inputField}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={styles.toggleBtn}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <div className={styles.passwordWrapper}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className={styles.inputField}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={styles.toggleBtn}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Reset Password
                    </button>
                </form>

                <p className={styles.loginText}>
                    Back to <Link href="/auth/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
