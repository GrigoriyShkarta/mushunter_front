import axiosInstance from '../../axios';
import { ChangeMainSettingsSchemaType, GetSettingsSchema, GetSettingsSchemaType } from './schema';
import { UserSchema, UserSchemaType } from './response';

export const getMe = async () => {
	const response = await axiosInstance.get('/user/me');
};

export const getSettings = async (): Promise<GetSettingsSchemaType> => {
	const response = await axiosInstance.get('/user/settings');
	return GetSettingsSchema.parse(response.data.decompressedData);
};

export const sendMainData = async (data: ChangeMainSettingsSchemaType): Promise<UserSchemaType> => {
	console.log('data', data);
	const response = await axiosInstance.post('/user/changeMainData', data);
	console.log('res', response.data.decompressedData);
	return UserSchema.parse(response.data.decompressedData);
};
