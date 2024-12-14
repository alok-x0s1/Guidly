import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schema/user";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../config/prisma";
import { hashPassword, verifyPassword } from "../helpers/bcrypt";
import { generateToken } from "../helpers/jwt";
import { cookieOptions } from "../utils/cookie";

const registerUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const validData = registerSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				validData.error.message,
				400,
				validData.error.errors
			);

			return;
		}

		const { username, email, password, role } = validData.data;
		const isUsernameTaken = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (isUsernameTaken) {
			errorResponse(res, "This username is already taken", 400);
			return;
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			errorResponse(res, "User is already registered", 400);
			return;
		}

		const hashedPassword = await hashPassword(password);

		const user = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
				role,
			},
		});
		const token = generateToken(user);

		res.cookie("token", token, cookieOptions);
		successResponse(
			res,
			"User registered successfully",
			{ user: user.id, token },
			201
		);
	} catch (error) {
		console.log(error);
		errorResponse(res, "Something went wrong", 500, error);
	}
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const validData = loginSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				validData.error.message,
				400,
				validData.error.errors
			);

			return;
		}

		const { email, password } = validData.data;
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			errorResponse(res, "User not found", 404);
			return;
		}

		const isPasswordValid = await verifyPassword(password, user.password);

		if (!isPasswordValid) {
			errorResponse(res, "Invalid credentials", 401);
			return;
		}

		const token = generateToken(user);

		res.cookie("token", token, cookieOptions);
		successResponse(res, "User logged in successfully", {
			user: user.id,
			token,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, "Something went wrong", 500, error);
	}
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
	try {
		res.clearCookie("token");
		successResponse(res, "User logged out successfully");
	} catch (error) {
		console.log(error);
		errorResponse(res, "Something went wrong", 500, error);
	}
};

export { registerUser, loginUser, logoutUser };
