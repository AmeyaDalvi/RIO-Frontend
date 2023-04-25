import { React, useContext } from "react";
import { baseUrl } from "utils/baseUrl";
import { UserContext } from "store/UserContext";
import { useState, useEffect } from "react";
import List from "utils/List";
import PendingList from "../components/Admin/PendingList";
import Cookies from "js-cookie";
import styles from "styles/products.module.css";

const dashboard = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [rentedProducts, setRentedProducts] = useState([]);

  let userInCookie = Cookies.get("rioUser");
  userInCookie = userInCookie !== undefined ? JSON.parse(userInCookie) : null;
  const tokenInCookie = Cookies.get("rioUserToken");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState({});

  useEffect(() => {
    checkUserInCookie();
    getAllUserPendingProducts();
    getAllUserRentedProducts();
  }, [tokenInCookie]);

  const checkUserInCookie = () => {
    console.log("tok", tokenInCookie);
    if (tokenInCookie) {
      setIsUserLoggedIn(true);
      setIsUser(userInCookie);
      console.log("cookie", userInCookie);
    } else {
      setIsUserLoggedIn(false);
      setIsUser({});
    }
  };
  const getAllUserPendingProducts = async () => {
    try {
      const response = await fetch(baseUrl + "/getpendingproducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setPendingProducts(data);
      } else if (response.status === 401) {
        console.log("Unauthorized");
      } else if (response.status === 403) {
        console.log("Forbidden");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUserRentedProducts = async () => {
    try {
      const response = await fetch(baseUrl + "/getrentedproducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setRentedProducts(data);
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
      <div className={styles.products}>
        <h2 style={{ marginBottom: "20px" }}>Pending Products</h2>
        {pendingProducts.length !== 0 ? (
          <PendingList products={pendingProducts} />
        ) : (
          "There are no posted products by user"
        )}

        <h2 style={{ marginBottom: "20px" }}>Rented Products</h2>
        {rentedProducts.length !== 0 ? (
          <List input="" rating="-1" price="-1" products={rentedProducts} />
        ) : (
          "There are no purchased products by user"
        )}
      </div>
    </div>
  );
};
export default dashboard;
