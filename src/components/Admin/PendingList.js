import { React, useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { UserContext } from "store/UserContext";
import Link from "next/link";
import PendingCard from "./PendingCardItem";
// import { row } from "components/sections/CardProduct/CardData";

function PendingList({ products }) {
  const userCtx = useContext(UserContext);

  const category = userCtx.category;
  console.log("products", products);

  return (
    <Box>
      <Grid
        sx={{
          display: "flex",
          // border: "1px solid black",
          rowGap: "2rem",
        }}
        container
      >
        {products.map((item) => (
          <Grid item xs={6} sm={4} md={3} p={1} key={item.pid}>
            <PendingCard
              pid={item.pid}
              pname={item.pname}
              rating={item.rating}
              img={item.img}
              price={item.price}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PendingList;
