import { React, useContext, useEffect, useState } from "react";
import Filter from "components/Filter/Filter";
import { Box } from "@mui/system";
import Search from "components/Search/Search";
import List from "utils/List";
import styles from "styles/products.module.css";
import CardImages from "components/sections/CardProduct/CardImages";
import { UserContext } from "store/UserContext";
import { baseUrl } from "utils/baseUrl";

const products = () => {
  const userCtx = useContext(UserContext);
  const searchKey = userCtx.searchKeyword;
  const rating = userCtx.rating;
  const price = userCtx.price;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProductsHandler();
  }, []);

  const getAllProductsHandler = async () => {
    try {
      const response = await fetch(baseUrl + "/getapprovedproducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } else if (response.status === 401) {
        console.log("Unauthorized");
      } else if (response.status === 403) {
        console.log("Forbidden");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.products}>
        <Search />
        {products.length != 0 ? (
          <List
            input={searchKey}
            rating={rating}
            price={price}
            products={products}
          />
        ) : (
          "None"
        )}
      </div>
    </div>
  );
};
export default products;
