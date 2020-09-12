import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import dataListPages from './data-list';
import thumbListPages from './thumb-list';
import imageListPages from './image-list';
import detailsPages from './details';
import searchPages from './search';
import mailingPages from './mailing';
import invoicePages from './invoice';

const Pages = ({ match }) => (
  <div className="dashboard-wrapper">
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/data-list`} />
          <Route path={`${match.url}/data-list`} component={dataListPages} />
          <Route path={`${match.url}/thumb-list`} component={thumbListPages} />
          <Route path={`${match.url}/image-list`} component={imageListPages} />
          <Route path={`${match.url}/details`} component={detailsPages} />
          <Route path={`${match.url}/search`} component={searchPages} />
          <Route path={`${match.url}/mailing`} component={mailingPages} />
          <Route path={`${match.url}/invoice`} component={invoicePages} />
          <Redirect to="/error" />

        </Switch>
    </div>
);
export default Pages;
