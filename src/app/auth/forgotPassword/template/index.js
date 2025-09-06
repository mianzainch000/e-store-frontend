"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Loader from "@/components/Loader";
import styles from "@/css/Auth.module.css";
import { useRouter } from "next/navigation";
import { apiConfig } from "@/config/apiConfig";
import TextInput from "@/components/TextInput";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";
import CustomButton from "@/components/Button";

const ForgotPassword = () => {
  // Hooks

  const router = useRouter();
  const showAlertMessage = useSnackbar();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Functions

  function validate() {
    if (!email.trim()) {
      showAlertMessage({ message: "Email is required", type: "error" });
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      showAlertMessage({ message: "Enter a valid email", type: "error" });
      return false;
    }
    return true;
  }

  // Reset Form

  const resetForm = () => {
    setEmail("");
  };

  // Api Call

  const fotgotPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${apiConfig.baseUrl}${apiConfig.forgotPassword}`,
        { email }
      );
      if (res?.status === 200) {
        showAlertMessage({
          message: res?.data?.message,
          type: "success",
        });
        resetForm();
        router.push("/auth/resetPassword");
      } else {
        showAlertMessage({
          message: res?.data.message,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    fotgotPassword();
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Forgot Password 🔑</h2>
          <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
            Enter your registered email address, we’ll send you a reset link.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <TextInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <CustomButton
              type="submit"
              text="Send Reset Link"
              variant="primary"
            />
          </form>

          <p className={styles.loginText}>
            Remember your password? <Link href="/">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
