import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { CardActionArea, Grid } from "@mui/material";
import { useRouter } from "next/router";

export default function ActionAreaCard({ pname, rating, img, price }) {
  const router = useRouter();
  return (
    <Card
      sx={{
        boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        borderRadius: "10px",
        maxWidth: "225px",
        ":hover": {
          // boxShadow: 20, // theme.shadows[20]
          boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
        },
      }}
      raised
    >
      <CardActionArea>
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
        <CardContent sx={{ textAlign: "flex-start" }}>
          <Typography variant="h7" component="div" noWrap>
            {pname}
          </Typography>
          <Rating
            readOnly
            name="precision-rating"
            value={rating}
            precision={0.5}
            sx={{
              fontSize: "1rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          />
          <Typography variant="h6" component="div">
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
