import React from "react";
import s from '../../styles/Aboutus.module.css';
import imgs from '../../../public/images/img.jpeg';
import Image from 'next/image'


const AboutUs = () => {
  return (<>
  <div className={s.container1}>
    <h1 className={s.centered}>About Us</h1>
  </div>
  <div className={s.container}>
      <div className={s.block1}>
        <Image src={imgs} alt="My Image" className={s.imagestyle} />
      </div>
      <div className={s.block2}>Our project addresses different
problems people face when they want
something on a temporary basis or earn
something from a product or a service
on a continuous basis. Firstly, people
may want to rent different kinds of
product or services and may come
across questions such as - How to rent?
Whom to contact? Is the product/
service legit? Can I get all this
information from a single source?</div>
    </div>
  
  </>
  );
}

export default AboutUs;
