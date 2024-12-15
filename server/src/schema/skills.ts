import { z } from "zod";

export const createSkillsSchema = z.object({
	name: z.string().toLowerCase(),
});

export const updateSkillsSchema = z.object({
	name: z.string().toLowerCase(),
});

export const addSkillsSchema = z.object({
	name: z.string().toLowerCase(),
});

export const removeSkillsSchema = z.object({
	name: z.string().toLowerCase(),
});
