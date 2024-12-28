import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import { config } from "../config/config";
import prisma from "../config/prisma";

interface UserPayload {
	id: string;
	username: string;
}

export const isLoggedIn = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
	if (!token) {
		errorResponse(res, 401, "Unauthorized request, Please login");
		return;
	}

	try {
		const decoded = jwt.verify(
			token,
			config.jwt_token_secret
		) as UserPayload;
		if (!decoded) {
			errorResponse(res, 401, "Unauthorized request");
			return;
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				id: decoded.id,
			},
		});
		if (!existingUser) {
			errorResponse(res, 401, "Invalid token, please log in");
			return;
		}

		req.user = existingUser;
		next();
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.user;
		if (!user) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		if (user.role !== "ADMIN") {
			errorResponse(
				res,
				403,
				"You are not authorized to access this route"
			);
			return;
		}

		next();
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};
