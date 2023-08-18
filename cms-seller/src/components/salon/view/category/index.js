import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Create from "./create";
import CategoryList from "./categoryLIst";

export default class Category extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={[`${match.path}/list`]} component={CategoryList} />
        <Route path={[`${match.path}/create`]} component={Create} />
      </Switch>
    );
  }
}
