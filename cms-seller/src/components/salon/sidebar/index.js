import React, { Component } from "react";

export default class Sidebar extends Component {
  render() {
    return (
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <a className="nav-link active" href="/">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt" />
                </div>
                Dashboard
              </a>

              <a className="nav-link " href="/salon/profile">
                <div className="sb-nav-link-icon">
                  <i class="fas fa-user"></i>
                </div>
                Manage Profile
              </a>
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <i class="fas fa-spa"></i>
                </div>
                Parlour
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </a>
              <div
                className="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a
                    className="nav-link sub_nav_link"
                    href="/salon/category/list"
                  >
                    Categories
                  </a>
                  <a
                    className="nav-link sub_nav_link"
                    href="/salon/service/list"
                  >
                    Service
                  </a>
                </nav>
              </div>
              <a className="nav-link " href="/salon/your-parlour/list">
                <div className="sb-nav-link-icon">
                  <i class="fas fa-cog"></i>
                </div>
                Salon Setting
              </a>
              <a className="nav-link " href="/salon/order/list">
                <div className="sb-nav-link-icon">
                  <i class="fab fa-first-order"></i>
                </div>
                Order
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
