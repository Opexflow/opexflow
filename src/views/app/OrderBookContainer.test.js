import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OrderBookContainer from './OrderBookContainer';

configure({ adapter: new Adapter() });

describe('<OrderBookContainer />', () => {
    it('should render component with correct props', () => {
        const wrapper = shallow(<OrderBookContainer />);

        expect(wrapper.exists()).toBeTruthy();
    });

    it('should render component same as snapshot', () => {
        const wrapper = shallow(<OrderBookContainer />);

        expect(wrapper.getElements()).toMatchSnapshot();
    });
});
