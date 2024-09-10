import { z } from 'zod';

const TranslateObj = z.object({
	ua: z.string(),
	en: z.string(),
});

const SkillSchema = z.object({
	id: z.number(),
	name: TranslateObj,
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
	likes: z.number(),
	city: TranslateObj.optional(),
	skills: z.array(SkillSchema).optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
