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

export const ChangeMainSettingsValidationSchema = z.object({
	[Field.NAME]: nameValidation,
	[Field.LAST_NAME]: nameValidation,
	[Field.CITY]: z.preprocess((arg) => {
		if (Array.isArray(arg)) {
			return arg[0].value;
		}
		if (arg && typeof arg === 'object' && 'value' in arg) {
			return arg.value;
		}
		return arg;
	}, z.number().optional()),
	[Field.BIRTHDAY]: z.preprocess((arg) => {
		if (typeof arg === 'string') {
			return new Date(arg);
		}
		return arg;
	}, z.date().optional()),
	[Field.PHONE]: z.string().optional(),
	[Field.EDUCATION]: z.string().optional(),
	[Field.LINKS]: z.preprocess((arg) => {
		if (Array.isArray(arg)) {
			return arg.filter((link) => link !== '');
		}
		return arg;
	}, z.array(z.string()).optional()),

	[Field.STYLES]: z.preprocess((arg) => {
		if (Array.isArray(arg)) {
			return arg.map((item) => item.value);
		}
		return arg;
	}, z.array(z.number()).optional()),
});
