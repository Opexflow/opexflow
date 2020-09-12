import React, { Component } from 'react';
import {
    Row,
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    Nav,
    NavItem,
    TabContent,
    TabPane,
    Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import classnames from 'classnames';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';

class TabCardExamples extends Component {
    constructor(props) {
        super(props);

        this.toggleFirstTab = this.toggleFirstTab.bind(this);
        this.toggleSecondTab = this.toggleSecondTab.bind(this);
        this.state = {
            activeFirstTab: '1',
            activeSecondTab: '1',
        };
    }

    toggleFirstTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab,
            });
        }
    }

    toggleSecondTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeSecondTab: tab,
            });
        }
    }

    render() {
        return (
            <Row>
                <Colxx xxs="12">
                    <CardTitle className="mb-4">
                        <IntlMessages id="cards.tab-card" />
                  </CardTitle>
                    <Row>
                        <Colxx xxs="12" xs="6" lg="3">
                            <Card className="mb-4">
                                <CardHeader>
                                    <Nav tabs className="card-header-tabs ">
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.activeFirstTab === '1',
                                                    'nav-link': true,
                                                })}
                                                onClick={() => {
                                                    this.toggleFirstTab('1');
                                                }}
                                                to="#"
                                          >
                                              Tab 1
                                          </NavLink>
                                      </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.activeFirstTab === '2',
                                                    'nav-link': true,
                                                })}
                                                onClick={() => {
                                                    this.toggleFirstTab('2');
                                                }}
                                                to="#"
                                          >
                                              Tab 2
                                          </NavLink>
                                      </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.activeFirstTab === '3',
                                                    'nav-link': true,
                                                })}
                                                onClick={() => {
                                                    this.toggleFirstTab('3');
                                                }}
                                                to="#"
                                          >
                                              Tab 3
                                          </NavLink>
                                      </NavItem>
                                  </Nav>
                              </CardHeader>

                                <TabContent activeTab={this.state.activeFirstTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Colxx sm="12">
                                                <CardBody>
                                                    <CardTitle className="mb-4">
                                                    Homemade Cheesecake with Fresh Berries and Mint
                                                    </CardTitle>
                                                    <Button outline size="sm" color="primary">
                                                    Edit
                                                    </Button>
                                              </CardBody>
                                          </Colxx>
                                      </Row>
                                  </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Colxx sm="12">
                                                <CardBody>
                                                    <CardTitle className="mb-4">
                                                    Wedding Cake with Flowers Macarons and Blueberries
                                                    </CardTitle>
                                                    <Button outline size="sm" color="primary">
                                                    Edit
                                                    </Button>
                                              </CardBody>
                                          </Colxx>
                                      </Row>
                                  </TabPane>
                                    <TabPane tabId="3">
                                        <Row>
                                            <Colxx sm="12">
                                                <CardBody>
                                                    <CardTitle className="mb-4">
                                                    Cheesecake with Chocolate Cookies and Cream Biscuits
                                                    </CardTitle>
                                                    <Button outline size="sm" color="primary">
                                                    Edit
                                                    </Button>
                                              </CardBody>
                                          </Colxx>
                                      </Row>
                                  </TabPane>
                              </TabContent>
                          </Card>
                      </Colxx>

                        <Colxx xxs="12" xs="6" lg="3">
                            <Card className="mb-4">
                                <CardHeader className="pl-0 pr-0">
                                    <Nav tabs className=" card-header-tabs  ml-0 mr-0">
                                        <NavItem className="w-50 text-center">
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.activeSecondTab === '1',
                                                    'nav-link': true,
                                                })}
                                                onClick={() => {
                                                    this.toggleSecondTab('1');
                                                }}
                                                to="#"
                                          >
                                              Tab 1
                                          </NavLink>
                                      </NavItem>
                                        <NavItem className="w-50 text-center">
                                            <NavLink
                                                className={classnames({
                                                    active: this.state.activeSecondTab === '2',
                                                    'nav-link': true,
                                                })}
                                                onClick={() => {
                                                    this.toggleSecondTab('2');
                                                }}
                                                to="#"
                                          >
                                              Tab 2
                                          </NavLink>
                                      </NavItem>
                                  </Nav>
                              </CardHeader>

                                <TabContent activeTab={this.state.activeSecondTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Colxx sm="12">
                                                <CardBody>
                                                    <CardTitle className="mb-4">
                                                    Homemade Cheesecake with Fresh Berries and Mint
                                                    </CardTitle>
                                                    <Button outline size="sm" color="primary">
                                                    Edit
                                                    </Button>
                                              </CardBody>
                                          </Colxx>
                                      </Row>
                                  </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Colxx sm="12">
                                                <CardBody>
                                                    <CardTitle className="mb-4">
                                                    Wedding Cake with Flowers Macarons and Blueberries
                                                    </CardTitle>
                                                    <Button outline size="sm" color="primary">
                                                    Edit
                                                    </Button>
                                              </CardBody>
                                          </Colxx>
                                      </Row>
                                  </TabPane>
                                    <TabPane tabId="3">
                                        <Row>
                                            <Colxx sm="12">
                                                <CardBody>
                                                    <CardTitle className="mb-4">
                                                    Cheesecake with Chocolate Cookies and Cream Biscuits
                                                    </CardTitle>
                                                    <Button outline size="sm" color="primary">
                                                    Edit
                                                    </Button>
                                              </CardBody>
                                          </Colxx>
                                      </Row>
                                  </TabPane>
                              </TabContent>
                          </Card>
                      </Colxx>
                  </Row>
              </Colxx>
          </Row>
        );
    }
}

export default TabCardExamples;
