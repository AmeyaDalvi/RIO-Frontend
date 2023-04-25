import React from "react";
import { useRouter } from "next/router";
import Navbar from "components/Navbar/Navbar";
import Chatbot from "../components/Chat/Chatbot";
import AlanChat from "./Chat/AlanChat";

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
      {/* <Chatbot /> */}
      {/* <AlanChat /> */}
    </>
  );
};

export default layout;
