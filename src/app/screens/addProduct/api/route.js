import { NextResponse } from "next/server";
import axiosClient from "@/config/axiosClient";
import { apiConfig } from "@/config/apiConfig";

export const config = { api: { bodyParser: false } };

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let requestData;
    let headers = {};

    if (contentType.includes("multipart/form-data")) {
      // Forward raw buffer for multipart/form-data
      requestData = Buffer.from(await req.arrayBuffer());
      headers["Content-Type"] = contentType; // boundary included by browser
    } else if (contentType.includes("application/json")) {
      requestData = await parseJSON(req);
      headers["Content-Type"] = "application/json";
    } else {
      // Fallback: raw buffer for unknown content-types
      requestData = Buffer.from(await req.arrayBuffer());
      headers["Content-Type"] = contentType || "application/octet-stream";
    }

    // Send request to external API
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

// Safely parse JSON if necessary
async function parseJSON(req) {
  try {
    // Already parsed JSON will be returned as-is
    return await req.json();
  } catch {
    // Fallback: return raw text or primitive
    return await req.text();
  }
}
