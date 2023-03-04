import React from "react";
import Box from "@mui/material/Box";

const SectionHeading = ({ heading }) => {
  return (
    <Box sx={{ textAlign: "center", padding: "2rem 0" }}>
      <h2>{heading}</h2>
    </Box>
  );
};

export default SectionHeading;
