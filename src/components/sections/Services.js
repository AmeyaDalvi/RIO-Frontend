import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import styles from "../../styles/services.module.css";
import SectionHeading from "components/extras/SectionHeading";
import ServiceCard from "./Services/ServiceCard";
import { data } from "./Services/ServiceData";

export default function Services() {
  return (
    <div className={styles.container}>
      <SectionHeading heading="Services" />
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        container
      >
        {data.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            p={1}
            key={item.id}
          >
            <Card
              // variant="outlined"
              sx={{
                minWidth: 115,
                height: 200,
                boxShadow: "none",
                borderRadius: "10px",
                ":hover": {
                  // boxShadow: 20, // theme.shadows[20]
                  boxShadow: "4px 4px 8px rgba(0,0,0,0.1)",
                  color: "#fff",
                  backgroundColor: "#000",
                },
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.04)",
                },
              }}
              raised
            >
              {<ServiceCard item={item} />}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
