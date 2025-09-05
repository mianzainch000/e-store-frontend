// ==============================================================================================

import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

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
