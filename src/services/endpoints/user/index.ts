import axiosInstance from '../../axios';
import {
	ChangeMainSettingsSchemaType,
	GetChangeSkillsSchemaType,
	GetSettingsSchema,
	GetSettingsSchemaType,
} from './schema';
import { UserSchema, UserSchemaType } from './response';

export const getMe = async () => {
	const response = await axiosInstance.get('/user/me');
};

export const getSettings = async (): Promise<GetSettingsSchemaType> => {
	const response = await axiosInstance.get('/user/settings');
	return GetSettingsSchema.parse(response.data.decompressedData);
};

export const sendMainData = async (data: ChangeMainSettingsSchemaType): Promise<UserSchemaType> => {
	const response = await axiosInstance.post('/user/changeMainData', data);
	return UserSchema.parse(response.data.decompressedData);
};

export const sendSkills = async (data: GetChangeSkillsSchemaType): Promise<UserSchemaType> => {
	const response = await axiosInstance.post('/user/changeSkills', data);
	return UserSchema.parse(response.data.decompressedData);
};
