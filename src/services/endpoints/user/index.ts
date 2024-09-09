import axiosInstance from '../../axios';

export const getMe = async () => {
	const response = await axiosInstance.get('/user/me');
	console.log('res', response);
};
