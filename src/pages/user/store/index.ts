import { create } from 'zustand';
import { UserSchemaType } from '../../../shared/models/user.ts';
import { LoginSchemaType, RegisterSchemaType } from '../../../services/endpoints/auth/schema';
import { login, registration } from '../../../services/endpoints/auth';
import { devtools, persist } from 'zustand/middleware';
import { Statuses } from '../../../shared/constants';

interface UserStore {
	user: UserSchemaType | null;
	register: (form: RegisterSchemaType) => void;
	login: (form: LoginSchemaType) => void;
	status: Statuses | null;
	error: string | null;
}

export const useUserStore = create<UserStore>()(
	persist(
		devtools((set) => ({
			user: null,
			error: null,
			status: null,

			register: async (form: RegisterSchemaType) => {
				try {
					set({ status: Statuses.LOADING });
					const authData = await registration(form);
					set({ user: authData.user, error: null, status: Statuses.LOADED });
				} catch (error) {
					const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
					set({ user: null, error: errorMessage, status: Statuses.ERROR });
				}
			},

			login: async (form: LoginSchemaType) => {
				try {
					set({ status: Statuses.LOADING });
					const authData = await login(form);
					set({ user: authData.user, error: null, status: Statuses.LOADED });
				} catch (error) {
					const errorMessage = error.response?.data?.message || error.message || 'Auth failed';
					set({ user: null, error: errorMessage, status: Statuses.ERROR });
				}
			},
		})),
		{
			name: 'user-storage',
		},
	),
);
