import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import View from "./view";
import List from "./list";
export default class Order extends Component {
  render() {
    const { match } = this.props;
    return (
      <main>
        <Switch>
          <Route path={[`${match.path}/list`]} component={List} />
          <Route path={[`${match.path}/view`]} component={View} />
        </Switch>
      </main>
    );
  }
}
