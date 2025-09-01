import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

// POST request handler for Next.js API route
export async function POST(req) {
  try {
    let body = {};

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      for (const [key, value] of formData.entries()) {
        try {
          // If the value is JSON (like your sizes or imageOrder), parse it
          body[key] = JSON.parse(value);
        } catch {
          body[key] = value;
        }
      }
    } else if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      throw new Error("Unsupported content type: " + contentType);
    }

    const data = await postData(body);

    return new Response(JSON.stringify(data?.data), {
      status: data?.status || 200,
    });
  } catch (error) {
    console.error("Error in POST handler:", error);

    return new Response(
      JSON.stringify({ message: "Error occurred while processing the request" }),
      { status: 500 }
    );
  }
}


// Function to forward complex data to external API
export const postData = async (params) => {
  try {
    // Default headers (assuming no file upload)
    let headers = { 'Content-Type': 'application/json' };
    let requestData = params;

    // Check if files are present in the params
    const isFilePresent = Object.values(params).some(value => value instanceof File || value instanceof Blob);

    // If files are present, use FormData
    if (isFilePresent) {
      const formData = new FormData();
      for (const key in params) {
        if (params[key] instanceof Array || params[key] instanceof Object) {
          // If data is an array or object, stringify it before appending
          formData.append(key, JSON.stringify(params[key]));
        } else if (params[key] instanceof File || params[key] instanceof Blob) {
          // If data is a file or blob, append as is
          formData.append(key, params[key]);
        } else {
          // Otherwise, append the data as it is
          formData.append(key, params[key]);
        }
      }
      requestData = formData;
      headers = {};  // Set header for FormData
    }

    // Send the data using axiosClient
    const response = await axiosClient.post(apiConfig.addProduct, requestData, { headers });

    return response; // Return the response from external API
  } catch (error) {
    console.error("Error in postData:", error);
    throw error; // Propagate error
  }
};
