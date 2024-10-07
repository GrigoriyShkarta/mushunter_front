import { z } from 'zod';
import { Field } from '../../../../shared/constants';

const ObjectSchema = z.object({
	id: z.number(),
	name: z.object({
		ua: z.string(),
		en: z.string(),
	}),
});

export const GetSettingsSchema = z.object({
	cities: z.array(ObjectSchema),
	skills: z.array(ObjectSchema),
	styles: z.array(z.object({ id: z.number(), name: z.string() })),
});

export const ChangeMainSettingsSchema = z.object({
	[Field.NAME]: z.string(),
	[Field.LAST_NAME]: z.string(),
	[Field.CITY]: z.number().optional(),
	[Field.PHONE]: z.string().optional(),
	[Field.BIRTHDAY]: z.date().optional(),
	[Field.EDUCATION]: z.string().optional(),
	[Field.LINKS]: z.array(z.string().url()).optional(),
	[Field.STYLES]: z.array(z.number()).optional(),
	[Field.SEARCH_BAND]: z.boolean(),
	[Field.IN_SEARCH]: z.array(z.number()),
});

export const ChangeSkillsSchema = z.object({
	[Field.SKILLS]: z.array(z.object({ skill: z.number(), experience: z.number() })).default([]),
});

export const ChangeDescriptionSchema = z.object({
	[Field.DESCRIPTION]: z.string().optional(),
});

export const ToggleLikeSchema = z.object({
	[Field.ID]: z.number(),
});

export const AvatarSchema = z.object({});

export type ChangeMainSettingsSchemaType = z.infer<typeof ChangeMainSettingsSchema>;
export type GetSettingsSchemaType = z.infer<typeof GetSettingsSchema>;
export type GetChangeSkillsSchemaType = z.infer<typeof ChangeSkillsSchema>;
export type ChangeDescriptionSchemaType = z.infer<typeof ChangeDescriptionSchema>;
export type ToggleLikeSchemaType = z.infer<typeof ToggleLikeSchema>;
export type AvatarSchemaType = z.infer<typeof AvatarSchema>;
