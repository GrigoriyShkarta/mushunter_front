import { z } from 'zod';
import { UserSchema } from '../../user/response';

export const AuthSchema = z.object({
	user: UserSchema,
	tokens: z.object({
		accessToken: z.string(),
		refreshToken: z.string(),
	}),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
