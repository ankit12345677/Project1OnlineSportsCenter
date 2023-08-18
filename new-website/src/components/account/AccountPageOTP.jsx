// react
import React, { useState } from "react";
// third-party
import { Helmet } from "react-helmet-async";
import "./otp.css";
import { history } from "../../helpers/history";

// application
import PageHeader from "../shared/PageHeader";
import { GetUserLogin } from "../../services";
import { NotificationManager } from "react-notifications";
// data stubs
import theme from "../../data/theme";

const AccountPageOTP = (props) => {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "My Account", url: "" },
  ];
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const { email } = (props.location && props.location.state) || {};
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  async function onSubmit() {
    setLoading(true);
    const dataList = {
      email: email,
      key: otp.join(""),
    };
    let userList = await GetUserLogin.getCustomerEmailVerify(dataList);
    if (userList && userList.code === 200) {
      NotificationManager.success(userList.message);
      history.push({
        pathname: "/",
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>{`OTP — ${theme.name}`}</title>
      </Helmet>

      <PageHeader header="My Account" breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-6 d-flex">
              <div className="card flex-grow-1 mb-md-0">
                <div className="card-body ">
                  <div className="card_otp  px-3">
                    <div className="createAccount mb-2">
                      Verify your Email address
                    </div>
                    <div className="mar-bot25 mb-2">
                      <img src="./images/mail-icon.svg" alt="Email" />
                    </div>
                    <span className="mobile-text">
                      OTP will be sent to below email address &nbsp;
                      <b className="text-danger">{email}</b>
                    </span>
                    <div className="d-flex flex-row mt-3">
                      {otp.map((data, index) => {
                        return (
                          <input
                            className="form-control"
                            type="text"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                          />
                        );
                      })}
                    </div>
                    <div className="text-center mt-3">
                      <span className="d-block mobile-text">
                        Don't receive the OTP?
                      </span>
                      <span className="font-weight-bold text-danger cursor">
                        Resend
                      </span>
                    </div>
                    <div className="form-group account-menu__form-button">
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                        onClick={onSubmit}
                        disabled={loading}
                      >
                        {loading && (
                          <span className="spinner-border spinner-border-sm pl-2"></span>
                        )}
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountPageOTP;
