// react
import React from "react";

// third-party
import classNames from "classnames";
import { Link, matchPath, Redirect, Switch, Route } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// pages
import AccountPageAddresses from "./AccountPageAddresses";
import AccountPageDashboard from "./AccountPageDashboard";
import AccountPageEditAddress from "./AccountPageEditAddress";
import AccountPageOrderDetails from "./AccountPageOrderDetails";
import AccountPageOrders from "./AccountPageOrders";
import AccountPageOrderProductDetails from "./AccountPageOrderProductDetails";
import AccountPageProfile from "./AccountPageProfile";

// Define the AccountLayout component

export default function AccountLayout(props) {
  const { match, location } = props;

// Define an array of breadcrumb objects
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "My Account", url: "" },
  ];
// Define an array of link objects
  const links = [
    { title: "Dashboard", url: "dashboard" },
    { title: "Edit Profile", url: "profile" },
    { title: "Order History", url: "orders" },
    { title: "Addresses", url: "addresses" },
  ].map((link) => {
    const url = `${match.url}/${link.url}`;
    const isActive = matchPath(location.pathname, { path: url, exact: true });
    const classes = classNames("account-nav__item", {
      "account-nav__item--active": isActive,
    });
    // Return a Link component with the appropriate URL and classes
    return (
      <li key={link.url} className={classes}>
        <Link to={url}>{link.title}</Link>
      </li>
    );
  });
 // Render the component
  return (
    <React.Fragment>
      {/* Render a PageHeader component */}
      <PageHeader header="My Account" breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3 d-flex">
              <div className="account-nav flex-grow-1">
                {/* Render an unordered list of links */}
                <h4 className="account-nav__title">Navigation</h4>
                <ul>{links}</ul>
              </div>
            </div>
            <div className="col-12 col-lg-9 mt-4 mt-lg-0">
              <Switch>
                {/* Redirect to the dashboard page by default */}
                <Redirect
                  exact
                  from={match.path}
                  to={`${match.path}/dashboard`}
                />
                 {/* Define a Route component for each page */}
                <Route
                  exact
                  path={`${match.path}/dashboard`}
                  component={AccountPageDashboard}
                />
                <Route
                  exact
                  path={`${match.path}/profile`}
                  component={AccountPageProfile}
                />
                <Route
                  exact
                  path={`${match.path}/orders`}
                  component={AccountPageOrders}
                />
                <Route
                  exact
                  path={`${match.path}/orders/:orderId`}
                  component={AccountPageOrderDetails}
                />
                <Route
                  exact
                  path={`${match.path}/orders/details/:orderid/:varientId`}
                  component={AccountPageOrderProductDetails}
                />
                <Route
                  exact
                  path={`${match.path}/addresses`}
                  component={AccountPageAddresses}
                />
                <Route
                  exact
                  path={`${match.path}/addresses/:addressId`}
                  component={AccountPageEditAddress}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
