import React from 'react';
import '../css/styles.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='container'>
          
          <div className='contactDiv'>
            <h3>Contact Us</h3>
            <ul className='contact-info'>
              <li>123 Main Street, New York, NY 10001</li>
              <li>(123) 456-7890</li>
              <li> info@example.com</li>
            </ul>
          </div>
          <div className='copyrightDiv'>
          <hr />
            <p>© 2023 Dyner by Jessica-Maria Freund,<br /> All rights reserved.</p>
          </div>
      </div>
    </footer>
  )
}

export default Footer;
