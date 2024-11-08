import { z } from 'zod';
import { Field } from '../constants';

export interface Option {
	value: number;
	label: string;
}

export const TranslateObj = z.object({
	ua: z.string(),
	en: z.string(),
});

export const Style = z.object({
	id: z.number(),
	name: z.string(),
});

export const City = z.object({
	id: z.number(),
	name: TranslateObj,
});

const SkillSchema = z.object({
	id: z.number(),
	name: TranslateObj,
	experience: z.number(),
	description: z.string().optional(),
	styles: z.array(Style).default([]),
	age: z.object({ id: z.number(), name: z.string() }).optional(),
});

const SkillObj = z.object({ id: z.number(), name: TranslateObj });

const GroupSkillSchema = z.object({
	id: z.number(),
	name: TranslateObj,
});

const RoleSchema = z.object({
	id: z.number(),
	name: TranslateObj,
});

const Member = z.object({
	[Field.ID]: z.number(),
	[Field.FIRST_NAME]: z.string(),
	[Field.LAST_NAME]: z.string(),
	[Field.AVATAR]: z.string(),
	[Field.ROLE]: z.array(RoleSchema),
});

const Group = z.object({
	id: z.number(),
	[Field.NAME]: z.string(),
	[Field.AVATAR]: z.string().optional().nullable(),
	[Field.SKILLS]: z.array(GroupSkillSchema).optional(),
});

const PageDataSchema = z.object({
	[Field.ID]: z.number(),
	[Field.NAME]: z.string(),
	[Field.DESCRIPTION]: z.string().optional(),
	[Field.CITY]: City.optional(),
	[Field.STYLES]: z.array(Style).default([]),
	[Field.AVATAR]: z.string().optional(),
	[Field.BIRTHDAY]: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) {
			return new Date(arg);
		}
		return arg;
	}, z.date().optional()),
	[Field.LINKS]: z.array(z.string()).optional(),
	[Field.FIRST_NAME]: z.string().optional(),
	[Field.LAST_NAME]: z.string().optional(),
	[Field.EDUCATION]: z.string().optional(),
	[Field.PHONE]: z.string().optional(),
	likes: z.number(),
	hasLiked: z.boolean(),
	[Field.SKILLS]: z.array(SkillSchema).optional(),
	[Field.SEARCH_BAND]: z.boolean().optional(),
	[Field.STYLES_SEARCH_BAND]: z.array(Style).optional(),
	[Field.POSITION]: SkillObj.optional(),
	[Field.DESCRIPTION_POSITION]: z.string().optional(),
	[Field.IN_SEARCH]: z.array(SkillSchema).optional(),
	groups: z.array(Group).optional(),
	members: z.array(Member).optional(),
});

export type PageDataSchemaType = z.infer<typeof PageDataSchema>;
