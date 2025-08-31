"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Loader from "@/components/Loader";
import styles from "@/css/Auth.module.css";
import { useRouter } from "next/navigation";
import { apiConfig } from "@/config/apiConfig";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";

const ResetPassword = () => {
  //Hooks
  const router = useRouter();
  const showAlertMessage = useSnackbar();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Functions

  function validate() {
    if (!email.trim()) {
      showAlertMessage({ message: "Email is required", type: "error" });
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      showAlertMessage({ message: "Enter a valid email", type: "error" });
      return false;
    }

    if (!otp.trim()) {
      showAlertMessage({ message: "OTP is required", type: "error" });
      return false;
    }

    if (!password.trim()) {
      showAlertMessage({ message: "Password is required", type: "error" });
      return false;
    }

    if (!confirmPassword.trim()) {
      showAlertMessage({
        message: "Confirm Password is required",
        type: "error",
      });
      return false;
    }

    if (password !== confirmPassword) {
      showAlertMessage({ message: "Passwords do not match", type: "error" });
      return false;
    }

    return true;
  }

  // Reset Form

  const resetForm = () => {
    setEmail("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  };

  //Api Call

  const resetPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${apiConfig.baseUrl}${apiConfig.resetPassword}`,
        { email, otp, newPassword: password },
      );
      if (res?.status === 200) {
        showAlertMessage({
          message: res?.data?.message,
          type: "success",
        });
        resetForm();
        router.push("/");
      } else {
        showAlertMessage({
          message:
            res?.data?.errors || res?.data?.message || "Something went wrong",
          type: "error",
        });
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({
        message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Form Submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await resetPassword();
  };

  return (
    <>
      {loading && <Loader />}
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
              type="number"
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
            Back to <Link href="/">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
