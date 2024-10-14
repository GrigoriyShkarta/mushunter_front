import { create } from 'zustand';
import { EmailSchemaType, RegisterSchemaType } from '../../../services/endpoints/auth/schema';
import { authWithSocialMedia, login, registration } from '../../../services/endpoints/auth';
import { devtools, persist } from 'zustand/middleware';
import { Statuses } from '../../../shared/constants';
import { AuthSchemaType } from '../../../services/endpoints/auth/response';
import {
	ChangeDescriptionSchemaType,
	ChangeMainSettingsSchemaType,
	GetChangeSkillsSchemaType,
	GetSettingsSchemaType,
} from '../../../services/endpoints/user/schema';
import {
	getSettings,
	getUser,
	sendAvatar,
	sendDescription,
	sendInSearch,
	sendMainData,
	sendSkills,
	sendToggleLike,
} from '../../../services/endpoints/user';
import { UserSchemaType } from '../../../services/endpoints/user/response';

interface UserStore {
	profile: UserSchemaType | null;
	user: UserSchemaType | null;
	registrationUser: (form: RegisterSchemaType) => void;
	login: (form: EmailSchemaType) => Promise<void>;
	socialAuth: (form: EmailSchemaType) => Promise<AuthSchemaType | boolean>;
	status: Statuses | null;
	error: string | null;
	settings: GetSettingsSchemaType | null;
	fetchSettings: () => Promise<void>;
	changeMainData: (data: ChangeMainSettingsSchemaType) => Promise<void>;
	sendForm: boolean;
	toggleSendForm: () => void;
	changeSkills: (data: GetChangeSkillsSchemaType) => Promise<void>;
	changeDescription: (data: ChangeDescriptionSchemaType) => Promise<void>;
	getUserFromId: (data: { id: number }) => Promise<void>;
	logOut: () => void;
	fetchToggleLike: (data: { id: number }) => void;
	changeAvatar: (data: FormData) => Promise<void>;
	changeInSearch: (data: GetChangeSkillsSchemaType) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
	persist(
		devtools((set) => ({
			profile: null,
			user: null,
			error: null,
			status: null,
			settings: null,
			sendForm: false,

			registrationUser: async (form: RegisterSchemaType) => {
				try {
					set({ status: Statuses.LOADING });
					const authData = await registration(form);
					set({ profile: authData.user, error: null, status: Statuses.LOADED });
				} catch (error) {
					const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
					set({ profile: null, error: errorMessage, status: Statuses.ERROR });
				}
			},

			login: async (form: EmailSchemaType): Promise<void> => {
				try {
					set({ status: Statuses.LOADING });
					const authData = await login(form);
					set({ profile: authData.user, error: null, status: Statuses.LOADED });
				} catch (error) {
					const errorMessage = error.response?.data?.message || error.message || 'Auth failed';
					set({ profile: null, error: errorMessage, status: Statuses.ERROR });
					throw new Error(errorMessage);
				}
			},

			logOut: (): void => {
				set({ profile: null });
			},

			socialAuth: async (form: EmailSchemaType): Promise<AuthSchemaType | boolean> => {
				try {
					const res = await authWithSocialMedia(form);
					if (res && typeof res === 'object' && 'user' in res) {
						set({ profile: res.user });
					}
					return res;
				} catch (e) {
					throw new Error(e as string);
				}
			},

			getUserFromId: async (data: { id: number }): Promise<void> => {
				try {
					const res = await getUser(data);
					set({ user: res });
				} catch (e) {
					throw new Error(e as string);
				}
			},

			fetchSettings: async (): Promise<void> => {
				try {
					const res = await getSettings();
					set({ settings: res });
				} catch (e) {
					throw new Error(e as string);
				}
			},

			changeMainData: async (data: ChangeMainSettingsSchemaType): Promise<void> => {
				try {
					const res = await sendMainData(data);
					set({ profile: res });
				} catch (e) {
					throw new Error(e as string);
				}
			},

			changeSkills: async (data: GetChangeSkillsSchemaType): Promise<void> => {
				try {
					const res = await sendSkills(data);
					set({ profile: res, sendForm: true });
				} catch (e) {
					throw new Error(e as string);
				} finally {
					set({ sendForm: false });
				}
			},

			changeDescription: async (data: ChangeDescriptionSchemaType): Promise<void> => {
				try {
					const res = await sendDescription(data);
					set({ profile: res, sendForm: true });
				} catch (e) {
					throw new Error(e as string);
				} finally {
					set({ sendForm: false });
				}
			},

			toggleSendForm: (): void => {
				set((state) => ({ sendForm: !state.sendForm }));
			},

			fetchToggleLike: async (data: { id: number }): Promise<void> => {
				const res = await sendToggleLike(data);
				set({ user: res });
			},

			changeAvatar: async (data: FormData): Promise<void> => {
				try {
					set({ sendForm: true });
					const res = await sendAvatar(data);
					set({ profile: res });
				} catch (e) {
					throw new Error(e as string);
				} finally {
					set({ sendForm: false });
				}
			},
			changeInSearch: async (data: GetChangeSkillsSchemaType): Promise<void> => {
				try {
					const res = await sendInSearch(data);
					set({ profile: res, sendForm: true });
				} catch (e) {
					throw new Error(e as string);
				} finally {
					set({ sendForm: false });
				}
			},
		})),
		{
			name: 'profile-storage',
			partialize: (state) => ({
				profile: state.profile,
				settings: state.settings,
			}),
		},
	),
);
