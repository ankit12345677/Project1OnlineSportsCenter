// react
import React from "react";

// application
import FooterContacts from "./FooterContacts";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";
import ToTop from "./ToTop";

export default function Footer() {
  const informationLinks = [
    { title: "Contact Us", url: "site/contact-us" },
    { title: "About Us", url: "site/about-us" },
  ];

  const Help = [
    { title: "Payment", url: "site/payment" },
    { title: "Shipping", url: "site/shipping" },
    { title: "FAQ", url: "site/faq" },
    { title: "Seller Register", url: "site/contact-us" },
  ];

  return (
    <div className="site-footer">
      <div className="container">
        <div className="site-footer__widgets">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <FooterContacts />
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <FooterLinks title="About" items={informationLinks} />
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <FooterLinks title="Help" items={Help} />
            </div>
            <div className="col-6 col-md-12 col-lg-2">
              <FooterNewsletter />
            </div>
          </div>
        </div>

        {/* <div className="site-footer__bottom">
                    <div className="site-footer__copyright">
                        Powered by
                        {' '}
                        <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React</a>
                        {' '}
                        — Design by
                        {' '}
                        <a href={theme.author.profile_url} target="_blank" rel="noopener noreferrer">
                            {theme.author.name}
                        </a>
                    </div>
                    <div className="site-footer__payments">
                        <img src="images/payments.png" alt="" />
                    </div>
                </div> */}
      </div>
      <ToTop />
    </div>
  );
}
