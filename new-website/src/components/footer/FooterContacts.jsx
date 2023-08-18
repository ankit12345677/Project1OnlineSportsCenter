// react
import React from "react";

// data stubs
import theme from "../../data/theme";

export default function FooterContacts() {
  return (
    <div className="site-footer__widget footer-contacts">
      <h4 className="footer-contacts__title">Contact Us</h4>
      <ul className="footer-contacts__contacts">
        <li>
          <i className="footer-contacts__icon fas fa-globe-americas" />
          {theme.contacts.address}
        </li>
        <li>
          <i className="footer-contacts__icon far fa-envelope" />
          {theme.contacts.email}
        </li>
        <li>
          <i className="footer-contacts__icon fas fa-mobile-alt" />
          {`${theme.contacts.phone}`}
        </li>
      </ul>
    </div>
  );
}
