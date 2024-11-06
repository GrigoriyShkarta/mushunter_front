import { z } from 'zod';
import { Field } from '../../../../shared/constants';
import { City, Style, TranslateObj } from '../../user/response';

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

export const GroupSchema = z.object({
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
	members: z.array(Member),
	likes: z.number(),
	hasLiked: z.boolean(),
});

export type GroupSchemaType = z.infer<typeof GroupSchema>;
