import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import AskOrder from './AskOrder';
import BidOrder from './BidOrder';
import { sumQuantities } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';

function renderOrders(ComponentClass, orders, maxCumulative) {
    let cumulative = 0;
    return orders.map((order, index) => {
        order.cumulative = (cumulative += order.quantity);
        order.maxCumulative = maxCumulative;
        return (<ComponentClass key={index} {...order} />);
    });
}

class OrderBook extends React.Component {
    render() {
        const totalAsks = sumQuantities(this.props.askOrders);
        const totalBids = sumQuantities(this.props.bidOrders);
        const maxCumulative = Math.max(totalAsks, totalBids);

        const deepCopyArrayOfObj = (arr => arr.map(order => ({ ...order })));

        // Deep copy and sort orders
        const askOrders = deepCopyArrayOfObj(this.props.askOrders).sort((a, b) => a.price > b.price); // ascending order
        const bidOrders = deepCopyArrayOfObj(this.props.bidOrders).sort((a, b) => a.price < b.price); // descending order

        return (
          <div className="OrderBook">
              <Table hover responsive borderless size="sm">
                  <thead>
                      <tr>
                          <th><IntlMessages id="Bid Cumulative" /></th>
                          <th><IntlMessages id="Bid Quantity" /></th>
                          <th><IntlMessages id="Price" /></th>
                          <th><IntlMessages id="Ask Quantity" /></th>
                          <th><IntlMessages id="Ask Cumulative" /></th>
                        </tr>
                    </thead>
                  <tbody>
                      {renderOrders(AskOrder, askOrders, maxCumulative).reverse()}
                    </tbody>
                  <tbody>
                      {renderOrders(BidOrder, bidOrders, maxCumulative)}
                    </tbody>
                </Table>
            </div>
        );
    }
}
OrderBook.propTypes = {
    askOrders: PropTypes.array,
    bidOrders: PropTypes.array,
};

export default OrderBook;
