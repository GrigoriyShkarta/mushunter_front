import axiosInstance from '../../axios/';
import { EmailSchemaType, LoginSchemaType, RegisterSchemaType, TokenSchemaType } from './schema';
import { AuthSchema, AuthSchemaType } from './response';

export const registration = async (form: RegisterSchemaType): Promise<AuthSchemaType> => {
	const response = await axiosInstance.post('/auth/register', form);
	localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
	return AuthSchema.parse(response.data);
};

export const login = async (form: LoginSchemaType): Promise<AuthSchemaType> => {
	const response = await axiosInstance.post('/auth/login', form);
	localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
	return AuthSchema.parse(response.data);
};

export const checkEmail = async (form: EmailSchemaType): Promise<boolean> => {
	const response = await axiosInstance.post('/auth/checkEmail', form);
	localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
	return response.data;
};

export const authWithSocialMedia = async (email: EmailSchemaType): Promise<AuthSchemaType | boolean> => {
	const response = await axiosInstance.post('auth/socialAuth', email);
	if (typeof response.data === 'boolean') {
		return response.data;
	}
	localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
	return AuthSchema.parse(response.data);
};

export const refreshToken = async (token: TokenSchemaType): Promise<AuthSchemaType> => {
	const response = await axiosInstance.post('token/access-token', token);
	localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
	return response.data;
};
