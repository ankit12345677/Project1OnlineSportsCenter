import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Allshop from './All-Shop';
import Createshop from './Add-Shop';
import Edit from './edit';

export default class Shop extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={Allshop} />
                        <Route path={[`${match.path}/create`]} component={Createshop} />
                        <Route path={[`${match.path}/edit`]} component={Edit} />
                    </Switch>
                </main>
            </div>
        );
    }
}