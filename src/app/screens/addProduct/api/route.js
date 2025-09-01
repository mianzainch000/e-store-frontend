import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";
import { NextResponse } from "next/server";

export const config = { api: { bodyParser: false } };

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      let files = [];

      for (const [key, value] of formData.entries()) {
        if (key === "images") {
          files.push(value); // collect files
        } else {
          try { body[key] = JSON.parse(value); }
          catch { body[key] = value; }
        }
      }

      if (files.length) body.images = files;

    } else if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      throw new Error("Unsupported content type: " + contentType);
    }

    const response = await postData(body);
    return NextResponse.json(response.data, { status: response.status });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: error?.response?.data?.message || "Server Error" },
      { status: error?.response?.status || 500 }
    );
  }
}

// Generic function to forward data to external API
export const postData = async (params) => {
  try {
    let headers = { "Content-Type": "application/json" };
    let requestData = params;

    // Detect if there are any files or image arrays
    const hasFilesOrImages = Object.values(params).some(
      v => v instanceof File || v instanceof Blob || (Array.isArray(v) && v.every(i => i instanceof File || i instanceof Blob))
    );

    if (hasFilesOrImages) {
      const formData = new FormData();

      for (const key in params) {
        const value = params[key];

        if (value instanceof File || value instanceof Blob) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach(item => {
            if (item instanceof File || item instanceof Blob) formData.append(key, item);
            else formData.append(key, item); // append string URLs or other primitives
          });
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      requestData = formData;
      headers = {}; // browser will set multipart boundary
    }

    const response = await axiosClient.post(apiConfig.addProduct, requestData, { headers });
    return response;

  } catch (error) {
    console.error("Error in postData:", error);
    throw error;
  }
};
