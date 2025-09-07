import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

export const deleteUser = async (id) => {
  return await axiosClient.delete(apiConfig.products.delete + `/${id}`);
};

export async function DELETE(req) {
  const body = await req.json();
  const data = await deleteUser(body.id);
  return new Response(JSON.stringify(data?.data), {
    status: data?.status,
  });
}

// Helper to fetch product by ID from your backend
export const getData = async (id) => {
  try {
    const res = await axiosClient.get(`${apiConfig.products.getProduct}/${id}`);
    return res.data;
  } catch (error) {
    console.error("axios getData error:", error);
    throw error;
  }
};

// GET handler for App Router
export async function GET(req, { params }) {
  try {
    const { id } = params; // ✅ Get ID from URL
    if (!id) {
      return new Response(
        JSON.stringify({ message: "Product ID is required" }),
        {
          status: 400,
        }
      );
    }

    const data = await getData(id);

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.error("GET product error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
