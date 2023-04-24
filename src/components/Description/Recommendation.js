import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Rating } from '@mui/material';
import { baseUrl } from 'utils/baseUrl';
import React from 'react';
import List from "utils/List";
import Divider from "@mui/material/Divider";
import styles from "styles/recommend.module.css";

const Recommendation = ({ productCategory }) => {
  const [recProducts, setRecProducts] = useState([]);

  useEffect(() => {
    
    const fetchRecProducts = async () => {
        try {
            const response = await fetch(
              baseUrl + "/getproductrecommendation",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ category: productCategory }),
              }
            );
            if (response.status === 200) {
              const data = await response.json();
              setRecProducts(data);
            } else if (response.status === 401) {
              console.log("Unauthorized");
            } else if (response.status === 403) {
              console.log("Forbidden");
            }
          } catch (error) {
            console.log(error);
          }
    };

    fetchRecProducts();
  }, [productCategory]);

  return (

    <div className={styles.container}>
      <div className={styles.products}>
        <h2>Recommended based on your shopping trends</h2>
        {recProducts.length !== 0 ? (
          <List input="" rating="-1" price="-1" products={recProducts} />
        ) : (
          "Currently there are no recommendations"
        )}
        </div>
    </div>
  );
};
export default Recommendation;