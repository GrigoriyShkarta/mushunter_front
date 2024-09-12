import axios from 'axios';
import i18n from 'i18next';
import pako from 'pako';
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
				try {
					token = await refreshToken(parsedTokens.refreshToken);
				} catch (e) {
					throw new Error(e);
				}
			}
			config.headers.Authorization = `Bearer ${token}`;
		}
		config.headers['Accept-Language'] = i18n.language;

		if (config.data) {
			config.data = pako.deflate(JSON.stringify(config.data));
			config.headers['Content-Type'] = 'application/octet-stream';
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response) => {
		if (response.data && response.data.compressedData) {
			const compressedData = response.data.compressedData;
			const uint8Array = new Uint8Array(Object.values(compressedData));
			const decompressedData = pako.inflate(uint8Array, { to: 'string' });
			response.data.decompressedData = JSON.parse(decompressedData);
			delete response.data.compressedData;
		}
		return response;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default axiosInstance;
