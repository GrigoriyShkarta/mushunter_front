import {IUser} from "../../../shared/models/user.ts";
import { createSlice } from '@reduxjs/toolkit';
import { login, registration } from './actionCreators.ts';
import { Statuses } from '../../../shared/constants';

interface Error {
	code: number;
	message: string
}

interface IUserSlice {
	user: IUser | null;
	status: null | Statuses;
	error: string;
}

const initialState: IUserSlice = {
	user: null,
	status: null,
	error: '',
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		exitProfile (state: IUserSlice) {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state: IUserSlice): void => {
			state.user = null;
			state.status = Statuses.LOADING;
			state.error = ''
		});
		// builder.addCase(login.fulfilled, (state: IUserSlice, action): void => {
		// 	const { user } = action.payload;
		// 	state.user = user;
		// 	state.status = Statuses.LOADED;
		// 	state.error = '';
		// });
		builder.addCase(login.rejected, (state: IUserSlice, action): void => {
			state.user = null;
			state.status = Statuses.ERROR;
			state.error = <string>action.payload;
		});
		builder.addCase(registration.pending, (state: IUserSlice): void => {
			state.user = null;
			state.status = Statuses.LOADING;
			state.error = '';
		});
		builder.addCase(registration.fulfilled, (state: IUserSlice, action): void => {
			console.log('ac', action);
			const { user } = action.payload;
			state.user = user;
			state.status = Statuses.LOADED;
			state.error = '';
		});
		builder.addCase(registration.rejected, (state: IUserSlice, action): void => {
			state.user = null;
			state.status = Statuses.ERROR;
			state.error = action.payload;
		});
	},
});

export default userSlice.reducer;