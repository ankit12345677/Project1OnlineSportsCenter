import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./header";
import Home from "./dashboard";
import SideBar from "./sidebar";
import Profile from "./view/profile";
import Category from "./view/category";
import ParlourService from "./view/service";
import Allparlour from "./view/all-parlour";
import Order from "./view/order";
export default class SalonRoutes extends Component {
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
            <Route exact path={`${match.path}/profile`} component={Profile} />
            <Route path={`${match.path}/category`} component={Category} />
            <Route path={`${match.path}/service`} component={ParlourService} />
            <Route path={`${match.path}/service`} component={ParlourService} />
            <Route path={`${match.path}/your-parlour`} component={Allparlour} />
            <Route path={`${match.path}/order`} component={Order} />
          </Switch>
        </div>
      </main>
    );
  }
}
