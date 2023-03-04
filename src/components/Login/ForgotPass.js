import { Grid } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { ForgotForm } from "./ForgotForm";
import { Banner } from "../extras/Banner";
// import UserContext from "../store/User-Context";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { baseUrl } from "utils/baseUrl";
import Testimonial from "components/extras/Testimonial";
import { useRouter } from "next/router";

// const useStyles = makeStyles((theme) => ({
//   loginBanner: {
//     background: "linear-gradient(180deg, #EA5DEB 0%, #832BE0 100%)",
//     textShadow: "2px 2px 2px rgba(0,0,0,0.26)",
//   },

//   loginForm: {
//     display: "flex",
//     padding: "0",
//     width: "100%",
//     height: "calc(100vh - 66px)",
//   },
// }));

export const ForgotPass = () => {
  //   const classes = useStyles();
  //   const userCtx = useContext(UserContext);
  //   const navigate = useNavigate();
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setInvalidCredential(false);
    setResponseError(false);
  }, []);

  const forgotFormHandler = async (userData) => {
    setInvalidCredential(false);
    setResponseError(false);

    try {
      const response = await fetch(baseUrl + "/forgot", {
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
        router.push("/updatepass");
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
        <ForgotForm
          onForgotFormSubmit={forgotFormHandler}
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
