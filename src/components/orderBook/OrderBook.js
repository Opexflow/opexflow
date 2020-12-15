// import R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap';
import AskOrder from './AskOrder';
import BidOrder from './BidOrder';
import { sumQuantities } from '../../helpers/Utils';

function renderOrders(ComponentClass, orders, maxCumulative) {
  let cumulative = 0;
  return orders.map((order, index) => {
    order.cumulative = (cumulative += order.quantity);
    order.maxCumulative = maxCumulative;
    return (<ComponentClass key={index} {...order} />);
  });
}

class OrderBook extends React.Component {

  render () {

    let totalAsks = sumQuantities(this.props.askOrders);
    let totalBids = sumQuantities(this.props.bidOrders);
    let maxCumulative = Math.max(totalAsks, totalBids);

    let deepCopyArrayOfObj = (arr => arr.map(order => Object.assign({}, order)));

    // Deep copy and sort orders
    let askOrders = deepCopyArrayOfObj(this.props.askOrders).sort((a, b) => a.price > b.price); // ascending order
    let bidOrders = deepCopyArrayOfObj(this.props.bidOrders).sort((a, b) => a.price < b.price); // descending order

    return (
      <div className="OrderBook">
        <Table hover responsive borderless size="sm">
          <thead>
            <tr>
              <th>{"Bid Cumulative"}</th>
              <th>{"Bid Quantity"}</th>
              <th>{"Price(USD)"}</th>
              <th>{"Ask Quantity"}</th>
              <th>{"Ask Cumulative"}</th>
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
  bidOrders: PropTypes.array
};

export default OrderBook;
