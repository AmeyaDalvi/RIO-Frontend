import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Box, Button, CardActionArea, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { baseUrl } from "utils/baseUrl";

export default function PendingCard({ pid, pname, rating, img, price }) {
  const router = useRouter();

  const approveButtonHandler = async () => {
    router.reload();
    try {
      const res = await fetch(baseUrl + "/productstatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productid: pid, productstatus: 2 }),
      });
      if (res.status === 200) {
        const data = await res.json();
        console.log("Approved ", data);
      } else if (res.status === 401) {
        console.log("Unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectButtonHandler = async () => {
    router.reload();
    try {
      const res = await fetch(baseUrl + "/productstatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productid: pid, productstatus: 3 }),
      });
      if (res.status === 200) {
        const data = await res.json();
        console.log("Rejected ", data);
      } else if (res.status === 401) {
        console.log("Unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        // boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        boxShadow: "none",
        borderRadius: "10px",
        maxWidth: router.pathname === "/admin" ? "280px" : "225px",
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
      <Link href={`/products/${pid}`} style={{ textDecoration: "none" }}>
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
      </Link>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          background: "rgb(250, 250, 250)",
          ":hover": {
            background: "rgb(250, 250, 250)",
          },
        }}
      >
        <Box
          sx={{
            textAlign: "flex-start",
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Button
            sx={{
              background: "#000000",
              color: "#ffffff",
              ":hover": {
                background: "#000000",
                color: "#ffffff",
              },
            }}
            onClick={approveButtonHandler}
          >
            Approve
          </Button>
          <Button
            sx={{
              background: "#000000",
              color: "#ffffff",
              ":hover": {
                background: "#000000",
                color: "#ffffff",
              },
            }}
            onClick={rejectButtonHandler}
          >
            Reject
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
