import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="soundSpot__footer">
      <div className="soundSpot__footer left">
        <ul className="soundSpot__footer soundSpot__footer_ul">
          <li className="soundSpot__footer soundSpot__footer_ul">About Us</li>
          <li className="soundSpot__footer soundSpot__footer_ul">Developers</li>
          <li className="soundSpot__footer soundSpot__footer_ul">Contacts</li>
        </ul>
      </div>
      <div className="soundSpot__footer right">
        Saint-Petersburg, 2022 ©
      </div>
    </div>
  );
}

export default Footer;
