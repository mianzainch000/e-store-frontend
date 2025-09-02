import { NextResponse } from "next/server";
import axiosClient from "@/config/axiosClient";
import { apiConfig } from "@/config/apiConfig";

export const config = { api: { bodyParser: false } };
export const runtime = "nodejs"; // Node.js runtime for buffer handling

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let requestData;
    let headers = {};

    if (contentType.includes("multipart/form-data")) {
      // Forward raw buffer for multipart/form-data
      // Backend can parse if needed
      requestData = Buffer.from(await req.arrayBuffer());
      headers["Content-Type"] = contentType; // browser boundary included
    } else if (contentType.includes("application/json")) {
      // Parse JSON if needed, else use as-is
      requestData = await parseJSON(req);
      headers["Content-Type"] = "application/json";
    } else {
      // Fallback: unknown content-type → raw buffer
      requestData = Buffer.from(await req.arrayBuffer());
      headers["Content-Type"] = contentType || "application/octet-stream";
    }

    // Send to external API
    const response = await axiosClient.post(
      apiConfig.resetPassword,
      requestData,
      {
        headers,
      },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (err) {
    console.error("Route API Error:", err);
    return NextResponse.json(
      { message: err?.response?.data?.message || "Server Error" },
      { status: err?.response?.status || 500 },
    );
  }
}

// Safely parse JSON if needed
async function parseJSON(req) {
  try {
    const data = await req.json(); // Already parsed JSON returned as-is
    return data;
  } catch {
    // Fallback: raw text / primitive
    const textData = await req.text();
    // Try parsing stringified JSON if possible
    try {
      return JSON.parse(textData);
    } catch {
      return textData;
    }
  }
}
