import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Sber from './sber';

const Dashboards = ({ match }) => (
  <div className="dashboard-wrapper">
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/sber`} />
          <Route path={`${match.url}/sber`} component={Sber} />
          <Redirect to="/error" />

        </Switch>
    </div>
);
export default Dashboards;
