import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Grid, Box } from "@mui/material";
import React from "react";

const Payment = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Rent Product</h1>
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <Close fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Payment;
