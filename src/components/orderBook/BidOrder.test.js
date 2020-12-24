import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BidOrder from './BidOrder';

configure({ adapter: new Adapter() });

describe('BidOrder', () => {
    it('should render row for bid order', () => {
        const props = {
            quantity: 10, price: 1000, maxCumulative: 100, cumulative: 50,
        };
        const orderWrapper = shallow(<BidOrder {...props} />);
        expect(orderWrapper.find('tr').length).toBe(1);
        expect(orderWrapper.find('td').length).toBe(5);
        expect(orderWrapper.find('td').map(node => node.text())).toEqual(['50', '10', '1000', '', '']);
        const firstCell = orderWrapper.find('td').first();
        expect(firstCell.prop('style')).toEqual({ backgroundSize: '50% 100%' });
        expect(firstCell.hasClass('fill-bid')).toBeTruthy();
    });

    it('should render correct percentage for zero cumulative quantity', () => {
        const props = {
            quantity: 10, price: 1000, maxCumulative: 100, cumulative: 0,
        };
        const orderWrapper = shallow(<BidOrder {...props} />);
        expect(orderWrapper.find('td').first().prop('style')).toEqual({ backgroundSize: '0% 100%' });
    });

    it('should not render negative percentage', () => {
        const props = {
            quantity: 10, price: 10000, maxCumulative: 100, cumulative: -50,
        };
        const orderWrapper = shallow(<BidOrder {...props} />);
        expect(orderWrapper.find('td').first().prop('style')).toEqual({ backgroundSize: '0% 100%' });
    });

    it('should not render percentage greater than 100%', () => {
        const props = {
            quantity: 10, price: 1000, maxCumulative: 100, cumulative: 110,
        };
        const orderWrapper = shallow(<BidOrder {...props} />);
        expect(orderWrapper.find('td').first().prop('style')).toEqual({ backgroundSize: '100% 100%' });
    });
});
