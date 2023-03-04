import React from "react";
import s from "../../styles/Aboutus.module.css";
import imgs from "../../../public/images/img.jpeg";
import Image from "next/image";
import Images from "./AboutUs/Images";
import SectionHeading from "components/extras/SectionHeading";

const AboutUs = () => {
  return (
    // <div className={s.container}>
    //   <div className={s.container1}>
    //     <h1 className={s.centered}>About Us</h1>
    //   </div>
    //   <div className={s.container2}>
    //     <div className={s.block1}>
    //       <Image src={imgs} alt="My Image" className={s.imagestyle} />
    //     </div>
    //     <div className={s.block2}>
    // Our project addresses different problems people face when they want
    // something on a temporary basis or earn something from a product or a
    // service on a continuous basis. Firstly, people may want to rent
    // different kinds of product or services and may come across questions
    // such as - How to rent? Whom to contact? Is the product/ service legit?
    // Can I get all this information from a single source?
    //     </div>
    //   </div>
    // </div>
    <div className={s.container}>
      <SectionHeading heading="About Us" />
      <Images />
      <div className={s.para__container}>
        Welcome to RIO! We are a team of seven college students who share a
        passion for creating innovative solutions that make life easier. Our
        project is driven by the belief that renting should be a hassle-free
        experience for both renters and rentees. We have used our skills and
        knowledge to build a platform that streamlines the rental process and
        enhances the rental experience. We hope that our website will not only
        simplify the rental process but also provide a sense of community for
        renters and rentees alike. Thank you for visiting our website. Hope you
        enjoy using it as much as we enjoyed creating it.
      </div>
    </div>
  );
};

export default AboutUs;
