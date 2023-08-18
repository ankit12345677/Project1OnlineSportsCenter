import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import List from './list';
import Create from './create';
import Edit from './edit';
export default class Allparlour extends Component {
    render() {
        const { match } = this.props;
        return (
            <main>
                <Switch>
                    <Route path={[`${match.path}/list`]} component={List} />
                    <Route path={[`${match.path}/create`]} component={Create} />
                    <Route path={[`${match.path}/edit/:id`]} component={Edit} />
                </Switch>
            </main>
        );
    }
}