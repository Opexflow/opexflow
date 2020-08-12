import React from 'react';
import renderer from 'react-test-renderer';
import Start from './start';
import { IntlProvider } from 'react-intl';
import AppLocale from '../../../lang';

const locale = 'en';
const currentAppLocale = AppLocale[locale];

describe("Start", () => {
    it("Should render chart", () => {
        const component = renderer.create(
        <IntlProvider locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <Start/>
        </IntlProvider>).toJSON();
        expect(component).toMatchSnapshot();
    })
});
