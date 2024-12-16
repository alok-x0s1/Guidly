import { z } from "zod";

export const createNotificationSchema = z.object({
	receiverId: z.string().uuid(),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters long")
		.max(500, "Message must be at most 500 characters long"),
	type: z.enum(["REQUEST", "ACCEPT", "DECLINE"]),
});
