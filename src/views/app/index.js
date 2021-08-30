import React, { Component } from 'react';
import {
    Route, withRouter, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import dashboards from './dashboards';
import bots from './bots';
import pages from './pages';
import applications from './applications';
import ui from './ui';
import menu from './menu';
import OrderBookContainer from './OrderBookContainer';
import Commands from './commands';
import blankPage from './blank-page';

class App extends Component {
    render() {
        const { match } = this.props;

        return (
            <AppLayout>
                <Switch>
                    <Redirect exact from={`${match.url}/`} to={`${match.url}/applications/marketplace`} />
                    <Redirect exact from={`${match.url}/`} to={`${match.url}/bots`} />
                    <Route path={`${match.url}/dashboards`} component={dashboards} />
                    <Route path={`${match.url}/bots`} component={bots} />
                    <Route path={`${match.url}/applications`} component={applications} />
                    <Route path={`${match.url}/pages`} component={pages} />
                    <Route path={`${match.url}/ui`} component={ui} />
                    <Route path={`${match.url}/menu`} component={menu} />
                    <Route path={`${match.url}/order-book`} component={OrderBookContainer} />
                    <Route path={`${match.url}/commands`} component={Commands} />
                    <Route path={`${match.url}/blank-page`} component={blankPage} />
                    <Redirect to="/error" />
              </Switch>
          </AppLayout>
        );
    }
}
const mapStateToProps = ({ menu }) => {
    const { containerClassnames } = menu;
    return { containerClassnames };
};

export default withRouter(
    connect(
        mapStateToProps,
        {},
    )(App),
);
