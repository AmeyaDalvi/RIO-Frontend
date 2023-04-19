import { React, useContext, useState, useEffect } from "react";
import CardItem from "components/sections/CardProduct/CardItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { UserContext } from "store/UserContext";
import Link from "next/link";
// import { row } from "components/sections/CardProduct/CardData";

function List({ input, rating, price, products }) {
  const [filteredData, setFilteredData] = useState([]);
  const userCtx = useContext(UserContext);
  const category = userCtx.category;
  // console.log(products);
  // console.log(category);
  const filterHandler = () => {
    const filtered = [];
    if (rating === "-1" && price === "-1" && input === ""){
        setFilteredData(products)
    }
    else{
      products.forEach((el) => {
        if (
          el.pname.toLowerCase().includes(input.toLowerCase()) &&
          el.rating >= rating &&
          Number(el.price.replace("$", "").replace(".00", "")) >= price[0] &&
          Number(el.price.replace("$", "").replace(".00", "")) <= price[1]
        ) {
          if (category === "") {
            filtered.push(el);
          } else if (category === el.category.split(" ")[0] && category !== "") {
            filtered.push(el);
          }
        }
      setFilteredData(filtered);

    });
    }

    
  };

  useEffect(() => {
    filterHandler();
  }, [input, rating, price, category]);

  return (
    <Box>
      <Grid
        sx={{
          display: "flex",
          // border: "1px solid black",
          rowGap: "2rem",
        }}
        container
      >
        {filteredData.map((item) => (
          <Grid item xs={6} sm={4} md={3} p={1} key={item.pid}>
            <Link
              href={`/products/${item.pid}`}
              style={{ textDecoration: "none" }}
            >
              <CardItem
                pname={item.pname}
                rating={item.rating}
                img={item.img}
                price={item.price}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default List;
