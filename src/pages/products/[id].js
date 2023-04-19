import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Description from "components/Description/Description";

const ProductDetails = () => {
  const {
    query: { id },
  } = useRouter();

  return (
    <div style={{ marginTop: "4rem" }}> {id && <Description pid={id} />}</div>
  );
};

export default ProductDetails;
