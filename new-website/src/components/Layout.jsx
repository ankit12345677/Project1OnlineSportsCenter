// react
import React, { Suspense } from "react";

// third-party
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// application
import Footer from "./footer";
import Header from "./header";
import MobileHeader from "./mobile/MobileHeader";
import MobileMenu from "./mobile/MobileMenu";
import Quickview from "./shared/Quickview";
import PrivateRoute from "../common/PrivateRoute";

// pages
import AccountLayout from "./account/AccountLayout";
import AccountPageLogin from "./account/AccountPageLogin";
import AccountPageRegister from "./account/AccountPageRegister";
import PageCart from "./shop/ShopPageCart";
import PageCheckout from "./shop/ShopPageCheckout";
import PageCompare from "./shop/ShopPageCompare";
import PageWishlist from "./shop/ShopPageWishlist";
import ShopPageCategory from "./shop/ShopPageCategory";
import ShopPageOrderSuccess from "./shop/ShopPageOrderSuccess";
import ShopPageProduct from "./shop/ShopPageProduct";
import ShopPageTrackOrder from "./shop/ShopPageTrackOrder";
import SitePageAboutUs from "./site/SitePageAboutUs";
import SitePageContactUs from "./site/SitePageContactUs";
import SitePageFaq from "./site/SitePageFaq";
import SitePagePrivacy from "./site/SitePagePrivacy";
import SitePageNotFound from "./site/SitePageNotFound";
import SitePageTerms from "./site/SitePageTerms";
// data stubs
import theme from "../data/theme";
import SitePagePayment from "./site/SitePagePayment";
import SitePageShipping from "./site/SitePageShipping";
import SitePageReturnPolicy from "./site/SitePageReturnPolicy";
import Loader from "../loader";
import AccountPageOTP from "./account/AccountPageOTP";
import { history } from "../helpers/history";
import AccountResetEmail from "./account/AccountResetEmail";
import AccountPagePassword from "./account/AccountPagePassword";
import SitePageFlashSale from "./site/SitePageFlashSale";

const categoryLayouts = [
  [
    "/shop/category-grid-3-columns-sidebar",
    { columns: 3, viewMode: "grid", sidebarPosition: "start" },
  ],
  ["/shop/category-grid-4-columns-full", { columns: 4, viewMode: "grid" }],
  ["/shop/category-grid-5-columns-full", { columns: 5, viewMode: "grid" }],
  [
    "/shop/category-list",
    { columns: 3, viewMode: "list", sidebarPosition: "start" },
  ],
  [
    "/shop/category-right-sidebar",
    { columns: 3, viewMode: "grid", sidebarPosition: "end" },
  ],
].map(([url, options]) => (
  <Route
    key={url}
    exact
    path={url}
    render={(props) => (
      <ShopPageCategory {...props} {...options} categorySlug="power-tools" />
    )}
  />
));

const productLayouts = [
  ["/shop/product-standard", { layout: "standard" }],
  ["/shop/product-columnar", { layout: "columnar" }],
  ["/shop/product-sidebar", { layout: "sidebar" }],
].map(([url, options]) => (
  <Route
    key={url}
    exact
    path={url}
    render={(props) => (
      <ShopPageProduct
        {...props}
        {...options}
        productSlug="brandix-screwdriver-screw1500acc"
      />
    )}
  />
));

function Layout(props) {
  const { match, headerLayout, homeComponent } = props;

  return (
    <React.Fragment>
      <Helmet>
        <title>{theme.name}</title>
        <meta name="description" content={theme.fullName} />
      </Helmet>

      <ToastContainer autoClose={5000} hideProgressBar />

      <Quickview />

      <MobileMenu />

      <div className="site">
        <header className="site__header d-lg-none">
          <MobileHeader />
        </header>

        <header className="site__header d-lg-block d-none">
          <Header layout={headerLayout} />
        </header>

        <div className="site__body">
          <Router history={history}>
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route exact path={`${match.path}`} component={homeComponent} />
                <Redirect exact from="/shop" to="/shop/catalog" />
                <Route
                  exact
                  path="/shop/catalog"
                  render={(props) => (
                    <ShopPageCategory
                      {...props}
                      columns={3}
                      viewMode="grid"
                      sidebarPosition="start"
                    />
                  )}
                />
                <Route
                  exact
                  path="/shop/catalog/:categorySlug"
                  render={(props) => (
                    <ShopPageCategory
                      {...props}
                      columns={3}
                      viewMode="grid"
                      sidebarPosition="start"
                      categorySlug={props.match.params.categorySlug}
                    />
                  )}
                />
                {/* Following category layouts only for demonstration. */}
                {categoryLayouts}

                <Route
                  exact
                  path="/shop/products/:ProductId/:productSlug"
                  render={(props) => (
                    <ShopPageProduct
                      {...props}
                      layout="standard"
                      ProductId={props.match.params.ProductId}
                      productSlug={props.match.params.productSlug}
                    />
                  )}
                />
                {/* Following product layouts only for demonstration. */}
                {productLayouts}

                <Route exact path="/shop/cart" component={PageCart} />
                <PrivateRoute
                  exact
                  path="/shop/checkout"
                  component={PageCheckout}
                />
                <PrivateRoute
                  exact
                  path="/shop/checkout/success"
                  component={ShopPageOrderSuccess}
                />
                <Route exact path="/shop/wishlist" component={PageWishlist} />
                <Route exact path="/shop/compare" component={PageCompare} />
                <Route
                  exact
                  path="/shop/track-order"
                  component={ShopPageTrackOrder}
                />
                <Route
                  exact
                  path="/account/login"
                  component={AccountPageLogin}
                />
                <Route
                  exact
                  path="/account/verify-otp"
                  component={AccountPageOTP}
                />
                <Route
                  exact
                  path="/account/reset-email"
                  component={AccountResetEmail}
                />
                <Route
                  exact
                  path="/account/reset-password"
                  component={AccountPagePassword}
                />
                <Route
                  exact
                  path="/account/register"
                  component={AccountPageRegister}
                />
                <PrivateRoute path="/account" component={AccountLayout} />
                <Redirect exact from="/site" to="/site/about-us" />
                <Route
                  exact
                  path="/site/about-us"
                  component={SitePageAboutUs}
                />
                <Route
                  exact
                  path="/site/contact-us"
                  component={SitePageContactUs}
                />
                <Route
                  exact
                  path="/site/flash-sale"
                  component={SitePageFlashSale}
                />
                <Route
                  exact
                  path="/site/not-found"
                  component={SitePageNotFound}
                />
                <Route exact path="/site/faq" component={SitePageFaq} />
                <Route exact path="/site/privacy" component={SitePagePrivacy} />
                <Route
                  exact
                  path="/site/return-policy"
                  component={SitePageReturnPolicy}
                />
                <Route exact path="/site/payment" component={SitePagePayment} />
                <Route
                  exact
                  path="/site/shipping"
                  component={SitePageShipping}
                />
                <Route exact path="/site/terms" component={SitePageTerms} />
                <Route component={SitePageNotFound} />
              </Switch>
            </Suspense>
          </Router>
        </div>

        <footer className="site__footer">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

Layout.propTypes = {
  /**
   * header layout (default: 'classic')
   * one of ['classic', 'compact']
   */
  headerLayout: PropTypes.oneOf(["default", "compact"]),
  /**
   * home component
   */
  homeComponent: PropTypes.elementType.isRequired,
};

Layout.defaultProps = {
  headerLayout: "default",
};

export default Layout;
