import { z } from 'zod';
import { i18n } from 'i18next';
import { Field } from '../../../../shared/constants';
import { SkillSchema, TranslateObj } from '../response';

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
});

export const ChangeSkillsSchema = z.preprocess(
	(arg: any) => {
		if (Array.isArray(arg) && arg.length > 0) {
			return arg.map((item: { id: number; name: { ua: string; en: string }; experience: number }) => ({
				name: item.name,
				experience: item.experience,
			}));
		}
		return arg;
	},
	z.array(z.object({ name: z.number(), experience: z.number() })).default([]),
);

export type ChangeMainSettingsSchemaType = z.infer<typeof ChangeMainSettingsSchema>;
export type GetSettingsSchemaType = z.infer<typeof GetSettingsSchema>;
export type GetChangeSkillsSchemaType = z.infer<typeof ChangeSkillsSchema>;
