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

              <a className="nav-link " href="/admin/shop/list">
                <div className="sb-nav-link-icon">
                  <i class="fas fa-cog"></i>
                </div>
                Shop Setting
              </a>
              <a className="nav-link " href="/admin/profile">
                <div className="sb-nav-link-icon">
                  <i class="fas fa-user"></i>
                </div>
                Manage Profile
              </a>
              <a className="nav-link " href="/admin/product/list">
                <div className="sb-nav-link-icon">
                  <i class="fas fa-gem"></i>
                </div>
                Products
              </a>
              <a className="nav-link" href="/admin/order/list">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-cart-arrow-down" />
                </div>
                Orders
              </a>
              <a className="nav-link " href="/admin/coupon/list">
                <div className="sb-nav-link-icon">
                  <i class="fas fa-bullhorn"></i>
                </div>
                Coupon
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
