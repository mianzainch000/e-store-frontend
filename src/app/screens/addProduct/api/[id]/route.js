import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

// ✅ Update product with PUT
export const putData = async (id, formData) => {
  return await axiosClient.put(`${apiConfig.addProduct.update}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Next.js Route Handler for PUT
export async function PUT(req, { params }) {
  try {
    const { id } = params; // ✅ id from URL /api/products/[id]
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Product ID is required in params" }),
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // ✅ Send request with id
    const data = await putData(id, formData);

    return new Response(JSON.stringify(data?.data), {
      status: data?.status,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error?.response?.data || "Something went wrong",
      }),
      { status: error?.response?.status || 500 }
    );
  }
}
