import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { Languages } from './shared/constants';

i18n
	.use(HttpBackend)
	.use(initReactI18next)
	.init({
		fallbackLng: Languages.UK,
		debug: true,
		interpolation: {
			escapeValue: false,
		},
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
		detection: {
			order: ['querystring', 'cookie', 'localStorage', 'navigator'],
			caches: ['cookie'],
		},
		supportedLngs: [Languages.EN, Languages.UK],
	});

export default i18n;
