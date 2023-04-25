import { React, useContext } from "react";
import { baseUrl } from "utils/baseUrl";
import { UserContext } from "store/UserContext";
import { useState, useEffect } from "react";
import List from "utils/List";
import Cookies from "js-cookie";
import styles from "styles/products.module.css";

const dashboard = () => {
  const [postedProducts, setPostedProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  let userInCookie = Cookies.get("rioUser");
  userInCookie = userInCookie !== undefined ? JSON.parse(userInCookie) : null;
  const tokenInCookie = Cookies.get("rioUserToken");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState({});

  useEffect(() => {
    checkUserInCookie();
    getAllUserPostedProducts();
    getAllUserPurchasedProducts();
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
  const getAllUserPostedProducts = async () => {
    try {
      const response = await fetch(
        baseUrl + "/upposted?id=" + userInCookie["user_id"],
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + tokenInCookie,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: userInCookie["email_id"],
          }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setPostedProducts(data);
      } else if (response.status === 401) {
        console.log("Unauthorized");
      } else if (response.status === 403) {
        console.log("Forbidden");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUserPurchasedProducts = async () => {
    try {
      const response = await fetch(
        baseUrl + "/uppurchased?id=" + userInCookie["user_id"],
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + tokenInCookie,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId: userInCookie["email_id"] }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setPurchasedProducts(data);
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
        <h2 style={{ marginBottom: "20px" }}>You Posted</h2>
        {postedProducts.length !== 0 ? (
          <List input="" rating="-1" price="-1" products={postedProducts} />
        ) : (
          "There are no posted products by user"
        )}

        <h2 style={{ marginBottom: "20px" }}>You Purchased</h2>
        {purchasedProducts.length !== 0 ? (
          <List input="" rating="-1" price="-1" products={purchasedProducts} />
        ) : (
          "There are no purchased products by user"
        )}
      </div>
    </div>
  );
};
export default dashboard;
