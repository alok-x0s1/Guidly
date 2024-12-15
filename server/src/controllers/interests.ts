import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../config/prisma";
import { addInterestsSchema } from "../schema/interests";

const getAllInterests = async (req: Request, res: Response): Promise<void> => {
	try {
		const interests = await prisma.interest.findMany();
		if (!interests) {
			errorResponse(res, 404, "Currently there are no interests found");
			return;
		}

		successResponse(res, 200, "Interests fetched successfully", interests);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const createInterest = async (req: Request, res: Response): Promise<void> => {
	try {
		const validData = addInterestsSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				validData.error.message,
				validData.error.errors
			);
			return;
		}

		const { name } = validData.data;

		const existingInterest = await prisma.interest.findUnique({
			where: {
				name,
			},
		});

		if (existingInterest) {
			errorResponse(res, 400, "Interest already exists");
			return;
		}

		const interest = await prisma.interest.create({
			data: {
				name,
			},
		});

		if (!interest) {
			errorResponse(res, 400, "Interest not created");
			return;
		}

		successResponse(res, 200, "Interest created successfully", interest);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const updateInterest = async (req: Request, res: Response): Promise<void> => {
	try {
		const interestId = req.params.id;
		const validData = addInterestsSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				validData.error.message,
				validData.error.errors
			);

			return;
		}

		const { name } = validData.data;

		const existingInterest = await prisma.interest.findUnique({
			where: {
				name,
			},
		});

		if (existingInterest) {
			errorResponse(res, 400, "Interest already exists");
			return;
		}

		const interest = await prisma.interest.update({
			where: {
				id: interestId,
			},
			data: {
				name,
			},
		});

		if (!interest) {
			errorResponse(res, 400, "Interest not updated");
			return;
		}

		successResponse(res, 200, "Interest updated successfully", interest);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const deleteInterest = async (req: Request, res: Response): Promise<void> => {
	try {
		const interestId = req.params.id;
		const interest = await prisma.interest.delete({
			where: {
				id: interestId,
			},
		});

		if (!interest) {
			errorResponse(res, 400, "Interest not deleted");
			return;
		}

		successResponse(res, 200, "Interest deleted successfully", interest);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export { getAllInterests, createInterest, updateInterest, deleteInterest };
