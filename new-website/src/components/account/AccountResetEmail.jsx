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

const AccountResetEmail = (props) => {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "My Account", url: "" },
  ];
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
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
      email: data.email,
      role: "0",
    };
    let userList = await GetUserLogin.getForgetPassword(dataList);
    if (userList && userList.code === 200) {
      NotificationManager.warning(userList.message);
      history.push({
        pathname: "/account/reset-password",
        state: {
          email: userList.data.email,
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
        <title>{`Forget Password — ${theme.name}`}</title>
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
                      <div className="createAccount mb-2">Forget Password</div>
                      <div className="mar-bot25 mb-2">
                        <img src="./images/mail-icon.svg" alt="Email" />
                      </div>
                      <span className="mobile-text">
                        Please enter registered email address.
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
                          {...register("email")}
                          className={`form-control form-control-sm ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Email address*"
                        />
                        <div className="invalid-feedback">
                          {errors.email?.message}
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
                          Reset Password
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

export default AccountResetEmail;
