import { z } from 'zod';
import { Field } from '../../../../shared/constants';

export const TranslateObj = z.object({
	ua: z.string(),
	en: z.string(),
});

const Style = z.object({
	id: z.number(),
	name: z.string(),
});

const City = z.object({
	id: z.number(),
	name: TranslateObj,
});

export const SkillSchema = z.object({
	id: z.number(),
	name: TranslateObj,
	experience: z.number(),
});

export const UserSchema = z.object({
	[Field.ID]: z.number(),
	[Field.NAME]: z.string(),
	[Field.LAST_NAME]: z.string(),
	[Field.BIRTHDAY]: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) {
			return new Date(arg);
		}
		return arg;
	}, z.date().optional()),
	[Field.DESCRIPTION]: z.string().optional(),
	[Field.EDUCATION]: z.string().optional(),
	[Field.PHONE]: z.string().optional(),
	likes: z.number(),
	hasLiked: z.boolean(),
	[Field.CITY]: City.optional(),
	[Field.SKILLS]: z.array(SkillSchema).default([]),
	[Field.LINKS]: z.array(z.string()).default([]),
	[Field.STYLES]: z.array(Style).default([]),
	[Field.SEARCH_BAND]: z.boolean(),
	[Field.IN_SEARCH]: z.array(z.object({ id: z.number(), name: TranslateObj })).default([]),
	[Field.AVATAR]: z.string().optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type SkillSchemaType = z.infer<typeof SkillSchema>;
