import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import alertsUi from './alerts';
import badgesUi from './badges';
import buttonsUi from './buttons';
import cardsUi from './cards';
import carouselUi from './carousel';
import chartsUi from './charts';
import collapseUi from './collapse';
import dropdownsUi from './dropdowns';
import editorsUi from './editors';
import formLayoutsUi from './form-layouts';
import formComponentsUi from './form-components';
import formValidationsUi from './form-validations';
import iconsUi from './icons';
import inputGroupsUi from './input-groups';
import jumbotronUi from './jumbotron';
import mapsUi from './maps';
import modalUi from './modal';
import navigationUi from './navigation';
import popoverTooltipUi from './popover-tooltip';
import sortableUi from './sortable';
import tablesUi from './tables';

const UI = ({ match }) => (
  <div className="dashboard-wrapper">
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/alerts`} />
          <Route path={`${match.url}/alerts`} component={alertsUi} />
          <Route path={`${match.url}/badges`} component={badgesUi} />
          <Route path={`${match.url}/buttons`} component={buttonsUi} />
          <Route path={`${match.url}/cards`} component={cardsUi} />
          <Route path={`${match.url}/carousel`} component={carouselUi} />
          <Route path={`${match.url}/charts`} component={chartsUi} />
          <Route path={`${match.url}/collapse`} component={collapseUi} />
          <Route path={`${match.url}/dropdowns`} component={dropdownsUi} />
          <Route path={`${match.url}/editors`} component={editorsUi} />
          <Route path={`${match.url}/form-layouts`} component={formLayoutsUi} />
          <Route path={`${match.url}/form-components`} component={formComponentsUi} />
          <Route path={`${match.url}/form-validations`} component={formValidationsUi} />
          <Route path={`${match.url}/icons`} component={iconsUi} />
          <Route path={`${match.url}/input-groups`} component={inputGroupsUi} />
          <Route path={`${match.url}/jumbotron`} component={jumbotronUi} />
          <Route path={`${match.url}/maps`} component={mapsUi} />
          <Route path={`${match.url}/modal`} component={modalUi} />
          <Route path={`${match.url}/navigation`} component={navigationUi} />
          <Route path={`${match.url}/popover-tooltip`} component={popoverTooltipUi} />
          <Route path={`${match.url}/sortable`} component={sortableUi} />
          <Route path={`${match.url}/tables`} component={tablesUi} />
          <Redirect to="/error" />

        </Switch>
    </div>
);
export default UI;
