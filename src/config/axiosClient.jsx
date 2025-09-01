import axios from "axios";
import { cookies } from "next/headers";
import { apiConfig } from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  responseType: "json",
  validateStatus: () => true,
  headers: { "Content-Type": "application/json" }, // default JSON ke liye
});

// Interceptor for token + FormData handling
axiosClient.interceptors.request.use((config) => {
  let token;

  // Server-side
  try {
    token = cookies().get("sessionToken")?.value;
  } catch {}

  // Client-side
  if (!token && typeof window !== "undefined") {
    const match = document.cookie.match(/sessionToken=([^;]+)/);
    token = match ? match[1] : null;
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // 🚨 Agar data FormData hai to JSON header hata do
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export default axiosClient;
