import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="#">About Us</a> 
          <a href="#">Causes</a>
          <a href="#">FAQs</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: HopeBridge@gmail.com</p>
          <p>Phone: +91-94901-31699</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 HopeBridge. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;