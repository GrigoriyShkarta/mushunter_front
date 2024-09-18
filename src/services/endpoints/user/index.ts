import axiosInstance from '../../axios';
import { GetSettingsSchema, GetSettingsSchemaType } from './schema';

export const getMe = async () => {
	const response = await axiosInstance.get('/user/me');
};

export const getSettings = async (): Promise<GetSettingsSchemaType> => {
	const response = await axiosInstance.get('/user/settings');
	return GetSettingsSchema.parse(response.data.decompressedData);
};
