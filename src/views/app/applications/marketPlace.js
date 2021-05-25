import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
  ButtonDropdown,
  CustomInput,
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../helpers/IntlMessages';
import { getMarketPlaceList } from '../../../redux/actions';

import AddNewMarketPlaceModal from '../../../containers/applications/AddNewMarketPlaceModal';
import MarketPlaceItem from '../../../components/applications/MarketPlaceItem';

class MarketPlace extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };  
  }

  componentDidMount() {
    this.props.getMarketPlaceList();
  }

  toggleModal = () => {
    this.setState({
        modalOpen: !this.state.modalOpen,
    });
  };

  render() {

    const { marketPlaceItems, loading, selectedItems } = this.props.marketPlaceApp;

    const { user } = this.props.authUser;
    const { modalOpen } = this.state;
    return (
      <>
        <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.marketplace" />
            </h1>

            <div className="float-sm-right">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={this.toggleModal}
            >
              <IntlMessages id="todo.add-new" />
            </Button>
            {' '}
            </div>
            <Breadcrumb match={this.props.match} />
          </div>
          <Separator className="mb-5" />
            <Row>
              {loading ? (
                marketPlaceItems.map((item, index) => (
                  <MarketPlaceItem
                    key={`market_place_item_${index}`}
                    item={item}
                    handleCheckChange={this.handleCheckChange}
                    isSelected={
                      loading ? selectedItems.includes(item.id) : false
                    }
                  />
                ))
              ) : (
                <div className="loading" />
              )}
              </Row>
        </Colxx>
        </Row>
        <AddNewMarketPlaceModal
          user={user}
          toggleModal={this.toggleModal}
          modalOpen={modalOpen} />
      </>
    );

  }

}

const mapStateToProps = ({ authUser, marketPlaceApp }) => ({
  marketPlaceApp,
  authUser
});

export default injectIntl(
  connect(mapStateToProps, {getMarketPlaceList} )(MarketPlace),
);