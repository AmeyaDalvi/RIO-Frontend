import React from "react";
import LandingText from "./LandingText";
import styles from "../../../styles/landing.module.css";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
export default function Landing() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.Landing}>
        <div className={styles.leftPane}>
          <LandingText />
          <Button
            className={styles.ExploreButton}
            sx={{
              font: "inherit",
              "&: hover": {
                backgroundColor: "#000",
                color: "#EBEAEA",
              },
            }}
            onClick={() => router.push("/products")}
            disableRipple
          >
            Explore Products
          </Button>
        </div>
        <div className={styles.rightPane}>
          <div className={styles.Image}>
            <img src="/images/landing.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}
