import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Allshop from "./All-Shop";
import View from "./view";
import Websitesellar from "../website-vendor-list";
import List from "./All-Product";
import Edit from "./All-Product/edit";
import SellerProductEdit from "./view/edit";
export default class Shop extends Component {
  render() {
    const { match } = this.props;
    return (
      <div id="layoutSidenav_content">
        <main>
          <Switch>
            <Route path={[`${match.path}/list`]} component={Allshop} />
            <Route path={[`${match.path}/view/:id`]} component={View} />
            <Route
              path={[`${match.path}/Seller/Product/:email/:id`]}
              component={SellerProductEdit}
            />
            <Route
              path={[`${match.path}/website-sellar-list`]}
              component={Websitesellar}
            />
            <Route
              path={[`${match.path}/seller/all-product`]}
              component={List}
            />
            <Route
              path={[`${match.path}/seller/edit-product/:id`]}
              component={Edit}
            />
          </Switch>
        </main>
      </div>
    );
  }
}
