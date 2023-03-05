import React from "react";
import footerstyles from "../../styles/footer.module.css";


const Footer = () => {
  return (
    <footer className={footerstyles.footer}>
      <div className={footerstyles["footer-content"]}>
        <div className={footerstyles["footer-column"]}>
          <h3>Useful Links</h3>
          <ul>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-use">Terms of Use</a>
            </li>
            <li>
              <a href="/return-policy">Return Policy</a>
            </li>
          </ul>
        </div>
        <div className={footerstyles["footer-column"]}>
          <h3>Company</h3>
          <ul>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/contact-us">Contact Us</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
          </ul>
        </div>
        <div className={footerstyles["footer-column"]}>
          <h3>Follow us on</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com">Instagram</a>
            </li>
            <li>
              <a href="https://www.linkedin.com">Linkedin</a>
            </li>
          </ul>
        </div>
        <div className={footerstyles["footer-column"]}>
          <h3>Download on</h3>
          <ul>
            <li>
              <a href="https://play.google.com/store">Play store</a>
            </li>
            <li>
              <a href="https://www.apple.com/app-store/">App store</a>
            </li>
          </ul>
        </div>
      </div>
      <p style={{ color: 'white', textAlign: 'center', fontSize: '14rme' }}>
        Made with <span style={{ color: 'red' }}>&#x2764;</span> Team 16 RIO - SE Spring 2023
      </p>
    </footer>
  );
};

export default Footer;
