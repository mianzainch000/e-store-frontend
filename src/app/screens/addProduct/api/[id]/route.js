import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";
// ==============================================================================================

export const updateExpense = async (id, data) => {
  return await axiosClient.put(`${apiConfig.expenseForm.update}/${id}`, data);
};

export async function PUT(req, { params }) {
  const body = await req.formData();
  const response = await updateExpense(params.id, body);

  return new Response(JSON.stringify(response.data), {
    status: response.status,
  });
}

// // ==============================================================================================

// import { NextResponse } from "next/server";
// import axiosClient from "@/config/axiosClient";
// import { apiConfig } from "@/config/apiConfig";
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
// export async function PUT(req, { params }) {
//   try {
//     const { id } = params;
//     const contentType = req.headers.get("content-type");
//     const buffer = Buffer.from(await req.arrayBuffer());
//     const response = await axiosClient.put(
//       `${apiConfig.productForm.update}/${id}`,
//       buffer,
//       {
//         headers: {
//           "Content-Type": contentType,
//         },
//       }
//     );
//     return NextResponse.json(response.data, { status: response.status });
//   } catch (error) {
//     console.error("Update Route API Error:", error);

//     return NextResponse.json(
//       {
//         message: error?.response?.data?.message || "Server Error",
//       },
//       {
//         status: error?.response?.status || 500,
//       }
//     );
//   }
// }

// ==============================================================================================

// import { NextResponse } from "next/server";
// import axiosClient from "@/config/axiosClient";
// import { apiConfig } from "@/config/apiConfig";

// export const config = { api: { bodyParser: false } };
// export const runtime = "nodejs"; // Node.js runtime for buffer handling

// export async function PUT(req, { params }) {
//   try {
//     const contentType = req.headers.get("content-type") || "";

//     let requestData;
//     let headers = {};

//     if (contentType.includes("multipart/form-data")) {
//       // Forward raw buffer for multipart/form-data
//       // Backend can parse if needed
//       requestData = Buffer.from(await req.arrayBuffer());
//       headers["Content-Type"] = contentType; // browser boundary included
//     } else if (contentType.includes("application/json")) {
//       // Parse JSON if needed, else use as-is
//       requestData = await parseJSON(req);
//       headers["Content-Type"] = "application/json";
//     } else {
//       // Fallback: unknown content-type → raw buffer
//       requestData = Buffer.from(await req.arrayBuffer());
//       headers["Content-Type"] = contentType || "application/octet-stream";
//     }
//     const { id } = params;
//     // Send to external API
//     const response = await axiosClient.put(
//       `${apiConfig.addProduct.update}/${id}`,
//       requestData,
//       {
//         headers,
//       },
//     );

//     return NextResponse.json(response.data, { status: response.status });
//   } catch (err) {
//     console.error("Route API Error:", err);
//     return NextResponse.json(
//       { message: err?.response?.data?.message || "Server Error" },
//       { status: err?.response?.status || 500 },
//     );
//   }
// }

// // Safely parse JSON if needed
// async function parseJSON(req) {
//   try {
//     const data = await req.json(); // Already parsed JSON returned as-is
//     return data;
//   } catch {
//     // Fallback: raw text / primitive
//     const textData = await req.text();
//     // Try parsing stringified JSON if possible
//     try {
//       return JSON.parse(textData);
//     } catch {
//       return textData;
//     }
//   }
// }
