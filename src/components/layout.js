import React, { useContext } from "react";
import { useRouter } from "next/router";
import Navbar from "components/Navbar/Navbar";
import Chatbot from "../components/Chat/Chatbot";
import AlanChat from "./Chat/AlanChat";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { UserContext } from "store/UserContext";

const layout = ({ children }) => {
  const router = useRouter();
  const userCtx = useContext(UserContext);

  const openSnackbar = userCtx.snackBar;
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    userCtx.setSnackBar(false);
  };
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
      <AlanChat />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          sx={{
            width: "100%",
            color: "#fff",
            backgroundColor: "#333",
            borderRadius: "15px",
          }}
        >
          Product Added Succesfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default layout;
