import React from 'react';
import renderer from 'react-test-renderer';
import Start from '../src/views/app/gogo/start';
import {shallow} from 'enzyme';


describe("Start", () => {
    it("Should render chart", () => {
        const component = shallow(<Start/>);
        expect(component).toMatchSnapshot();
    })
});