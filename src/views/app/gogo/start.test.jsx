import React from 'react';
import Enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import sinon from 'sinon';
import Start from './start';
import AppLocale from '../../../lang';

Enzyme.configure({ adapter: new Adapter() });

const didMount = sinon.spy();

describe('Start', () => {
    const locale = 'en';
    const currentAppLocale = AppLocale[locale];
    let container;

    beforeEach(() => {
        // setup a DOM element as a render target
        container = Enzyme.shallow(<Start />);
    });

    it('Should loading...', () => {
        expect(container.state()).toEqual({ loading: true });
    });

    it('Should loading Chart', () => {
        container.setState({ loading: false });
        expect(container.state()).toEqual({ loading: false });
    });

    it('Should change state', () => {
        container.setState({ loading: false });
        expect(container.state()).toEqual({ loading: false });
    });

    it('Should render snapshot', () => {
        const mount = Enzyme.render(<Start />);
        expect(toJson(container.setState({ loading: false }))).toMatchSnapshot();
    });
});
