import { z } from "zod";

const interestSchema = z.object({
	name: z.string().trim(),
});

export const addInterestsSchema = interestSchema;
export const removeInterestsSchema = interestSchema;
export const updateInterestsSchema = interestSchema;
export const createInterestsSchema = interestSchema;
