import { z } from 'zod';

export const UserSchema = z.object({
	id: z.number(),
	firstname: z.string(),
	lastname: z.string(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
