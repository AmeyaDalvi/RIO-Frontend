import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Description from "components/Description/Description";

const ProductDetails = () => {
  const {
    query: { id },
  } = useRouter();
  console.log(id);

  return <Container>{id && <Description pid={id} />}</Container>;
};

export default ProductDetails;
