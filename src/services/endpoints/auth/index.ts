import axiosInstance from '../../axios/';
import { LoginSchemaType, RegisterSchemaType } from './schema';

// interface Endpoints {
// 	login: (form: LoginDto) => Promise<AxiosResponse<AuthSchemaType>>;
// 	sendMailBeforeRegister: (form: RegisterDto) => Promise<AxiosResponse<string>>;
// 	register: (form: RegisterDto) => Promise<AxiosResponse<AuthSchemaType>>;
// 	forgotPassword: (email: { email: string }) => Promise<AxiosResponse<string>>;
// 	checkTempPassword: (form: CheckTempPasswordDto) => Promise<AxiosResponse<boolean>>;
// 	changePassword: (form: ChangePasswordDto) => Promise<AxiosResponse<boolean>>;
// }
// const endpoints = {
// 	// login: (form) => axiosInstance.post(`/auth/login`, form),
// 	// sendMailBeforeRegister: (form) => axiosInstance.post('/auth/sendMail', form),
// 	register: (form: RegisterSchemaType) => axiosInstance.post('/auth/register', form),
// 	// forgotPassword: (form: { email: string }) => axiosInstance.post('/auth/forgotPassword', form),
// 	// checkTempPassword: (form) => axiosInstance.post('/auth/checkTempPassword', form),
// 	// changePassword: (form) => axiosInstance.post('/auth/changePassword', form),
// };
//
// export default endpoints;
import { AuthSchema, AuthSchemaType } from './response';

export const registration = async (form: RegisterSchemaType): Promise<AuthSchemaType> => {
	const response = await axiosInstance.post('/auth/register', form);
	return AuthSchema.parse(response.data);
};

export const login = async (form: LoginSchemaType): Promise<AuthSchemaType> => {
	const response = await axiosInstance.post('/auth/login', form);
	return AuthSchema.parse(response.data);
};
