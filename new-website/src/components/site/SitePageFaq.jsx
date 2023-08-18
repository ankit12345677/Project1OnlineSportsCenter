// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";

function SitePageFaq() {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Frequently Asked Questions", url: "" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`FAQ — ${theme.name}`}</title>
      </Helmet>

      <PageHeader header="Frequently Asked Questions" breadcrumb={breadcrumb} />

      <div className="block faq">
        <div className="container">
          <div className="faq__section">
            <div className="faq__section-title">
              <h3>Faq Information</h3>
            </div>
            <div className="faq__section-body">
              <div className="row">
                <div className="faq__section-column col-12 col-lg-6">
                  <div className="typography">
                    <h6>How I sell my product on SportsCenter?</h6>

                    <p>
                      First you have click on starting selling button available
                      on website button area. And you will see contact us field.
                      You have to fill that area. After few days SportsCenter will
                      contact You.
                    </p>

                    <h6>Which type a product can I sell on SportsCenter?</h6>

                    <p>
                      The product which is has no any compliant or restriction
                      by Government.
                    </p>
                  </div>
                </div>
                <div className="faq__section-column col-12 col-lg-6">
                  <div className="typography">
                    <h6>How much does it cost to sell on SportsCenter?</h6>

                    <p>
                      We will not be charge any commission.
                    </p>

                    <h6>How can I buy from SportsCenter?</h6>

                    <p>
                      Anyone who is familer with website can buy from website by
                      doing following method
                      <br />
                      <b>*Click Add To Bag</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 
                    <div className="faq__section">
                        <div className="faq__section-title">
                            <h3>Payment Information</h3>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6>What shipping methods are available?</h6>

                                        <p>
                                            Lorem ipsum dolor sit amet conse ctetur adipisicing
                                            elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip
                                            ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore
                                            eu fugiat.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6>What shipping methods are available?</h6>

                                        <p>
                                            Lorem ipsum dolor sit amet conse ctetur adipisicing
                                            elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip
                                            ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore
                                            eu fugiat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="faq__section">
                        <div className="faq__section-title">
                            <h3>Orders and Returns</h3>
                        </div>
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6>What shipping methods are available?</h6>

                                        <p>
                                            Lorem ipsum dolor sit amet conse ctetur adipisicing
                                            elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip
                                            ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore
                                            eu fugiat.
                                        </p>
                                    </div>
                                </div>
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography">
                                        <h6>What shipping methods are available?</h6>

                                        <p>
                                            Lorem ipsum dolor sit amet conse ctetur adipisicing
                                            elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip
                                            ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore
                                            eu fugiat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default SitePageFaq;
