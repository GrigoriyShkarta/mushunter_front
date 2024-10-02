import axiosInstance from '../../axios';
import {
	ChangeDescriptionSchemaType,
	ChangeMainSettingsSchemaType,
	GetChangeSkillsSchemaType,
	GetSettingsSchema,
	GetSettingsSchemaType,
	ToggleLikeSchemaType,
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

export const sendDescription = async (data: ChangeDescriptionSchemaType): Promise<UserSchemaType> => {
	const response = await axiosInstance.post('/user/changeDescription', data);
	return UserSchema.parse(response.data.decompressedData);
};

export const getUser = async (data: { id: number }): Promise<UserSchemaType> => {
	const response = await axiosInstance.get('/user/getUser', {
		params: data,
	});
	return UserSchema.parse(response.data.decompressedData);
};

export const sendToggleLike = async (data: ToggleLikeSchemaType): Promise<UserSchemaType> => {
	const response = await axiosInstance.post('/user/like', data);
	console.log('response.data.decompressedData', response.data.decompressedData);
	return UserSchema.parse(response.data.decompressedData);
};
