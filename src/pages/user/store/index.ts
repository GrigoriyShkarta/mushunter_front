import { create } from 'zustand';
import { EmailSchemaType, RegisterSchemaType } from '../../../services/endpoints/auth/schema';
import { authWithSocialMedia, login, registration } from '../../../services/endpoints/auth';
import { devtools, persist } from 'zustand/middleware';
import { Statuses } from '../../../shared/constants';
import { AuthSchemaType } from '../../../services/endpoints/auth/response';
import { ChangeMainSettingsSchemaType, GetSettingsSchemaType } from '../../../services/endpoints/user/schema';
import { getSettings, sendMainData } from '../../../services/endpoints/user';
import { UserSchemaType } from '../../../services/endpoints/user/response';

interface UserStore {
	user: UserSchemaType | null;
	registrationUser: (form: RegisterSchemaType) => void;
	login: (form: EmailSchemaType) => Promise<AuthSchemaType>;
	socialAuth: (form: EmailSchemaType) => Promise<AuthSchemaType | boolean>;
	status: Statuses | null;
	error: string | null;
	settings: GetSettingsSchemaType | null;
	fetchSettings: () => Promise<GetSettingsSchemaType>;
	changeMainData: (data: ChangeMainSettingsSchemaType) => Promise<UserSchemaType>;
	sendForm: boolean;
	toggleSendForm: () => void;
}

export const useUserStore = create<UserStore>()(
	persist(
		devtools((set) => ({
			user: null,
			error: null,
			status: null,
			settings: null,
			sendForm: false,

			registrationUser: async (form: RegisterSchemaType) => {
				try {
					set({ status: Statuses.LOADING });
					const authData = await registration(form);
					set({ user: authData.user, error: null, status: Statuses.LOADED });
				} catch (error) {
					const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
					set({ user: null, error: errorMessage, status: Statuses.ERROR });
				}
			},

			login: async (form: EmailSchemaType): Promise<AuthSchemaType> => {
				try {
					set({ status: Statuses.LOADING });
					const authData = await login(form);
					set({ user: authData.user, error: null, status: Statuses.LOADED });
					return authData;
				} catch (error) {
					const errorMessage = error.response?.data?.message || error.message || 'Auth failed';
					set({ user: null, error: errorMessage, status: Statuses.ERROR });
					throw new Error(errorMessage);
				}
			},

			socialAuth: async (form: EmailSchemaType): Promise<AuthSchemaType | boolean> => {
				try {
					const res = await authWithSocialMedia(form);
					if (res && typeof res === 'object' && 'user' in res) {
						set({ user: res.user });
					}
					return res;
				} catch (e) {
					throw new Error(e as string);
				}
			},

			fetchSettings: async (): Promise<GetSettingsSchemaType> => {
				try {
					const res = await getSettings();
					set({ settings: res });
					return res;
				} catch (e) {
					throw new Error(e as string);
				}
			},

			changeMainData: async (data: ChangeMainSettingsSchemaType): Promise<UserSchemaType> => {
				try {
					console.log('data', data);
					const res = await sendMainData(data);
					set({ user: res });
					return res;
				} catch (e) {
					throw new Error(e as string);
				}
			},

			toggleSendForm: (): void => {
				set((state) => ({ sendForm: !state.sendForm }));
			},
		})),
		{
			name: 'user-storage',
			partialize: (state) => ({
				user: state.user,
			}),
		},
	),
);
