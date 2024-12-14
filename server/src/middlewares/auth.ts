import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import { config } from "../config/config";
import prisma from "../config/prisma";

interface UserPayload {
	id: string;
	username: string;
}

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
	if (!token) {
		errorResponse(res, "Unauthorized request", 401);
		return;
	}

	try {
		const decoded = jwt.verify(
			token,
			config.jwt_token_secret
		) as UserPayload;
		if (!decoded) {
			errorResponse(res, "Unauthorized request", 401);
			return;
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				id: decoded.id,
			},
		});
		if (!existingUser) {
			errorResponse(res, "Invalid token, please log in", 401);
			return;
		}

		req.user = existingUser;
		next();
	} catch (error) {
		console.log(error);
		errorResponse(res, "Something went wrong", 500, error);
	}
};
