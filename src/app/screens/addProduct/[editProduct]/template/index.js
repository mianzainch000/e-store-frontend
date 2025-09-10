"use client";
import { getCookie } from "cookies-next";
import ProductForm from "../../template";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const UpdateForm = () => {
  const params = useParams();
  const prdodutEditId = params.editProduct;
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedData = getCookie(`products_${prdodutEditId}`);
    if (storedData) {
      const data = JSON.parse(storedData);
      setEditId(data);

      console.log("Stringified data:", JSON.stringify(data));
    }
  }, [prdodutEditId]);
  return (
    <>
      <ProductForm editId={editId} />
    </>
  );
};

export default UpdateForm;
