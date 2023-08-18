// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";

function SitePageContactUs() {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Contact Us", url: "" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Contact Us — ${theme.name}`}</title>
      </Helmet>
      <PageHeader header="Contact Us" breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="card mb-0">
            <div className="card-body contact-us">
              <div className="contact-us__container">
                <div className="row">
                  <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                    <h4 className="contact-us__header card-title">
                      Our Address
                    </h4>

                    <div className="contact-us__address">
                      <p>
                        SportsCenter shop chembur mumbai-400074
                        <br />
                        Email: sportscenter017@gmail.com
                        <br />
                        Phone Number: +91 9801670444, 8652873912
                      </p>
                      <p></p>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <h4 className="contact-us__header card-title">
                      Leave us a Message
                    </h4>

                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="form-name">Your Name</label>
                          <input
                            type="text"
                            id="form-name"
                            className="form-control"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="form-email">Email</label>
                          <input
                            type="email"
                            id="form-email"
                            className="form-control"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-subject">Subject</label>
                        <input
                          type="text"
                          id="form-subject"
                          className="form-control"
                          placeholder="Subject"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-message">Message</label>
                        <textarea
                          id="form-message"
                          className="form-control"
                          rows="4"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Send Message
                      </button>
                    </form>
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

export default SitePageContactUs;
