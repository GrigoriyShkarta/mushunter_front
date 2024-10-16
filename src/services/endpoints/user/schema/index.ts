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
	age: z.array(z.object({ id: z.number(), name: z.string() })),
});

export const ChangeMainSettingsSchema = z.object({
	[Field.FIRST_NAME]: z.string(),
	[Field.LAST_NAME]: z.string(),
	[Field.CITY]: z.number().optional(),
	[Field.PHONE]: z.string().optional(),
	[Field.BIRTHDAY]: z.date().optional(),
	[Field.EDUCATION]: z.string().optional(),
	[Field.LINKS]: z.array(z.string().url()).optional(),
	[Field.STYLES]: z.array(z.number()).optional(),
});

export const ChangeSkillsSchema = z.object({
	[Field.SKILLS]: z
		.array(z.object({ skill: z.number(), experience: z.number(), styles: z.array(z.number()) }))
		.default([]),
});

export const ChangeInSearchSchema = z.object({
	[Field.SKILLS]: z
		.array(z.object({ skill: z.number(), experience: z.number(), styles: z.array(z.number()) }))
		.default([]),
	[Field.SEARCH_BAND]: z.boolean(),
	[Field.POSITION]: z.number().optional(),
	[Field.STYLES_SEARCH_BAND]: z.array(z.number()).default([]),
	[Field.DESCRIPTION_POSITION]: z.string().optional(),
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
export type ChangeInSearchSchemaType = z.infer<typeof ChangeInSearchSchema>;
export type AvatarSchemaType = z.infer<typeof AvatarSchema>;
