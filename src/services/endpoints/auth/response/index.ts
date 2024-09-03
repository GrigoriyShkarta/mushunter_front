import { z } from 'zod';
import { UserSchema } from '../../../../shared/models/user.ts';

export const AuthSchema = z.object({
	user: UserSchema,
	tokens: z.object({
		accessToken: z.string(),
		refreshToken: z.string(),
	}),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
