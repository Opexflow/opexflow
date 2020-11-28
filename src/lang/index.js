import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import esLang from './entries/es-ES';
import enRtlLang from './entries/en-US-rtl';
import ruLang from './entries/ru-RU';

const AppLocale = {
    en: enLang,
    es: esLang,
    enrtl: enRtlLang,
	ru: ruLang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.es.data);
addLocaleData(AppLocale.enrtl.data);
addLocaleData(AppLocale.ru.data);

export default AppLocale;
