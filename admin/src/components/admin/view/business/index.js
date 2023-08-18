import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import View from './view';
import Edit from './edit';
import Create from './create';

export default class Businessdetails extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={View} />
                        <Route path={[`${match.path}/edit/:id`]} component={Edit} />
                        <Route path={[`${match.path}/create`]} component={Create} />
                    </Switch>
                </main>
            </div>
        );
    }
}