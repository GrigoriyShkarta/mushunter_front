import axios from 'axios';
import i18n from 'i18next';
import { isTokenExpired } from '../../shared/helpers/checkTokenExpired.ts';
import { refreshToken } from '../endpoints/auth';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:4200',
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const tokens = localStorage.getItem('tokens');
		if (tokens) {
			const parsedTokens = JSON.parse(tokens);
			let token = parsedTokens.accessToken;
			if (isTokenExpired(parsedTokens.accessToken)) {
				token = await refreshToken(parsedTokens.refreshToken);
			}
			config.headers.Authorization = `Bearer ${token}`;
		}
		config.headers['Accept-Language'] = i18n.language;
		return config;
	},
	(error) => {
		Promise.reject(error);
	},
);

export default axiosInstance;
