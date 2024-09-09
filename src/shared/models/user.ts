import { z } from 'zod';

const SkillSchema = z.object({
	id: z.number(),
	name: z.string(),
	experience: z.number(),
});

export const UserSchema = z.object({
	id: z.number(),
	firstname: z.string(),
	lastname: z.string(),
	birthday: z.string().optional(),
	description: z.string().optional(),
	education: z.string().optional(),
	phone: z.string().optional(),
	likes: z.number().optional(),
	city: z.string().optional(),
	skills: z.array(SkillSchema).optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
