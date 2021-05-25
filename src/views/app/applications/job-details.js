import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Row,
    Nav,
    NavItem,
    Button,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    TabContent,
    TabPane,
    ButtonDropdown,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { mapOrder } from '../../../helpers/Utils';

import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import { getMarketPlaceList } from '../../../redux/actions';
const surveyData = [];

class MarketPlaceApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          jobid: this.props.match.params.jobid,
        };
    }


    render() {
      console.log('marketplacte items is ....', marketPlaceItems);
      console.log('job id is...', this.state.jobid);
        const { marketPlaceItems } = this.props.marketPlaceApp;
        const { user } = this.props.authUser;

        const job = marketPlaceItems.find(item => item._id === this.state.jobid)
        return (
            <>
            <Row className="app-row survey-app">
                  <Colxx xxs="12">
                      <h1>
                          <i className="simple-icon-refresh heading-icon" />
                            {' '}
                          <span className="align-middle d-inline-block pt-1">
                              {job.title}
                              </span>
                        </h1>
                        <Breadcrumb match={this.props.match} />
                  </Colxx>
          </Row>
          </>
        );
    }
}

const mapStateToProps = ({ authUser, marketPlaceApp }) => ({
  authUser,
  marketPlaceApp,
});
export default connect(
    mapStateToProps,
    {
        getMarketPlaceList,
    },
)(MarketPlaceApp);
