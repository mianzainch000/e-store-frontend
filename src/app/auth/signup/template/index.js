"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Loader from "@/components/Loader";
import styles from "@/css/Auth.module.css";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/components/Snackbar";
import handleAxiosError from "@/components/HandleAxiosError";

const Signup = () => {
  // Hooks
  const router = useRouter();
  const showAlertMessage = useSnackbar();
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Functions

  function validate() {
    if (!firstName.trim()) {
      showAlertMessage({ message: "First Name is required", type: "error" });
      return false;
    }

    if (!lastName.trim()) {
      showAlertMessage({ message: "Last Name is required", type: "error" });
      return false;
    }

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
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // Api Call
  const signup = async () => {
    setLoading(true);
    try {
      let res = await axios.post("signup/api", {
        firstName,
        lastName,
        email,
        password,
      });

      if (res?.status === 201) {
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
        // message: `${message}${status ? ` (Status: ${status})` : ""}`,
        message: message,
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
    signup();
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Create Account ✨</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              className={styles.inputField}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              className={styles.inputField}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
              Signup
            </button>
          </form>

          <p className={styles.loginText}>
            Already have an account? <Link href="/auth/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
