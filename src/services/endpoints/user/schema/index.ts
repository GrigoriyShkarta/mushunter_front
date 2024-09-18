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
	[Field.CITY]: z.number(),
	[Field.PHONE]: z.string(),
	[Field.EDUCATION]: z.string(),
	[Field.LINKS]: z.array(z.string()),
	[Field.STYLES]: z.array(z.number()),
});

export type ChangeMainSettingsSchemaType = z.infer<typeof ChangeMainSettingsSchema>;
export type GetSettingsSchemaType = z.infer<typeof GetSettingsSchema>;
