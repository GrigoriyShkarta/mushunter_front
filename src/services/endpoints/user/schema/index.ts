import { z } from 'zod';
import { Field } from '../../../../shared/constants';

export const ChangeMainSettingsSchema = z.object({
	[Field.NAME]: z.string(),
	[Field.LAST_NAME]: z.string(),
	[Field.CITY]: z.number(),
	[Field.PHONE]: z.string(),
	[Field.EDUCATION]: z.string(),
	[Field.LINKS]: z.array(z.string()),
});

export type ChangeMainSettingsSchemaType = z.infer<typeof ChangeMainSettingsSchema>;
