// react
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// third-party
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { fetchUserDetail } from "../../store/auth";
import { history } from "../../helpers/history";

// application
import Indicator from "./Indicator";
import { Person20Svg } from "../../svg";
import { getCookie } from "../../function";
import { GetUserLogin } from "../../services";
import SocialLogin from "./SocialLogin";

function IndicatorAccount() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const token = getCookie("token");
  useEffect(async () => {
    if (token) {
      let userDetail = await GetUserLogin.getCustomerDetail(token);
      if (userDetail && userDetail.code === 200) {
        setUser(userDetail.data);
      }
    }
  }, [token]);
  const handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
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
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }
  const dropdown = (
    <div className="account-menu">
      {!token ? (
        <div className="login">
          {/* <div className="account-menu__form-title">
            <h2 className="h4 mb-0">Welcome Back!</h2>
            <small>Login to manage your account.</small>
          </div> */}
          <form
            className="account-menu__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="account-menu__form-title">
              Log In to Your Account
            </div>
            <div className="form-group">
              <label htmlFor="header-signin-email" className="sr-only">
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
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="form-group">
              <label htmlFor="header-signin-password" className="sr-only">
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
            <div className="account-menu__divider" />
            <div
              className="account-menu__form-link pt-2"
              onClick={() => {
                history.push("/account/register");
              }}
            >
              Create An Account
            </div>
          </form>
          <div className="account-menu__divider" />
          <SocialLogin />
        </div>
      ) : (
        <div className="profile-detail">
          <div className="account-menu__divider" />
          <Link to="/account/dashboard" className="account-menu__user">
            <div className="account-menu__user-avatar">
              <img src="images/avatars/avatar-3.jpg" alt="" />
            </div>
            <div className="account-menu__user-info">
              <div className="account-menu__user-name">
                {user ? user.firstName + " " + user.lastName : null}
              </div>
              <div className="account-menu__user-email">
                {user ? user.email : null}
              </div>
            </div>
          </Link>
          <div className="account-menu__divider" />
          <ul className="account-menu__links">
            <li>
              <a href="/account/profile">Edit Profile</a>
            </li>
            <li>
              <a href="/account/orders">Order History</a>
            </li>
            <li>
              <a href="/account/addresses">Addresses</a>
            </li>
            {/* <li><Link to="/account/password">Password</Link></li> */}
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
  );

  return (
    <Indicator
      url="/account"
      dropdown={dropdown}
      icon={<Person20Svg open={false} />}
    />
  );
}
const mapStateToProps = (state) => ({
  userData: state.user,
});

const mapDispatchToProps = {
  fetchUserDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorAccount);
