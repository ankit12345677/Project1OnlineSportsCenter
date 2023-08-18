import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import List from "./list";
import View from "./view";

export default class Collection extends Component {
  render() {
    const { match } = this.props;
    return (
      <div id="layoutSidenav_content">
        <main>
          <Switch>
            <Route path={[`${match.path}/list`]} component={List} />
            <Route path={[`${match.path}/:name/:id`]} component={View} />
          </Switch>
        </main>
      </div>
    );
  }
}
