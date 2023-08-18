// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";

function SitePageReturnPolicy() {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Return policy", url: "" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Return policy — ${theme.name}`}</title>
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="document">
            <div className="document__header">
              <h1 className="document__title">Return Policy</h1>
            </div>
            <div className="document__content typography">
              <h5>Welcome to chitwa shop!</h5>
              <br />
              <p>
                Return policy Chitwashop provide return policy to a customer.
                Chitwashop has large number of seller which sales different
                products on different category. Returns policy will be different
                on products. some product will be not return if seals broken or
                box/packages opened (some grocery category items or others) so
                please confirm before delivery to you or physical verify before
                seals broke. Change of mind is not applicable for return
                Chitwashop is verify than only shipping to customer. The
                Warranty period products redirect to authorized dealer or
                service center. Return policy applied only if the product is
                different than display. if products is damaged, broken. tears if
                size is not match than displayed if the products have
                manufacturing defect. if the deliver product is incorrect. if
                products have date expired. if product is not used. if product
                is not washed or dirt (in apparel and accessories item) Customer
                must be return or follow for return within 3 days from product
                received date
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SitePageReturnPolicy;
