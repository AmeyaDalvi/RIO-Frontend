import React from "react";
import LandingText from "./LandingText";
import styles from '../../../styles/landing.module.css'


export default function Landing(){
  return(
    <div className={styles.Landing}>
      <div className={styles.leftPane}>
        <LandingText/>
        <div className={styles.ExploreButton}>Explore Products</div>
      </div>
      <div class="card" style={{padding:'50px'}}>
        <img className={styles.Image} src="https://www.nicepng.com/png/detail/208-2087825_it-services-products-and-services-icon.png" alt="Card image cap"/>
      </div>
    </div>
  )
}