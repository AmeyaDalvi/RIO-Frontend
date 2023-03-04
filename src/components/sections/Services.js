import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import styles from "../../styles/services.module.css";
import SectionHeading from "components/extras/SectionHeading";

export default function Services() {
  return (
    <div className={styles.container}>
      <SectionHeading heading="Services" />
    </div>
  );
}
