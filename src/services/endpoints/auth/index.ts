import axiosInstance from '../../axios/';
import { ChangePasswordSchemaType, EmailSchemaType, RegisterSchemaType, TokenSchemaType } from './schema';
import { AuthSchema, AuthSchemaType } from './response';

export const registration = async (form: RegisterSchemaType): Promise<AuthSchemaType> => {
	const response = await axiosInstance.post('/auth/register', form);
	localStorage.setItem('tokens', JSON.stringify(response.data.decompressedData.tokens));
	return AuthSchema.parse(response.data.decompressedData);
};

export const login = async (form: EmailSchemaType): Promise<AuthSchemaType> => {
	console.log('form', form);
	const response = await axiosInstance.post('/auth/login', form);

	localStorage.setItem('tokens', JSON.stringify(response.data.decompressedData.tokens));
	return AuthSchema.parse(response.data.decompressedData);
};

export const checkEmail = async (form: EmailSchemaType): Promise<boolean> => {
	const response = await axiosInstance.post('/auth/checkEmail', form);
	localStorage.setItem('tokens', JSON.stringify(response.data.decompressedData.tokens));
	return response.data.decompressedData;
};

export const authWithSocialMedia = async (data: EmailSchemaType): Promise<AuthSchemaType | boolean> => {
	const response = await axiosInstance.post('auth/socialAuth', data);
	console.log('response', response);
	if (typeof response.data.decompressedData === 'boolean') {
		return response.data.decompressedData;
	}
	localStorage.setItem('tokens', JSON.stringify(response.data.decompressedData.tokens));
	return AuthSchema.parse(response.data.decompressedData);
};

export const refreshToken = async (token: TokenSchemaType): Promise<AuthSchemaType> => {
	const response = await axiosInstance.post('token/access-token', token);
	localStorage.setItem('tokens', JSON.stringify(response.data.decompressedData.tokens));
	return AuthSchema.parse(response.data.decompressedData);
};

export const changePassword = async (token: ChangePasswordSchemaType): Promise<boolean> => {
	const response = await axiosInstance.post('user/changePassword', token);
	return response.data;
};
