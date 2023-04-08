import CardItem from "./CardItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React from "react";
import { row } from "./CardData";

const CardImages = () => {
  return (
    <Box>
      <Grid
        sx={{
          display: "flex",
          // border: "1px solid black",
        }}
        container
      >
        {row.map((item) => (
          <Grid item xs={6} sm={4} md={3} p={1} key={item.pname}>
            <CardItem pname={item.pname} rating={item.rating} img={item.img} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardImages;
