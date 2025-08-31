import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

// POST request handler for Next.js API route
export async function POST(req) {
  try {
    const body = await req.json(); // Get JSON body from the incoming request

    // Call the generic function to handle complex data
    const data = await postData(body);

    // Return response with the status code and data from the API call
    return new Response(JSON.stringify(data?.data), {
      status: data?.status,
    });
  } catch (error) {
    console.error("Error in POST handler:", error);

    // Handle any errors and return a response
    return new Response(
      JSON.stringify({
        message: "Error occurred while processing the request",
      }),
      { status: 500 },
    );
  }
}

// Function to forward complex data to external API
export const postData = async (params) => {
  try {
    // Default headers (assuming no file upload)
    let headers = { "Content-Type": "application/json" };
    let requestData = params;

    // Check if files are present in the params
    const isFilePresent = Object.values(params).some(
      (value) => value instanceof File || value instanceof Blob,
    );

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
      headers = { "Content-Type": "multipart/form-data" }; // Set header for FormData
    }

    // Send the data using axiosClient
    const response = await axiosClient.post(
      apiConfig.resetPassword,
      requestData,
      {
        headers,
      },
    );

    return response; // Return the response from external API
  } catch (error) {
    console.error("Error in postData:", error);
    throw error; // Propagate error
  }
};
