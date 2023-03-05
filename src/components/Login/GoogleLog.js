import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import styles from "../../styles/google.module.css";
import { baseUrl } from "utils/baseUrl";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const GoogleLog = () => {
  const router = useRouter();
  const loginFormHandler = async (userData) => {
    try {
      const response = await fetch(baseUrl + "/googlelogin", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        Cookies.set("rioUser", JSON.stringify(data.response));
        Cookies.set("rioUserToken", JSON.stringify(data.token));
        router.replace("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.App}>
      <header className={styles.Appheader}>
        <GoogleLogin
          shape="pill"
          ux_mode="popup"
          size="large"
          logo_alignment="center"
          onSuccess={(credentialResponse) => {
            loginFormHandler(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </header>
    </div>
  );
};

export default GoogleLog;
