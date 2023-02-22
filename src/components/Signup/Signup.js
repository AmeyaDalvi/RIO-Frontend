import { Grid } from "@mui/material";
// import { makeStyles } from "@mui/styles";

import { SignupForm } from "./SignupForm";
import { SignupBanner } from "./SignupBanner";
// import UserContext from "../store/User-Context";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { baseUrl } from "utils/baseUrl";
import Testimonial from "components/extras/Testimonial";
import { useRouter } from "next/router";
import useWindowDimensions from "utils/useWindowDimensions";

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

export const Signup = () => {
  //   const classes = useStyles();
  //   const userCtx = useContext(UserContext);
  //   const navigate = useNavigate();
  const router = useRouter();
  const [responseError, setResponseError] = useState(false);
  const size = useWindowDimensions();

  useEffect(() => {
    setResponseError(false);
  }, []);

  const signupFormHandler = async (userData) => {
    try {
      const response = await fetch(baseUrl + "/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("rioUser", JSON.stringify(data.response));
        localStorage.setItem("token", data.token);

        // userCtx.setUserData(data.response);
        // const data1 = JSON.parse(localStorage.getItem("readifyUser"));
        // navigate("/", { replace: true });
      } else if (response.status === 401) {
        setResponseError(true);
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
        key="signup-form"
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
        <SignupForm
          onSignUpSubmit={signupFormHandler}
          responseError={responseError}
        />
      </Grid>
      <Grid
        item
        key="signup-image"
        md={7}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          height: "calc(100vh + 10px)",
        }}
      >
        <SignupBanner />
        <Testimonial />
      </Grid>
    </Grid>
  );
};
