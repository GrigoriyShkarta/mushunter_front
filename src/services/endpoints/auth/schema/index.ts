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

export interface CheckTempPasswordDto {
	email: string;
	tempPassword: string;
	tempToken: string;
}

export interface ChangePasswordDto {
	tempToken: string;
	newPassword: string;
}

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
