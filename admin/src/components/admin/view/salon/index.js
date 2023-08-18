import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Allparlour from "./all-parlour";
import Order from "./order";
export default class Salons extends Component {
  render() {
    const { match } = this.props;
    return (
      <div id="layoutSidenav_content">
        <main>
          <Switch>
            <Route path={[`${match.path}/parlour`]} component={Allparlour} />
            <Route path={[`${match.path}/order`]} component={Order} />
          </Switch>
        </main>
      </div>
    );
  }
}
