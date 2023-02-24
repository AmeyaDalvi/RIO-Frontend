import { Grid } from "@mui/material";

import { SignupForm } from "./SignupForm";
import { Banner } from "components/extras/Banner";
// import UserContext from "../store/User-Context";
import { useEffect, useState } from "react";
import { baseUrl } from "utils/baseUrl";
import Testimonial from "components/extras/Testimonial";
import { useRouter } from "next/router";

export const Signup = () => {
  //   const userCtx = useContext(UserContext);
  const router = useRouter();
  const [responseError, setResponseError] = useState(false);

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
        router.replace("/products");
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
        <Banner />
        <Testimonial />
      </Grid>
    </Grid>
  );
};
