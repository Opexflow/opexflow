import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OrderBook from './OrderBook';
import AskOrder from './AskOrder';

configure({ adapter: new Adapter() });

describe('OrderBook', () => {
    it('should not render empty table if the order book is empty', () => {
        const props = { askOrders: [], bidOrders: [] };
        const orderBookWrapper = shallow(<OrderBook {...props} />);
        expect(orderBookWrapper.find('table').length).toBe(0);
    });

    it('should render table when data is recieved', () => {
        const props = {
            askOrders: [
                { price: 100, quantity: 10 },
            ],
            bidOrders: [
                { price: 1000, quantity: 20 },
            ],
        };
        const orderBookWrapper = shallow(<OrderBook {...props} />);

        expect(orderBookWrapper.find(AskOrder).length).toBe(1);
        expect(orderBookWrapper.find(AskOrder).first().props()).toEqual({
            price: 100,
            quantity: 10,
            maxCumulative: 20,
            cumulative: 10,
        });
        expect(orderBookWrapper.find(AskOrder).at(0).props()).toEqual({
            price: 100,
            quantity: 10,
            maxCumulative: 20,
            cumulative: 10,
        });
    });
});
