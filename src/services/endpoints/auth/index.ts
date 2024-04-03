import { AxiosResponse } from "axios"

import axiosInstance from "../../axios/";
import { AuthResponse } from './response';
import { ChangePasswordDto, CheckTempPasswordDto, FinishRegisterDto, LoginDto, RegisterDto } from './dto';

interface Endpoints {
	login: (form: LoginDto) => Promise<AxiosResponse<AuthResponse>>;
	sendMailBeforeRegister: (form: RegisterDto) => Promise<AxiosResponse<string>>;
	register: (form: FinishRegisterDto) => Promise<AxiosResponse<AuthResponse>>;
	forgotPassword: (email: {email: string}) => Promise<AxiosResponse<string>>;
	checkTempPassword: (form: CheckTempPasswordDto) => Promise<AxiosResponse<boolean>>;
	changePassword: (form: ChangePasswordDto) => Promise<AxiosResponse<boolean>>;
}

const endpoints: Endpoints = {
	login: (form) => axiosInstance.post(`/auth/login`, form),
	sendMailBeforeRegister: (form) => axiosInstance.post('/auth/sendMail', form),
	register: (form) => axiosInstance.post('/auth/register', form),
	forgotPassword: (form: {email: string}) => axiosInstance.post('/auth/forgotPassword', form),
	checkTempPassword: (form) => axiosInstance.post('/auth/checkTempPassword', form),
	changePassword: (form) => axiosInstance.post('/auth/changePassword', form)
}

export default endpoints;