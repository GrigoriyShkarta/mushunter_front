import { z } from 'zod';
import { Field } from '../../../../shared/constants';

const LoginSchema = z.object({
	[Field.EMAIL]: z.string().email(),
	[Field.PASSWORD]: z.string(),
});

const RegisterSchema = z.object({
	[Field.NAME]: z.string(),
	[Field.LAST_NAME]: z.string(),
	[Field.EMAIL]: z.string().email(),
	[Field.AVATAR]: z.string().url().optional(),
});

const EmailSchema = z.object({
	[Field.EMAIL]: z.string().email(),
});

const TokenSchema = z.object({
	refreshToken: z.string(),
});

const ChangePasswordSchema = z.object({
	[Field.EMAIL]: z.string().email(),
	newPassword: z.string(),
});

const FinishedRegistrationSchema = z.object({
	[Field.NAME]: z.string(),
	[Field.LAST_NAME]: z.string(),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type EmailSchemaType = z.infer<typeof EmailSchema>;
export type TokenSchemaType = z.infer<typeof TokenSchema>;
export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
export type FinishedRegistrationSchemaType = z.infer<typeof FinishedRegistrationSchema>;
