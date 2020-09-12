import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import thirdLevel1 from './third-level-1';
import thirdLevel2 from './third-level-2';
import thirdLevel3 from './third-level-3';

const MenuLevels = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/third-level-1`} />
            <Route path={`${match.url}/third-level-1`} component={thirdLevel1} />
            <Route path={`${match.url}/third-level-2`} component={thirdLevel2} />
            <Route path={`${match.url}/third-level-3`} component={thirdLevel3} />

            <Redirect to="/error" />
      </Switch>
  </div>
);
export default MenuLevels;
