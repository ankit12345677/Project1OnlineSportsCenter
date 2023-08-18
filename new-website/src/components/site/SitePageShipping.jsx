// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";

// data stubs

function SitePageShipping() {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Shipping & Deals Info", url: "" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shipping & Deals Info</title>
        <meta charset="utf-8" />
        <meta name="title" content="Shipping & Deals Info" />
        <meta
          name="keyword"
          content="SportsCenter also offers a wide range of sports-related products, including equipment, apparel, and accessories for various sports such as football, cricket, basketball, tennis, and more. We strive to provide high-quality products from trusted brands at competitive prices to meet the needs of our customers who are passionate about sports. You can explore our sports section on our website to find the latest products and deals. Thank you for your interest in SportsCenter!"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="" content="IE=edge,chrome=1"></meta>

        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <PageHeader header="Shipping & Deals Info" breadcrumb={breadcrumb} />

      <div className="block faq">
        <div className="container">
          <div className="faq__section">
            <div className="faq__section-body">
              <div className="row">
                <div className="faq__section-column col-12 col-lg-12">
                  <div className="typography">
                    <h3>
                      <b>Great Daily Deals Discounts</b>
                    </h3>
                    <p>
                    SportsCenter is an ecommerce marketplace that revolutionizes the traditional methods of buying and selling in our country. With SportsCenter, customers can buy and sell products in a modern way through our website. We offer a variety of daily deals to our proactive customers, including discounts on products. SportsCenter is an innovative ecommerce marketplace that is changing the way we shop online. Thank you for choosing SportsCenter!
                    </p>
                    <h3>100% Satisfaction and Guaranty</h3>
                    <p>
                    SportsCenter provides a wide range of products, including sports equipment, apparel, and accessories. We offer a variety of sports-related items such as footballs, basketballs, cricket bats, tennis rackets, fitness equipment, sportswear, and much more. 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SitePageShipping;
