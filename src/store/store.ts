import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user/userSlice.ts';

const rootReducer = combineReducers({
	userSlice,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof rootReducer>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type AppDispatch = AppStore['dispatch'];