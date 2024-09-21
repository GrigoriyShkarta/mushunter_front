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
	[Field.LINKS]: z.array(z.string()).optional(),
	[Field.STYLES]: z.array(z.number()).optional(),
});

export type ChangeMainSettingsSchemaType = z.infer<typeof ChangeMainSettingsSchema>;
export type GetSettingsSchemaType = z.infer<typeof GetSettingsSchema>;
