import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Box, CardActionArea, Grid } from "@mui/material";
import { useRouter } from "next/router";

export default function ActionAreaCard({ pname, rating, img, price }) {
  const router = useRouter();
  return (
    <Card
      sx={{
        // boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        boxShadow: "none",
        borderRadius: "10px",
        maxWidth: router.pathname === "/dashboard" ? "280px" : "225px",
        ":hover": {
          // boxShadow: 20, // theme.shadows[20]
          boxShadow: "4px 4px 8px rgba(0,0,0,0.1)",
        },
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.04)",
        },
      }}
      raised
    >
      <CardMedia
        component="img"
        image={`${img}`}
        alt="team member image"
        sx={{
          borderRadius: "10px 10px 0 0",
          objectFit: "cover",
        }}
        height="150"
      />
      <CardContent
        sx={{
          textAlign: "flex-start",
          background: "rgb(250, 250, 250)",
          ":hover": {
            background: "rgb(250, 250, 250)",
          },
        }}
      >
        <Typography variant="h7" component="div" noWrap>
          {pname}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Rating
            readOnly
            name="precision-rating"
            value={rating}
            precision={0.5}
            sx={{
              fontSize: "1rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              color: "#555",
              fontSize: "17px",
            }}
          />
          <Typography variant="h7" component="div">
            ({rating})
          </Typography>
        </Box>

        <Typography variant="h6" component="div">
          ${price}.00
        </Typography>
      </CardContent>
    </Card>
  );
}
