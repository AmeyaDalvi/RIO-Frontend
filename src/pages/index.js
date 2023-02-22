import styles from "../styles/Home.module.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Landing from "../components/sections/Landing";
import Services from "../components/sections/Services";
import AboutUs from "../components/sections/AboutUs";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <div>
      {/* <div className={styles.container}>Home</div> */}
      <Landing />
      {/* <div className={styles.container}>Services</div> */}
      <Services />
      {/* <div className={styles.container}>About Us</div> */}
      <AboutUs />
      {/* <div className={styles.container}>Footer</div> */}
      <Footer />
    </div>
  );
}
