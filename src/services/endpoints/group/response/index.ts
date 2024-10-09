import { z } from 'zod';
import { Field } from '../../../../shared/constants';
import { City, Style, TranslateObj } from '../../user/response';

const RoleSchema = z.object({
	id: z.number(),
	name: TranslateObj,
});

const Member = z.object({
	[Field.ID]: z.number(),
	[Field.NAME]: z.string(),
	[Field.ROLE]: z.array(RoleSchema),
});

export const GroupSchema = z.object({
	[Field.ID]: z.number(),
	[Field.NAME]: z.string(),
	[Field.DESCRIPTION]: z.string().optional(),
	[Field.CITY]: City.optional(),
	[Field.STYLES]: z.array(Style).default([]),
	[Field.AVATAR]: z.string().optional(),
	members: z.array(Member),
});

export type GroupSchemaType = z.infer<typeof GroupSchema>;
