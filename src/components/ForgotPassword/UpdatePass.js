import React from "react";
import { Grid } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { UpdatePassForm } from "./UpdatePassForm";
import { Banner } from "../extras/Banner";
// import UserContext from "../store/User-Context";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { baseUrl } from "utils/baseUrl";
import Testimonial from "components/extras/Testimonial";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const UpdatePass = () => {
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setInvalidCredential(false);
    setResponseError(false);
  }, []);

  const updatePassFormHandler = async (userData) => {
    setInvalidCredential(false);
    setResponseError(false);

    try {
      const response = await fetch(baseUrl + "/updatepass", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        // localStorage.setItem("rioUser", JSON.stringify(data.response));
        // localStorage.setItem("token", data.token);
        console.log(data.message);

        // userCtx.setUserData(data.response);
        router.replace("/login");
      } else if (response.status === 403) {
        setInvalidCredential(true);
      }
    } catch (error) {
      console.log(error);

      setResponseError(true);
    }
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid
        item
        key="forgot-form"
        md={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          height: "calc(100vh + 10px)",
        }}
      >
        <UpdatePassForm
          onUpdatePassFormSubmit={updatePassFormHandler}
          invalidError={invalidCredential}
          responseError={responseError}
        />
      </Grid>

      <Grid
        item
        key="login-image"
        md={7}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          height: "calc(100vh + 10px)",
        }}
      >
        <Banner />
        <Testimonial />
      </Grid>
    </Grid>
  );
};
