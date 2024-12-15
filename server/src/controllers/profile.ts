import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../config/prisma";
import { profileSchema, updateProfileSchema } from "../schema/user";

const getProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = req.user;
		if (!user) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const userProfile = await prisma.profile.findUnique({
			where: {
				userId: user.id,
			},
			include: {
				user: true,
				skills: true,
				interests: true,
			},
		});

		if (!userProfile) {
			errorResponse(res, 404, "Please set up your profile first");
			return;
		}

		successResponse(res, 200, "Profile fetched successfully", userProfile);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const createProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}
		const validData = profileSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				validData.error.message,
				validData.error.errors
			);

			return;
		}

		const { name, bio, location } = validData.data;

		const existingProfile = await prisma.profile.findUnique({
			where: {
				userId,
			},
		});
		if (existingProfile) {
			errorResponse(res, 400, "Profile already exists");
			return;
		}

		const profile = await prisma.profile.create({
			data: {
				name,
				bio,
				location,
				userId,
			},
		});

		successResponse(res, 201, "Profile created successfully", profile);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getProfileById = async (req: Request, res: Response): Promise<void> => {
	try {
		const profileId = req.params.id;

		const profile = await prisma.profile.findUnique({
			where: {
				id: profileId,
			},
			include: {
				user: true,
				skills: true,
				interests: true,
			},
		});

		if (!profile) {
			errorResponse(res, 404, "Profile not found");
			return;
		}

		successResponse(res, 200, "Profile fetched successfully", profile);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const updateProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const profileId = req.params.id;
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const validData = updateProfileSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				validData.error.message,
				validData.error.errors
			);

			return;
		}

		const { name, bio, location } = validData.data;

		const profile = await prisma.profile.findUnique({
			where: {
				id: profileId,
			},
		});

		if (!profile) {
			errorResponse(res, 404, "Profile not found");
			return;
		}

		if (profile.userId !== userId) {
			errorResponse(
				res,
				403,
				"You are not authorized to update this profile"
			);
			return;
		}

		const updatedProfile = await prisma.profile.update({
			where: {
				id: profileId,
			},
			data: {
				name,
				bio,
				location,
			},
		});

		successResponse(
			res,
			200,
			"Profile updated successfully",
			updatedProfile
		);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const deleteProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const profileId = req.params.id;
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const profile = await prisma.profile.findUnique({
			where: {
				id: profileId,
			},
		});

		if (!profile) {
			errorResponse(res, 404, "Profile not found");
			return;
		}

		if (profile.userId !== userId) {
			errorResponse(
				res,
				403,
				"You are not authorized to delete this profile"
			);
			return;
		}

		await prisma.profile.delete({
			where: {
				id: profileId,
			},
		});

		successResponse(res, 200, "Profile deleted successfully");
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export {
	getProfile,
	createProfile,
	getProfileById,
	updateProfile,
	deleteProfile,
};
