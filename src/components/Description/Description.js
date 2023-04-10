import { useEffect, useState } from "react";
import styles from "../../styles/description.module.css";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import dynamic from "next/dynamic";
import { baseUrl } from "utils/baseUrl";
// import LocationMap from "components/ProductDescription/LocationMap";

// import GM from "components/ProductDescription/GM";

const LocationMap = dynamic(
  () => import("components/ProductDescription/LocationMap"),
  { ssr: false }
);

const url = "localhost:5000/getproduct";

export default function Description({ pid }) {
  const router = useRouter();
  // const { productId } = router.query;

  const [product, setProduct] = useState(0);
  //   const [productId, setProductId] = useState(pid);
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchProductHandler(pid);
    setProduct({});
  }, []);

  let fetchProductHandler = async (productId) => {
    try {
      const response = await fetch(
        baseUrl + `/getproduct?productid=${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setProduct(data[0]);
        setAddress(
          data[0].SIStreet +
            data[0].SICity +
            data[0].SIState +
            data[0].SICountry +
            data[0].SIZip
        );
      } else if (response.status === 401) {
        console.log("Unauthorized");
      } else if (response.status === 403) {
        console.log("Forbidden");
      }
    } catch (error) {
      console.log(error);
    }

    // fetch(`getproduct?productid=${productId}`)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setProduct(response[0]);
    //     setAddress(
    //       response[0].SIStreet +
    //         response[0].SICity +
    //         response[0].SIState +
    //         response[0].SICountry +
    //         response[0].SIZip
    //     );
    //   });
  };

  return (
    <div className={styles.leftPane}>
      <Card
        variant="outlined"
        style={{ minWidth: 1024, height: 1024 }}
        sx={{
          // minWidth: "150px",
          maxWidth: "400px",
          boxShadow: "none",
          // border: "2px solid #FF9666",
        }}
      >
        <CardContent>
          <h1>{product.Name}</h1>＄{product.Price}
          <div className={styles.para__container}>{product.Description}</div>
          <div className="card">
            <img
              className={styles.Image}
              style={{ minWidth: 300, height: 300 }}
              src={product.ImageURL}
              alt="Card image cap"
            />
          </div>
          {/* <GM location = "1600+Amphitheatre+Parkway,+Mountain+View,+CA,+94043"/> */}
          {/* {/* <GM location = {product.SIStreet + ",+" + product.SICity + ",+" + product.SIState + ",+" + product.SIZip + ",+" + product.SICountry}>} */}
          <LocationMap
            location={
              product.SIStreet +
              " " +
              product.SICity +
              " " +
              product.SIState +
              " " +
              product.SIZip +
              " " +
              product.SICountry
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
