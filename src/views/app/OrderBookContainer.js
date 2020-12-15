import React, { Component} from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';
import OrderBook from '../../components/orderBook/OrderBook';
import { getHost } from '../../helpers/Utils';
import openSocket from 'socket.io-client';

export default class OrderBookContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            askOrders: [],
            bidOrders: [],
        };
        this.socket = openSocket(getHost(""));
        this.handleData = this.handleData.bind(this);
    }

    handleOnLoadData(rawData) {
        const askOrders = [];
        const bidOrders = [];

        const glass = JSON.parse(rawData[0].glass);
        Object.entries(glass.asks).forEach(
            ([key, value]) => {
                askOrders.push({
                price: key,
                quantity: value,
            }) 
        });
        Object.entries(glass.bids).forEach(
            ([key, value]) => {
                bidOrders.push({
                price: key,
                quantity: value,
            }) 
        });
    
        this.setState({
            askOrders: askOrders,
            bidOrders: bidOrders
        });
    }

    handleData(rawData) {
        const askOrders = [];
        const bidOrders = [];

        // const glass = JSON.parse(rawData[0].glass);
        const obj = JSON.parse(rawData);
        const glass = obj[0].glass;
        const glassObj = JSON.parse(glass);
        Object.entries(glassObj.asks).forEach(
            ([key, value]) => {
                askOrders.push({
                price: key,
                quantity: value,
            }) 
        });
        Object.entries(glassObj.bids).forEach(
            ([key, value]) => {
                bidOrders.push({
                price: key,
                quantity: value,
            }) 
        });
    
        this.setState({
            askOrders: askOrders,
            bidOrders: bidOrders
        });
    }

    getOrderBookData(){
        try {
            var classInstance = this;
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
