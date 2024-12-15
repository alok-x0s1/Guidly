import { z } from "zod";

export const createInterestsSchema = z.object({
	name: z.string().toLowerCase(),
});

export const updateInterestsSchema = z.object({
	name: z.string().toLowerCase(),
});

export const addInterestsSchema = z.object({
	name: z.string().toLowerCase(),
});

export const removeInterestsSchema = z.object({
	name: z.string().toLowerCase(),
});
