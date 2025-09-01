import { NextResponse } from "next/server";
import axiosClient from "@/config/axiosClient";
import { apiConfig } from "@/config/apiConfig";

export const config = { api: { bodyParser: false } };

// 🔹 POST handler
export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // 🔹 Read raw data
    let rawData;
    if (contentType.includes("multipart/form-data")) {
      rawData = Buffer.from(await req.arrayBuffer());
    } else if (contentType.includes("application/json")) {
      rawData = await req.json();
    } else {
      rawData = Buffer.from(await req.arrayBuffer());
    }

    // 🔹 Convert to Axios-ready data (FormData / JSON)
    const { data: requestData, headers } = prepareRequestData(rawData, contentType);

    // 🔹 Send request to external API
    const response = await axiosClient.post(apiConfig.addProduct, requestData, { headers });

    return NextResponse.json(response.data, { status: response.status });
  } catch (err) {
    console.error("Route API Error:", err);
    return NextResponse.json(
      { message: err?.response?.data?.message || "Server Error" },
      { status: err?.response?.status || 500 }
    );
  }
}

/**
 * Prepares request data for Axios
 * - If multipart/form-data: send raw buffer (browser sets boundary)
 * - If JSON: parse if stringified, leave object untouched
 * - Otherwise: send as raw buffer
 */
function prepareRequestData(rawData, contentType) {
  let requestData = rawData;
  let headers = {};

  if (contentType.includes("multipart/form-data")) {
    // Buffer already from client, send directly
    headers["Content-Type"] = contentType;
  } else if (contentType.includes("application/json")) {
    // Check if rawData is stringified JSON
    if (typeof rawData === "string") {
      try {
        requestData = JSON.parse(rawData);
      } catch {
        requestData = rawData; // Not JSON, leave as-is
      }
    }
    headers["Content-Type"] = "application/json";
  } else {
    headers["Content-Type"] = contentType || "application/octet-stream";
  }

  return { data: requestData, headers };
}
