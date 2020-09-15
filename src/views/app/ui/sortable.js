import React, { Component } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { Sortable } from 'react-sortablejs';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

export default class SortableUi extends Component {
    render() {
        return (
            <>
            <Row>
                  <Colxx xxs="12">
                      <Breadcrumb heading="menu.sortable" match={this.props.match} />
                      <Separator className="mb-5" />
                    </Colxx>
                </Row>
            <Row>
                  <Colxx xxs="12">
                      <h5 className="mb-4">
                          <IntlMessages id="sortable.columns" />
                        </h5>

                      <Sortable className="row icon-cards-row mb-2">
                          <Colxx xxs="6" sm="4" md="3" className="mb-4">
                              <Card>
                                  <CardBody className="text-center">
                                      <i className="iconsminds-clock" />
                                      <p className="card-text font-weight-semibold mb-0">
                                          Pending Orders
                                        </p>
                                      <p className="lead text-center">14</p>
                                    </CardBody>
                                </Card>
                            </Colxx>

                          <Colxx xxs="6" sm="4" md="3" className="mb-4">
                              <Card>
                                  <CardBody className="text-center">
                                      <i className="iconsminds-basket-coins" />
                                      <p className="card-text font-weight-semibold mb-0">
                                          Completed Orders
                                        </p>
                                      <p className="lead text-center">32</p>
                                    </CardBody>
                                </Card>
                            </Colxx>
                          <Colxx xxs="6" sm="4" md="3" className="mb-4">
                              <Card>
                                  <CardBody className="text-center">
                                      <i className="iconsminds-arrow-refresh" />
                                      <p className="card-text font-weight-semibold mb-0">
                                          Refund Requests
                                        </p>
                                      <p className="lead text-center">74</p>
                                    </CardBody>
                                </Card>
                            </Colxx>
                          <Colxx xxs="6" sm="4" md="3" className="mb-4">
                              <Card>
                                  <CardBody className="text-center">
                                      <i className="iconsminds-mail-read" />
                                      <p className="card-text font-weight-semibold mb-0">
                                          New Comments
                                        </p>
                                      <p className="lead text-center">25</p>
                                    </CardBody>
                                </Card>
                            </Colxx>
                        </Sortable>
                    </Colxx>
                </Row>

            <Row>
                  <Colxx xxs="12">
                      <h5 className="mb-4">
                          <IntlMessages id="sortable.basic" />
                        </h5>

                      <Card className="mb-4">
                          <CardBody>
                              <Sortable tag="ul" className="list-unstyled">
                                  <li>
                                      <p>1. Angel Cake</p>
                                    </li>
                                  <li>
                                      <p>2. Bibingka</p>
                                    </li>
                                  <li>
                                      <p>3. Cremeschnitte</p>
                                    </li>
                                  <li>
                                      <p>4. Faworki</p>
                                    </li>
                                </Sortable>
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>

            <Row>
                  <Colxx xxs="12">
                      <h5 className="mb-4">
                          <IntlMessages id="sortable.handles" />
                        </h5>
                      <Card className="mb-4">
                          <CardBody>
                              <Sortable
                                  tag="ul"
                                  className="list-unstyled"
                                  options={{
                                        handle: '.handle',
                                    }}
                                >
                                  <li>
                                      <p>
                                          <span className="badge badge-pill badge-secondary handle mr-1">
                                              <i className="simple-icon-cursor-move" />
                                            </span>
                                          <span>Angel Cake</span>
                                        </p>
                                    </li>
                                  <li>
                                      <p>
                                          <span className="badge badge-pill badge-secondary handle mr-1">
                                              <i className="simple-icon-cursor-move" />
                                            </span>
                                          Bibingka
                                        </p>
                                    </li>
                                  <li>
                                      <p>
                                          <span className="badge badge-pill badge-secondary handle mr-1">
                                              <i className="simple-icon-cursor-move" />
                                            </span>
                                          Cremeschnitte
                                        </p>
                                    </li>
                                  <li>
                                      <p>
                                          <span className="badge badge-pill badge-secondary handle mr-1">
                                              <i className="simple-icon-cursor-move" />
                                            </span>
                                          Faworki
                                        </p>
                                    </li>
                                </Sortable>
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>

          </>
        );
    }
}
