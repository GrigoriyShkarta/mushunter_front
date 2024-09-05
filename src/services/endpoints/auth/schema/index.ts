import { z } from 'zod';

const LoginSchema = z.object({
	email: z.string(),
	password: z.string(),
});

const RegisterSchema = z.object({
	firstname: z.string(),
	lastname: z.string(),
	email: z.string(),
	password: z.string(),
});

const EmailSchema = z.object({
	email: z.string().email(),
});

const TokenSchema = z.object({
	refreshToken: z.string(),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type EmailSchemaType = z.infer<typeof EmailSchema>;
export type TokenSchemaType = z.infer<typeof TokenSchema>;
