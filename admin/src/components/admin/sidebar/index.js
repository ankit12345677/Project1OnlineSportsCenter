import React, { Component } from "react";
import { getCookie } from "../../../function";

export default class Sidebar extends Component {
  render() {
    let role = getCookie("role");
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

              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseShops"
                aria-expanded="false"
                aria-controls="collapseShops"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user" />
                </div>
                Seller
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </a>
              <div
                className="collapse"
                id="collapseShops"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/shop/seller/all-product"
                  >
                    All product
                  </a>
                </nav>
              </div>
              <div
                className="collapse"
                id="collapseShops"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a className="nav-link sub_nav_link" href="/admin/shop/list">
                    list
                  </a>
                </nav>
              </div>
              <div
                className="collapse"
                id="collapseShops"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/seller/product-detail/list/history"
                  >
                    Product Detail
                  </a>
                </nav>
              </div>
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseProducts"
                aria-expanded="false"
                aria-controls="collapseProducts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-box" />
                </div>
                Products
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </a>
              <div
                className="collapse"
                id="collapseProducts"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a className="nav-link sub_nav_link" href="/admin/brand/list">
                    Brand
                  </a>
                  <a className="nav-link sub_nav_link" href="/admin/color/list">
                    Color
                  </a>
                </nav>
              </div>
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseCategories"
                aria-expanded="false"
                aria-controls="collapseCategories"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-list" />
                </div>
                Categories
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </a>
              <div
                className="collapse"
                id="collapseCategories"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/category/list"
                  >
                    All Categories
                  </a>
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/category/super"
                  >
                    Super Categories
                  </a>
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/category/create"
                  >
                    Add Category
                  </a>
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/category/sub-create"
                  >
                    Add Sub-Category
                  </a>
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/category/sub-child-create"
                  >
                    Add Child-Category
                  </a>
                </nav>
              </div>
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseLocations"
                aria-expanded="false"
                aria-controls="collapseLocations"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                City
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </a>
              <div
                className="collapse"
                id="collapseLocations"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/location/list"
                  >
                    All city
                  </a>
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/location/create"
                  >
                    Add city
                  </a>
                </nav>
              </div>
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseAreas"
                aria-expanded="false"
                aria-controls="collapseAreas"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-map-marked-alt" />
                </div>
                Areas
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </a>
              <div
                className="collapse"
                id="collapseAreas"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a className="nav-link sub_nav_link" href="/admin/area/list">
                    All Areas
                  </a>
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/area/create"
                  >
                    Add Area
                  </a>
                </nav>
              </div>

              <a className="nav-link" href="/admin/order/list">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-cart-arrow-down" />
                </div>
                Orders
              </a>
              <a className="nav-link" href="/admin/shop/website-sellar-list">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-store" />
                </div>
                Website Vendor
              </a>
              <a className="nav-link" href="/admin/image/upload">
                <div className="sb-nav-link-icon">
                  <i class="fas fa-image"></i>
                </div>
                Banner Upload
              </a>
              {/* <a className="nav-link" href="/admin/collection/list">
                <div className="sb-nav-link-icon">
                  <i class="fas fa-store" />
                </div>
                Collections
              </a> */}
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseMarketing"
                aria-expanded="false"
                aria-controls="collapseMarketing"
              >
                <div className="sb-nav-link-icon">
                  <i className="fa fa-bullhorn" aria-hidden="true" />
                </div>
                Marketing
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </a>
              <div
                className="collapse"
                id="collapseMarketing"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <ul className="aiz-side-nav-list level-2 mm-collapse mm-show">
                    <li className="aiz-side-nav-item">
                      <a
                        className="nav-link sub_nav_link"
                        href="/admin/marketing/list"
                      >
                        Flash Sale
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* <a
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
              </a> */}
              <div
                className="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/salons/parlour/list"
                  >
                    All parlour
                  </a>
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/salons/order/list"
                  >
                    Order
                  </a>
                </nav>
              </div>
              {/* <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#business"
                aria-expanded="false"
                aria-controls="business"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-box" />
                </div>
                Business
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down" />
                </div>
              </a> */}
              <div
                className={role === "admin" ? "collapse" : "d-none"}
                id="business"
                aria-labelledby="headingTwo"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <a
                    className="nav-link sub_nav_link"
                    href="/admin/business/list"
                  >
                    Sold Products
                  </a>
                </nav>
              </div>
              <a className="nav-link" href="/admin/seo/list">
                <div className="sb-nav-link-icon">
                  <i class="fab fa-yoast"></i>
                </div>
                SEO
              </a>
              <a
                className={role === "admin" ? "nav-link" : "d-none"}
                href="/admin/user/list"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users" />
                </div>
                Roles Management
              </a>

              <a className="nav-link" href="/admin/customer/list">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-users" />
                </div>
                Customers
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
