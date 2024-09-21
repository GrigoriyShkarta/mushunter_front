import { z } from 'zod';

const TranslateObj = z.object({
	ua: z.string(),
	en: z.string(),
});

const Style = z.object({
	id: z.number(),
	name: z.string(),
});

const City = z.object({
	id: z.number(),
	name: TranslateObj,
});

export const SkillSchema = z.object({
	id: z.number(),
	name: TranslateObj,
	experience: z.number(),
});

export const UserSchema = z.object({
	id: z.number(),
	firstname: z.string(),
	lastname: z.string(),
	birthday: z.date().optional(),
	description: z.string().optional(),
	education: z.string().optional(),
	phone: z.string().optional(),
	likes: z.number(),
	city: City.optional(),
	skills: z.array(SkillSchema).default([]),
	links: z.array(z.string()).default([]),
	styles: z.array(Style).default([]),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
