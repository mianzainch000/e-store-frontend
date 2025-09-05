import axios from "axios";
import { cookies } from "next/headers";
import { apiConfig } from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  responseType: "json",
  validateStatus: () => true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(function (config) {
  const sessionInfo = cookies().get("sessionToken");

  if (sessionInfo?.value) {
    const token = sessionInfo.value;
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  config.headers["Content-Type"] =
    config.data instanceof FormData
      ? "multipart/form-data"
      : "application/json";

  return config;
});

export default axiosClient;
