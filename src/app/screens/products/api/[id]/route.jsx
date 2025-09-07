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

export const getData = async (id) => {
  const res = await axiosClient.get(`${apiConfig.products.getProduct}/${id}`);
  return res.data;
};

export async function GET(req, { params }) {
  const { id } = params;
  const data = await getData(id);

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
