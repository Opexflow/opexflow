import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import IconCardsCarousel from '../../../containers/dashboards/IconCardsCarousel';
import RecentOrders from '../../../containers/dashboards/RecentOrders';
import Tickets from '../../../containers/dashboards/Tickets';
import Calendar from '../../../containers/dashboards/Calendar';
import Cakes from '../../../containers/dashboards/Cakes';
import SalesChartCard from '../../../containers/dashboards/SalesChartCard';
import ProductCategoriesDoughnut from '../../../containers/dashboards/ProductCategoriesDoughnut';

class EcommerceDashboard extends Component {
    render() {
        return (
            <>
            <Row>
                  <Colxx xxs="12">
                      <Breadcrumb heading="menu.ecommerce" match={this.props.match} />
                      <Separator className="mb-5" />
                    </Colxx>
                </Row>
            <Row>
                  <Colxx lg="12" xl="6">
                      <IconCardsCarousel />
                      <Row>
                          <Colxx md="12" className="mb-4">
                              <SalesChartCard />
                            </Colxx>
                        </Row>
                    </Colxx>
                  <Colxx lg="12" xl="6" className="mb-4">
                      <RecentOrders />
                    </Colxx>
                </Row>

            <Row>
                  <Colxx lg="4" md="12" className="mb-4">
                      <ProductCategoriesDoughnut chartClass="dashboard-donut-chart" />
                    </Colxx>
                  <Colxx lg="4" md="6" className="mb-4">
                      <Cakes />
                    </Colxx>
                  <Colxx lg="4" md="6" className="mb-4">
                      <Tickets />
                    </Colxx>
                </Row>

            <Row>
                  <Colxx xl="6" lg="12" className="mb-4">
                      <Calendar />
                    </Colxx>
                  <Colxx xl="6" lg="12" className="mb-4">
                      {/* <BestSellers /> */}
                    </Colxx>
                </Row>
          </>
        );
    }
}
export default injectIntl(EcommerceDashboard);
