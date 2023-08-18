import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import List from "./list";
import Create from "./create";

export default class ParlourService extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={[`${match.path}/list`]} component={List} />
        <Route path={[`${match.path}/create`]} component={Create} />
      </Switch>
    );
  }
}
