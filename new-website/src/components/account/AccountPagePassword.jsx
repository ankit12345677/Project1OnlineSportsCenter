// react
import React, { useState } from "react";
// third-party
import { Helmet } from "react-helmet-async";
import "./otp.css";
import { history } from "../../helpers/history";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// application
import PageHeader from "../shared/PageHeader";
import { GetUserLogin } from "../../services";
import { NotificationManager } from "react-notifications";
// data stubs
import theme from "../../data/theme";

const AccountPagePassword = (props) => {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "My Account", url: "" },
  ];
  const { email } = (props.location && props.location.state) || {};
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    OTP: Yup.number()
      .min(6, "OTP min 6 number please check your email !!")
      .required("OTP is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const onclick = () => {
    history.push("/account/login");
  };
  async function onSubmit(data) {
    // display form data on success
    setLoading(true);
    const dataList = {
      email: email,
      OTP: data.OTP,
      password: data.password,
      role: "0",
    };
    let userList = await GetUserLogin.getCustomerResetPassword(dataList);
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
  console.log(errors);
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Change Password — ${theme.name}`}</title>
      </Helmet>

      <PageHeader header="My Account" breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-6 d-flex">
              <div className="card flex-grow-1 mb-md-0">
                <div className="card-body ">
                  <div className="login">
                    <form
                      className="account-menu__form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="createAccount mb-2">New Password</div>
                      <div className="mar-bot25 mb-2">
                        <img src="./images/mail-icon.svg" alt="Email" />
                      </div>
                      <span className="mobile-text">
                        Please enter new password.
                      </span>
                      <div className="form-group pt-2">
                        <label
                          htmlFor="header-signin-email"
                          className="sr-only"
                        >
                          Email address
                        </label>
                        <input
                          id="header-signin-email"
                          name="email"
                          type="text"
                          value={email}
                          disabled
                          className="form-control form-control-sm"
                        />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="header-signin-password"
                          className="sr-only"
                        >
                          OTP
                        </label>
                        <div className="account-menu__form-forgot">
                          <input
                            id="header-signin-number"
                            type="number"
                            name="otp"
                            className={`form-control form-control-sm ${
                              errors.OTP ? "is-invalid" : ""
                            }`}
                            placeholder="Enter your OTP"
                            {...register("OTP")}
                          />
                          <div className="invalid-feedback">
                            {errors.OTP?.message}
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="header-signin-password"
                          className="sr-only"
                        >
                          New Password
                        </label>
                        <div className="account-menu__form-forgot">
                          <input
                            id="header-signin-password"
                            type="password"
                            name="password"
                            className={`form-control form-control-sm ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            placeholder="Enter new password"
                            {...register("password")}
                          />
                          <div className="invalid-feedback">
                            {errors.password?.message}
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="header-signin-password"
                          className="sr-only"
                        >
                          Confirm Password
                        </label>
                        <div className="account-menu__form-forgot">
                          <input
                            id="header-signin-password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                            className={`form-control ${
                              errors.confirmPassword ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.confirmPassword?.message}
                          </div>
                        </div>
                      </div>
                      <div className="form-group account-menu__form-button">
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm"
                          disabled={loading}
                        >
                          {loading && (
                            <span className="spinner-border spinner-border-sm pl-2"></span>
                          )}
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={onclick}
                          className="btn btn-secondary btn-sm ml-3"
                        >
                          Cancel
                        </button>
                      </div>
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
};

export default AccountPagePassword;
