import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AskOrder from './AskOrder';

configure({ adapter: new Adapter() });

describe('AskOrder', () => {
    it('should render one row per ask order', () => {
        const props = {
            quantity: 10, price: 1000, maxCumulative: 100, cumulative: 50,
        };
        const orderWrapper = shallow(<AskOrder {...props} />);
        expect(orderWrapper.find('tr').length).toBe(1);
        expect(orderWrapper.find('td').length).toBe(5);
        expect(orderWrapper.find('td').map(node => node.text())).toEqual(['', '', '1000', '10', '50']);
        const lastCell = orderWrapper.find('td').last();
        expect(lastCell.prop('style')).toEqual({ backgroundSize: '50% 100%' });
        expect(lastCell.hasClass('fill-ask')).toBeTruthy();
    });

    it('should render 0 and 100 percentage for zero max cumulative', () => {
        const props = {
            quantity: 10, price: 1000, maxCumulative: 0, cumulative: 50,
        };
        const orderWrapper = shallow(<AskOrder {...props} />);
        expect(orderWrapper.find('td').last().prop('style')).toEqual({ backgroundSize: '0% 100%' });
    });

    it('should not render negative percentage', () => {
        const props = {
            quantity: 10, price: 1000, maxCumulative: -100, cumulative: 50,
        };
        const orderWrapper = shallow(<AskOrder {...props} />);
        expect(orderWrapper.find('td').last().prop('style')).toEqual({ backgroundSize: '0% 100%' });
    });

    it('should not render percentage greater than 100%', () => {
        const props = {
            quantity: 10, price: 1000, maxCumulative: 100, cumulative: 110,
        };
        const orderWrapper = shallow(<AskOrder {...props} />);
        expect(orderWrapper.find('td').last().prop('style')).toEqual({ backgroundSize: '100% 100%' });
    });
});
