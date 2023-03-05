import { Grid } from "@mui/material";

import { SignupForm } from "./SignupForm";
import { Banner } from "components/extras/Banner";
// import UserContext from "../store/User-Context";
import { useEffect, useState } from "react";
import { baseUrl } from "utils/baseUrl";
import Testimonial from "components/extras/Testimonial";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const Signup = () => {
  //   const userCtx = useContext(UserContext);
  const router = useRouter();
  const [responseError, setResponseError] = useState(false);
  const [alreadyExistsError, setAlreadyExistsError] = useState(false);

  useEffect(() => {
    setResponseError(false);
    setAlreadyExistsError(false);
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
        Cookies.set("rioUser", JSON.stringify(data.response));
        Cookies.set("rioUserToken", JSON.stringify(data.token));
        router.replace("/products");
      } else if (response.status === 403) {
        setAlreadyExistsError(true);
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
          alreadyExistsError={alreadyExistsError}
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
