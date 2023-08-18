// react
import React from "react";

// third-party
import { Link } from "react-router-dom";

// application
import DropdownLanguage from "./DropdownLanguage";

function Topbar() {
  const links = [
    {
      title: "Register Seller",
      url: "/site/contact-us",
    },
    ,
  ];

  const accountLinks = [
    { title: "Login", url: "/account/login" },
    { title: "Register", url: "/account/login" },
  ];

  const linksList = links.map((item, index) => (
    <div key={index} className="topbar__item topbar__item--link">
      {item.title === "Register Parlour/Salon" ? (
        <a href={item.url} {...item.props} target="_blank">
          {item.title}
        </a>
      ) : (
        <a className="topbar-link" href={item.url}>
          {item.title}
        </a>
      )}
    </div>
  ));

  const accountLink = accountLinks.map((item, index) => (
    <div key={index} className="topbar__item topbar__item--link">
      <a className="topbar-link" href={item.url}>
        {item.title}
      </a>
    </div>
  ));
  return (
    <div className="site-header__topbar topbar">
      <div className="topbar__container container">
        <div className="topbar__row">
          {linksList}
          <div className="topbar__spring" />
          <div className="topbar__item">{accountLink}</div>
          <div className="topbar__item">
            <DropdownLanguage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
