import React from "react";
import LandingText from "./LandingText";
import styles from '../../../styles/landing.module.css'
export default function Landing(){
  const rightPaneStyles={
        overflow:'hidden',
        width:'100%',
        height:'90%',
        padding:'50px',
        background:'#ebeaea'
      }

  return(
    <div className={styles.container}>
      <div className={styles.Landing}>
        <div className={styles.leftPane}>
          <LandingText/>
          <div className={styles.ExploreButton}>Explore Products</div>
        </div>
        <div style={rightPaneStyles}>
          <div className={styles.Image}>
            <img src=""/>
          </div>
        </div>
      </div>
    </div>
  )
}