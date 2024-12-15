import { z } from "zod";

export const registerSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters long"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	role: z.enum(["MENTOR", "MENTEE", "ADMIN"]),
});

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const profileSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters long"),
	bio: z.string().min(3, "Bio must be at least 3 characters long"),
	location: z.string().min(3, "Location must be at least 3 characters long"),
});

export const updateProfileSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters long"),
	bio: z.string().min(3, "Bio must be at least 3 characters long"),
	location: z.string().min(3, "Location must be at least 3 characters long"),
});

export const updateUsernameSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters long"),
});

export const changePasswordSchema = z.object({
	oldPassword: z
		.string()
		.min(6, "Password must be at least 6 characters long"),
	newPassword: z
		.string()
		.min(6, "Password must be at least 6 characters long"),
});
