import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../../services/api";
import { FinishRegisterDto, LoginDto } from '../../../services/endpoints/auth/dto';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../../../services/endpoints/auth/response';

export const login = createAsyncThunk(
	'login',
	async function(data: LoginDto, { rejectWithValue }): Promise<AuthResponse> {
		try {
			const res= await api.auth.login(data);
			localStorage.setItem('access_token', res.data.tokens.accessToken);
			localStorage.setItem('refresh_token', res.data.tokens.refreshToken);
			return res.data;
		} catch (error) {
			console.log(error);
			throw rejectWithValue(error.response.data.message);
		}
	}
);

export const registration = createAsyncThunk(
	'register',
	async function(data: FinishRegisterDto, { rejectWithValue }): Promise<AuthResponse> {
		try {
			const res: AxiosResponse<AuthResponse> = await api.auth.register(data);
			localStorage.setItem('access_token', res.data.tokens.accessToken);
			localStorage.setItem('refresh_token', res.data.tokens.refreshToken);
			return res.data;
		} catch (error) {
			console.log(error);
			throw rejectWithValue(error.response.data.message);
		}
	}
);


// export const getUser = createAsyncThunk(
// 	'userSlice/getUser',
// 	async function(id: number, {rejectWithValue}) {
// 		try {
// 			const res = await api.user.getUserById(id);
// 			return res.data;
// 		} catch (error: any) {
// 			if (error.response.status === 401) {
// 				return rejectWithValue('401');
// 			}
// 			throw error;
// 		}
// 	}
// );