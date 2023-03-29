import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "components/Navbar/Navbar";
//import { useInView } from "react-intersection-observer";

const layout = ({ children }) => {
  const router = useRouter();
  const showHeader =
    router.pathname === "/login" ||
    router.pathname === "/signup" ||
    router.pathname === "/forgotpass" ||
    router.pathname === "/updatepass"
      ? false
      : true; 
  return (
    <>
      {showHeader && <Navbar />}
      {children}
    </>
  );
};

export default layout;
