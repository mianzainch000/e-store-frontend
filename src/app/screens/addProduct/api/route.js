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






// ==============================================================================================