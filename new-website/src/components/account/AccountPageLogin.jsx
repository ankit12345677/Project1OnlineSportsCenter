// react
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../../helpers/history";

// application
import PageHeader from "../shared/PageHeader";
import { getCookie } from "../../function";
import { GetUserLogin } from "../../services";
// data stubs
import theme from "../../data/theme";
import SocialLogin from "../header/SocialLogin";

function AccountPageLogin({ userData }) {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "My Account", url: "" },
  ];
  const [user, setUser] = useState({});
  const token = getCookie("token");
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (token) {
      let userDetail = await GetUserLogin.getCustomerDetail(token);
      if (userDetail && userDetail.code === 200) {
        setUser(userDetail.data);
      }
    }
  }, [token]);
  const handleLogout = (event) => {
    event.preventDefault();
    GetUserLogin.logout();
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
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
      password: data.password,
      role: "0",
    };
    try {
      let userList = await GetUserLogin.getUserLogin(dataList);
      if (userList.success) {
        NotificationManager.success("Success");
        GetUserLogin.authenticateByEmail(userList.token);
        history.push("/shop/checkout");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Login — ${theme.name}`}</title>
      </Helmet>

      <PageHeader header="My Account" breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-6 d-flex">
              <div className="card flex-grow-1 mb-md-0">
                <div className="card-body ">
                  {!token ? (
                    <div className="login">
                      <form
                        className="account-menu__form"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="account-menu__form-title">
                          Log In to Your Account
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

                            <span
                              onClick={() => {
                                history.push("/account/reset-email");
                              }}
                              className="account-menu__form-forgot-link"
                            >
                              Forgot?
                            </span>
                            <div className="invalid-feedback">
                              {errors.password?.message}
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
                            Login
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              history.push("/account/reset-email");
                            }}
                            className="btn btn-secondary btn-sm ml-3"
                          >
                            Reset
                          </button>
                        </div>
                        <div className="account-menu__form-link">
                          <Link to="/account/register">Create An Account</Link>
                        </div>
                      </form>
                      <SocialLogin />
                    </div>
                  ) : (
                    <div className="profile-detail">
                      <div className="account-menu__divider" />
                      <Link
                        to="/account/dashboard"
                        className="account-menu__user"
                      >
                        <div className="account-menu__user-avatar">
                          <img src="images/avatars/avatar-3.jpg" alt="" />
                        </div>
                        <div className="account-menu__user-info">
                          <div className="account-menu__user-name">
                            {userData && userData
                              ? user.firstName + " " + user.lastName
                              : null}
                          </div>
                          <div className="account-menu__user-email">
                            {user ? user.email : null}
                          </div>
                        </div>
                      </Link>
                      <div className="account-menu__divider" />
                      <ul className="account-menu__links">
                        <li>
                          <Link to="/account/profile">Edit Profile</Link>
                        </li>
                        <li>
                          <Link to="/account/orders">Order History</Link>
                        </li>
                        <li>
                          <Link to="/account/addresses">Addresses</Link>
                        </li>
                        {/* <li>
                          <Link to="/account/password">Password</Link>
                        </li> */}
                      </ul>
                      <div className="account-menu__divider" />
                      <ul className="account-menu__links">
                        <li onClick={handleLogout}>
                          <Link to="">Logout</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  userData: state.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageLogin);
