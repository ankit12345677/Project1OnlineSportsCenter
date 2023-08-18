import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./header";
import Home from "./dashboard";
import SideBar from "./sidebar";
import Shop from "./view/shop";
import Category from "./view/category";
import Areas from "./view/areas";
import Location from "./view/location";
import Order from "./view/order";
import Customer from "./view/customer";
import User from "./view/user";
import Bannerlist from "./view/Banner";
import Businessdetails from "./view/business";
import Brand from "./view/brand";
import Color from "./view/color";
//import Salons from "./view/salon";
import SeoDetail from "./view/seodetail";
import ProductHistory from "./view/product-history";
import Collection from "./view/collection";
import Marketing from "./view/marketing";
export default class rootRoutes extends Component {
  render() {
    const { match } = this.props;
    return (
      <main>
        <Header />
        <div id="layoutSidenav">
          <SideBar />
          <Switch>
            <Route
              exact
              path={[`${match.path}/home`, `${match.path}`]}
              component={Home}
            />
            <Route path={`${match.path}/shop`} component={Shop} />
            {/* <Route path={`${match.path}/product`} component={Product} /> */}
            <Route
              path={`${match.path}/seller/product-detail`}
              component={ProductHistory}
            />
            <Route path={`${match.path}/category`} component={Category} />
            <Route path={`${match.path}/area`} component={Areas} />
            <Route path={`${match.path}/collection`} component={Collection} />
            <Route path={`${match.path}/brand`} component={Brand} />
            <Route path={`${match.path}/color`} component={Color} />
            <Route path={`${match.path}/location`} component={Location} />
            <Route path={`${match.path}/order`} component={Order} />
            <Route path={`${match.path}/customer`} component={Customer} />
            <Route path={`${match.path}/marketing`} component={Marketing} />
            <Route path={`${match.path}/user`} component={User} />
            <Route path={`${match.path}/customer`} component={Customer} />
            <Route path={`${match.path}/seo`} component={SeoDetail} />
            <Route
              path={`${match.path}/business`}
              component={Businessdetails}
            />
            <Route path={`${match.path}/image/upload`} component={Bannerlist} />
            {/* <Route path={`${match.path}/salons`} component={Salons} /> */}
          </Switch>
        </div>
      </main>
    );
  }
}
