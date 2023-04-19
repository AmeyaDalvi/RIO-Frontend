import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function ActionAreaCard({ fname, lname, img }) {
  return (
    // <Grid item sm={smm} md={mdd}>
    <Card
      sx={{
        // minWidth: "150px",
        maxWidth: "180px",
        boxShadow: "none",
        background: "rgb(250, 250, 250)",
        // border: "2px solid #FF9666",
      }}
    >
      <CardMedia
        component="img"
        // height="200"

        image={`${img}`}
        alt="team member image"
        sx={{
          borderRadius: "50%",
          border: "1px solid #555 ",
          aspectRatio: "1",
        }}
      />
      <CardContent>
        <Typography variant="h7" component="div" align="center">
          {fname}
        </Typography>
        <Typography variant="h7" component="div" align="center">
          {lname}
        </Typography>
      </CardContent>
    </Card>
    // </Grid>
  );
}
