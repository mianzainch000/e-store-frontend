// ==============================================================================================

import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

export const postData = async (formData) => {
  return await axiosClient.post(apiConfig.addProduct.create, formData);
};

export async function POST(req) {
  const body = await req.formData();
  const data = await postData(body);
  return new Response(JSON.stringify(data?.data), {
    status: data?.status,
  });
}

// ==============================================================================================

// import { NextResponse } from "next/server";
// import axiosClient from "@/config/axiosClient";
// import { apiConfig } from "@/config/apiConfig";
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req) {
//   try {
//     const buffer = Buffer.from(await req.arrayBuffer());
//     const contentType = req.headers.get("content-type");
//     const response = await axiosClient.post(
//       apiConfig.productForm.create,
//       buffer,
//       {
//         headers: {
//           "Content-Type": contentType,
//         },
//       }
//     );
//     return NextResponse.json(response.data, { status: response.status });
//   } catch (error) {
//     console.error("Route API Error:", error);
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
