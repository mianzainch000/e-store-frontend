import { apiConfig } from "@/config/apiConfig";
import axiosClient from "@/config/axiosClient";

export const getData = async () => {
  return await axiosClient.get(apiConfig.products.get);
};

export async function GET() {
  const data = await getData();

  return Response.json(data?.data);
}
