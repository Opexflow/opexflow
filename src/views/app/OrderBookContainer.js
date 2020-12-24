import React, { Component } from 'react';
import { Row } from 'reactstrap';
import openSocket from 'socket.io-client';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import OrderBook from '../../components/orderBook/OrderBook';
import { getHost } from '../../helpers/Utils';

export default class OrderBookContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            askOrders: [],
            bidOrders: [],
        };
        this.socket = openSocket(getHost(''), {
            path: '/api/socket/data',
        });
        this.handleData = this.handleData.bind(this);
    }

    getBidAskOrders(data) {
        const order = [];

        Object.entries(data).forEach(
            ([key, value]) => {
                order.push({
                    price: Number(key),
                    quantity: Number(value),
                });
            },
        );

        return order;
    }

    handleOnLoadData(rawData) {
        const glass = JSON.parse(rawData[0].glass);

        this.setState({
            askOrders: this.getBidAskOrders(glass.asks),
            bidOrders: this.getBidAskOrders(glass.bids),
        });
    }

    handleData(rawData) {
        const obj = JSON.parse(rawData);
        const { glass } = obj[0];
        const glassObj = JSON.parse(glass);

        this.setState({
            askOrders: this.getBidAskOrders(glassObj.asks),
            bidOrders: this.getBidAskOrders(glassObj.bids),
        });
    }

    getOrderBookData() {
        try {
            const classInstance = this;
            const x = new XMLHttpRequest();
            x.open('GET', getHost('api/order-book'), true);
            x.onload = function() {
                const res = x.responseText && JSON.parse(x.responseText);
                classInstance.handleOnLoadData(res);
            };
            x.withCredentials = true;
            x.send();
        } catch (Error) {
            console.log('Error while fetching order book data : ', Error);
        }
    }

    componentDidMount() {
        this.getOrderBookData();
        this.socket.on('order-book:glass', this.handleData.bind(this));
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        return (
            <>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.order-book" match={this.props.match} />
                        <Separator className="mb-5" />
                  </Colxx>
              </Row>
                <Row>
                    <OrderBook askOrders={this.state.askOrders} bidOrders={this.state.bidOrders} />
              </Row>
          </>
        );
    }
}
