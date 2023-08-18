// react
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// third-party
import { Helmet } from "react-helmet-async";
import { NotificationManager } from "react-notifications";
// application
import PageHeader from "../shared/PageHeader";
import { GetUserLogin } from "../../services";
import { history } from "../../helpers/history";
// data stubs
import theme from "../../data/theme";

function AccountPageLogin() {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "My Account", url: "" },
  ];
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
         .required("Please enter first name!").min(2, "First Name is TOO Short.").matches(/^[a-zA-z]*$/,"Please enter a valid first name"),
    lastName: Yup.string().required("Please enter last name!").min(2, "Last Name is TOO Short.").matches(/^[a-zA-z]*$/,"Please enter a valid last name"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    // display form data on success
    setLoading(true);
    const dataList = {
      email: data.email,
      firstName: data.email,
      lastName: data.lastName,
      password: data.password,
      role: "0",
    };
    let userList = await GetUserLogin.getUserRegister(dataList);
    if (userList && userList.code === 200) {
      NotificationManager.success(userList.message);
      history.push({
        pathname: "/account/verify-otp",
        state: {
          email: dataList.email,
        },
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Register — ${theme.name}`}</title>
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
                      <div className="account-menu__form-title">
                        Register In to Your Account
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="header-signin-email"
                          className="sr-only"
                        >
                          First Name
                        </label>
                        <input
                          id="header-signin-email"
                          name="firstName"
                          type="text"
                          {...register("firstName")}
                          className={`form-control form-control-sm ${
                            errors.firstName ? "is-invalid" : ""
                          }`}
                          placeholder="First Name"
                        />
                        <div className="invalid-feedback">
                          {errors.firstName?.message}
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="header-signin-email"
                          className="sr-only"
                        >
                          Last Name
                        </label>
                        <input
                          id="header-signin-email"
                          name="lastName"
                          type="text"
                          {...register("lastName")}
                          className={`form-control form-control-sm ${
                            errors.lastName ? "is-invalid" : ""
                          }`}
                          placeholder="Last Name"
                        />
                        <div className="invalid-feedback">
                          {errors.lastName?.message}
                        </div>
                      </div>
                      <div className="form-group">
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
                          {...register("email")}
                          className={`form-control form-control-sm ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Email address"
                        />
                        <div className="invalid-feedback">
                          {errors.email?.message}
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="header-signin-password"
                          className="sr-only"
                        >
                          Password
                        </label>
                        <div className="account-menu__form-forgot">
                          <input
                            id="header-signin-password"
                            type="password"
                            name="password"
                            className={`form-control form-control-sm ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            placeholder="Password"
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
                      <div className="form-group form-check">
                        <input
                          name="acceptTerms"
                          type="checkbox"
                          {...register("acceptTerms")}
                          id="acceptTerms"
                          className={`form-check-input ${
                            errors.acceptTerms ? "is-invalid" : ""
                          }`}
                        />
                        <label
                          htmlFor="acceptTerms"
                          className="form-check-label"
                        >
                          I accept the{" "}
                          <a href="/site/terms">Terms & Conditions</a>
                        </label>
                        <div className="invalid-feedback">
                          {errors.acceptTerms?.message}
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
                          Register
                        </button>
                        <button
                          type="button"
                          onClick={() => reset()}
                          className="btn btn-secondary btn-sm ml-3"
                        >
                          Reset
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
}

export default AccountPageLogin;
