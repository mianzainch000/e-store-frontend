import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

export const getData = async () => {
  return await axiosClient.get(apiConfig.cart.get);
};

export async function GET() {
  const data = await getData();

  return Response.json(data?.data);
}


export const deleteAllCart = async () => {
  return await axiosClient.delete(apiConfig.cart.removeAll); // no ID needed
};

export async function DELETE() {
  // No body needed because we delete all cart items
  const data = await deleteAllCart();
  return new Response(JSON.stringify(data?.data), {
    status: data?.status,
  });
}