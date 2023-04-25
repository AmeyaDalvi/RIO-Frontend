import * as React from "react";
import Services from "../components/sections/Services";
import AboutUs from "../components/sections/AboutUs";
import Footer from "../components/sections/Footer";
import Chatbot from "../components/Chat/Chatbot";
import Landing from "components/sections/Landing/Landing";

export default function Home() {
  return (
    <div>
      {/* <div className={styles.container}>Home</div> */}
      <Landing />
      {/* <div className={styles.container}>Services</div> */}
      <section id="services">
        <Services />
      </section>
      {/* <div className={styles.container}>About Us</div> */}
      <section id="aboutus">
        <AboutUs />
      </section>
      {/* <div className={styles.container}>Footer</div> */}
      <Footer />
      {/* <Chatbot/> */}
    </div>
  );
}
