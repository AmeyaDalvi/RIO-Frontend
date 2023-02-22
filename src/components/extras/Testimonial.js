import React from "react";
import styles from "../../styles/testimonial.module.css";
import { Rating } from "@mui/material";

const Testimonial = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        "I have been using RIO to rent my Car and it has been the best
        experience ever"
      </div>
      <div className={styles.container2}>
        <div className={styles.name}>Andi Lane</div>
        <div className={styles.stars}>
          <Rating
            name="read-only"
            value={4.2}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#fff",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
