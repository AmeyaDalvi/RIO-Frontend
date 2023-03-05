import ImageItem from "./ImageItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React from "react";
import { row } from "./ImageData";

const Images = () => {
  return (
    <Box>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        container
      >
        {row.map((item) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            p={1}
            key={item.fname}
          >
            <ImageItem fname={item.fname} lname={item.lname} img={item.img} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Images;
