// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";

function SitePagePayment() {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Payment Info", url: "" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Payment Info — ${theme.name}`}</title>
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="document">
            <div className="document__header">
              <h1 className="document__title">Payment Info</h1>
            </div>
            <div className="document__content typography">
              <h5>Welcome to SportsCenter shop!</h5>
              <br />
              <p>
              At SportsCenter, we currently offer cash on delivery as a payment option for our customers. We highly recommend that you verify your product upon receipt and make the payment during the delivery. We are continuously working to improve our online payment system and will update it as soon as possible to provide you with more options to make payments. Thank you for choosing SportsCenter as your trusted source for sports products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SitePagePayment;
