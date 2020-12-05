import { addLocaleData } from 'react-intl';
import ruLang from './entries/ru-RU';
import enLang from './entries/en-US';
import esLang from './entries/es-ES';
import enRtlLang from './entries/en-US-rtl';

const AppLocale = {
    ru: ruLang,
    en: enLang,
    es: esLang,
    enrtl: enRtlLang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.es.data);
addLocaleData(AppLocale.enrtl.data);
addLocaleData(AppLocale.ru.data);

export default AppLocale;
