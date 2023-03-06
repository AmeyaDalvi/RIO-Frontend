import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import styles from "../../styles/services.module.css";
import SectionHeading from "components/extras/SectionHeading";
import ServiceCard from "./Services/ServiceCard";

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
        {[0, 1, 2, 3].map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            p={1}
            key={item.fname}
      >
            <Card variant="outlined"  style={{minWidth: 115,  height: 200}} >{<ServiceCard />}</Card>
          </Grid>
        ))}
    </Grid>
    </div>
  );
}
