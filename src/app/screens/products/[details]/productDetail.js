"use client";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DetailProduct from "./template/index";
const DetailPage = () => {
  const params = useParams();
  const productId = params.details;
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const storedData = getCookie(`expense_${productId}`);
    if (storedData) {
      const data = JSON.parse(storedData);
      setProductData(data);

      console.log("Stringified data:", JSON.stringify(data));
    }
  }, [productId]);
  return <DetailProduct productId={productId} productData={productData} />;
};

export default DetailPage;
