import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Create from './create';
import List from './list';

export default class Coupon extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={List} />
                        {/* <Route path={[`${match.path}/edit/:id`]} component={Edit} /> */}
                        <Route path={[`${match.path}/create`]} component={Create} />
                    </Switch>
                </main>
            </div>
        );
    }
}