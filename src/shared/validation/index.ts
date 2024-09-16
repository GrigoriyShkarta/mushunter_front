import { z } from 'zod';
import { Field } from '../constants';

const emailValidation = z.string().email({ message: 'validation.invalidEmail' });

const passwordValidation = z
	.string()
	.min(8, { message: 'validation.minValue' })
	.regex(/^[a-zA-Z0-9!@#$%^&*()_+=-]*$/, { message: 'validation.latinNumberSymbol' })
	.regex(/[a-zA-Z]/, { message: 'validation.onlyLatinSymbols' })
	.regex(/\d/, { message: 'validation.numbers' });

const nameValidation = z
	.string()
	.regex(/^\S*$/, { message: 'validation.noSpacesAllowed' })
	.min(1, { message: 'validation.required' });

export const EmailSchema = z.object({
	[Field.EMAIL]: emailValidation,
});

export const SignInSchema = z.object({
	[Field.EMAIL]: emailValidation,
	[Field.PASSWORD]: passwordValidation,
});

export const RegisterSchema = z.object({
	[Field.NAME]: nameValidation,
	[Field.LAST_NAME]: nameValidation,
	[Field.EMAIL]: emailValidation,
	[Field.PASSWORD]: passwordValidation,
	[Field.CONFIRM_PASSWORD]: passwordValidation,
});

export const FinishRegisterSchema = z.object({
	[Field.NAME]: nameValidation,
	[Field.LAST_NAME]: nameValidation,
});
