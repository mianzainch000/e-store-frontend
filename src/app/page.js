"use client"
import React, { useState } from "react";
import styles from "@/css/Auth.module.css"
import Image from 'next/image'
import Link from 'next/link'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>


          <h2 className={styles.title}>Welcome Back 👋</h2>


          <form className={styles.form}>
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

            <div className={styles.forgotWrapper}>
              <Link href="/auth/forgotPassword" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className={styles.submitBtn} >
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
  )
}

export default Login