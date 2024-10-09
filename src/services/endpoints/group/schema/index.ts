import { z } from 'zod';
import { Field } from '../../../../shared/constants';

export const CreateGroupDto = z.object({
	[Field.NAME]: z.string(),
	[Field.CITY]: z.number().optional(),
	[Field.DESCRIPTION]: z.string().optional(),
	[Field.AVATAR]: z.instanceof(FormData).optional(),
	[Field.STYLES]: z.array(z.number()).optional(),
	[Field.CREATION_DATE]: z.date().optional(),
	[Field.LINKS]: z.array(z.string().optional()),
});

export type CreateGroupDtoType = z.infer<typeof CreateGroupDto>;
