import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import List from "./list";
export default class Allparlour extends Component {
  render() {
    const { match } = this.props;
    return (
      <main>
        <Switch>
          <Route path={[`${match.path}/list`]} component={List} />
        </Switch>
      </main>
    );
  }
}
