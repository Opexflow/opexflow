import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import todoApp from './todo';
import surveyApp from './survey';
import surveyDetailApp from './survey-detail';

const Applications = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/todo`} />
            <Route path={`${match.url}/todo`} component={todoApp} />
            <Route
                path={`${match.url}/survey/:surveyid`}
                component={surveyDetailApp}
                isExact
          />
            <Route path={`${match.url}/survey`} component={surveyApp} isExact />
            <Redirect to="/error" />
      </Switch>
  </div>
);
export default Applications;
