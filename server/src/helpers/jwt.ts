import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export function generateToken(user: User) {
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
		},
		config.jwt_token_secret,
		{
			expiresIn: config.jwt_token_expiry,
		}
	);

	return token;
}
