import React from "react";
import NoSsr from "@mui/base/NoSsr";
import Image from "next/image";
import { ForgotPass } from "components/Login/ForgotPass";
// or

const forgotpass = () => {
  return (
    // <NoSsr>

    <ForgotPass />

    // </NoSsr>
  );
};

export default forgotpass;
