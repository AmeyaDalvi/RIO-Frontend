import React from "react";
import NoSsr from "@mui/base/NoSsr";
import { Login } from "components/Login/Login";
import Image from "next/image";
// or

const login = () => {
  return (
    // <NoSsr>

    <Login />

    // </NoSsr>
  );
};

export default login;
