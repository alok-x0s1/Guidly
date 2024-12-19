import { z } from "zod";

const skillSchema = z.object({
	name: z.string().trim(),
});

export const createSkillsSchema = skillSchema;
export const updateSkillsSchema = skillSchema;
export const addSkillsSchema = skillSchema;
export const removeSkillsSchema = skillSchema;
