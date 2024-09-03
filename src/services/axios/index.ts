import axios from 'axios';
import i18n from 'i18next';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:4200',
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem('access_token');
		if (token) {
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
