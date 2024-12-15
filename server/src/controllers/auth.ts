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
				400,
				validData.error.message,
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
			errorResponse(res, 400, "This username is already taken");
			return;
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			errorResponse(res, 400, "This email is already registered");
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
		successResponse(res, 201, "User registered successfully", {
			user: user.id,
			token,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const validData = loginSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				validData.error.message,
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
			errorResponse(res, 404, "User not found");
			return;
		}

		const isPasswordValid = await verifyPassword(password, user.password);

		if (!isPasswordValid) {
			errorResponse(res, 401, "Invalid credentials");
			return;
		}

		const token = generateToken(user);

		res.cookie("token", token, cookieOptions);
		successResponse(res, 200, "User logged in successfully", {
			user: user.id,
			token,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
	try {
		res.clearCookie("token");
		successResponse(res, 200, "User logged out successfully");
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export { registerUser, loginUser, logoutUser };
