import { IUser } from '../../../../shared/models/user.ts';

export interface AuthResponse {
	user: IUser;
	tokens: {
		accessToken: string;
		refreshToken: string;
	}
}