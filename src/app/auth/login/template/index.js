"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Loader from "@/components/Loader";
import styles from "@/css/Auth.module.css";
import TextInput from "@/components/TextInput";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";

const Login = () => {
  // Hooks
  const showAlertMessage = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Functions

  //  Validation

  function validate() {
    if (!email.trim()) {
      showAlertMessage({ message: "Email is required", type: "error" });
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      showAlertMessage({ message: "Enter a valid email", type: "error" });
      return false;
    }

    if (!password.trim()) {
      showAlertMessage({ message: "Password is required", type: "error" });
      return false;
    }
    return true;
  }

  // Reset Form

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  // Api Call

  const loginApi = async () => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        showAlertMessage({ message: "✅ Login successful", type: "success" });
        resetForm();
        window.location.href = "/screens/products";
      } else {
        showAlertMessage({
          message: `❌ ${res?.error}`,
          type: "error",
        });
      }
    } catch (error) {
      const { message } = handleAxiosError(error);
      showAlertMessage({
        message: message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Form Submit

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    await loginApi();
  }

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Welcome Back 👋</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endIcon={showPassword ? "🙈" : "👁️"}
              onEndIconClick={() => setShowPassword(!showPassword)}
            />

            <div className={styles.forgotWrapper}>
              <Link href="/auth/forgotPassword" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Sign In
            </button>
          </form>

          <button className={styles.googleBtn}>
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
            Login with Google
          </button>

          <p className={styles.loginText}>
            Don’t have an account? <Link href="/auth/signup">Signup</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
