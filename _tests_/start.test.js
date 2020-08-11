import React from 'react';
/* import renderer from 'react-test-renderer'; */
import { shallow } from 'enzyme';
import Start from '../src/views/app/gogo/start';

describe('Start', () => {
    it('Should render chart', () => {
        const component = shallow(<Start />);
        const Chart = component.find('Chart');
        expect(Chart.length).toBeDefined();
    });
});
