import axiosInstance from '../../axios';

export const getMe = async () => {
	const response = await axiosInstance.get('/user/me');
};

export const getSettings = async () => {
	const response = await axiosInstance.get('/user/settings');
	console.log('response', response.data.decompressedData);
};
