import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import List from "./list";
import Createproduct from "./new-add";
import Edit from "./edit";

export default class ProductHistory extends Component {
  render() {
    const { match } = this.props;
    return (
      <div id="layoutSidenav_content">
        <main>
          <Switch>
            <Route path={[`${match.path}/list/history`]} component={List} />
            <Route path={[`${match.path}/edit/:id`]} component={Edit} />
            <Route path={[`${match.path}/create`]} component={Createproduct} />
          </Switch>
        </main>
      </div>
    );
  }
}
