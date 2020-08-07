import React from 'react';
import renderer from 'react-test-renderer';
import Start from '../src/views/app/gogo/start';


describe("Start", () => {
    it("Should render chart", () => {
        const component = renderer.create(<Start/>);
        expect(component).toMatchSnapshot();
    })
});