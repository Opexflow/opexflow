import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import menuTypes from './types';
import levels from './levels';

const UI = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/types`} />
            <Route path={`${match.url}/types`} component={menuTypes} />
            <Route path={`${match.url}/levels`} component={levels} />

            <Redirect to="/error" />
      </Switch>
  </div>
);
export default UI;
