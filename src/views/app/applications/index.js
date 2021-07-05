import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import todoApp from './todo';
import surveyApp from './survey';
import surveyDetailApp from './survey-detail';
import chatApp from './chat';
import marketPlace from './marketPlace';
import jobDetails from './job-details';
import applyJob from './apply-job';
import martketPlaceChatApp from './martketPlaceChatApp';

const Applications = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/marketplace`} />
            <Route path={`${match.url}/todo`} component={todoApp} />
            <Route
                path={`${match.url}/survey/:surveyid`}
                component={surveyDetailApp}
                isExact
          />
            <Route path={`${match.url}/survey`} component={surveyApp} isExact />
            <Route path={`${match.url}/chat`} component={chatApp} />

          <Route
                path={`${match.url}/marketplace/chat`}
                component={martketPlaceChatApp}
                isExact
          />
            <Route
                path={`${match.url}/marketplace/apply/:jobid`}
                component={applyJob}
                isExact
          />
            <Route
                path={`${match.url}/marketplace/:jobid`}
                component={jobDetails}
                isExact
          />
            <Route path={`${match.url}/marketplace`} component={marketPlace} />
            <Redirect to="/error" />
      </Switch>
  </div>
);
export default Applications;
