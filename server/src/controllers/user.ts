import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../config/prisma";
import { updateUsernameSchema } from "../schema/user";

const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = req.user;
		if (!user) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		successResponse(res, 200, "User fetched successfully", user);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.params.id;

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				profile: {
					include: {
						skills: {
							include: {
								skill: true,
							},
						},
						interests: {
							include: {
								interest: true,
							},
						},
					},
				},
			},
		});
		if (!user) {
			errorResponse(res, 404, "User not found");
			return;
		}

		successResponse(res, 200, "User fetched successfully", user);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const updateUsername = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const validData = updateUsernameSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				validData.error.message,
				validData.error.errors
			);

			return;
		}

		const { username } = validData.data;

		const existingUser = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (existingUser) {
			errorResponse(res, 400, "Username already exists");
			return;
		}

		const user = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				username,
			},
		});

		successResponse(res, 200, "Username updated successfully", {
			user: user.id,
			username: user.username,
		});
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		await prisma.user.delete({
			where: {
				id: userId,
			},
		});

		successResponse(res, 200, "User deleted successfully");
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export { getUser, getUserById, updateUsername, deleteUser };
