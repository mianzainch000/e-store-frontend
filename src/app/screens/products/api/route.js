import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

export const getData = async () => {
  return await axiosClient.get(apiConfig.products.get);
};

export async function GET() {
  const data = await getData();

  return Response.json(data?.data);
}

export const postData = async (formData) => {
  return await axiosClient.post(apiConfig.products.addCart, formData);
};

export async function POST(req) {
  const body = await await req.json();
  const data = await postData(body);
  return new Response(JSON.stringify(data?.data), {
    status: data?.status,
  });
}
