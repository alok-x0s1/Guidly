import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../config/prisma";
import { createSkillsSchema } from "../schema/skills";

const getAllSkills = async (req: Request, res: Response): Promise<void> => {
	try {
		const skills = await prisma.skill.findMany();
		if (!skills) {
			errorResponse(res, 404, "Currently there are no skills found");
			return;
		}

		successResponse(res, 200, "Skills fetched successfully", skills);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const createSkill = async (req: Request, res: Response): Promise<void> => {
	try {
		const validData = createSkillsSchema.safeParse(req.body);
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

		const existingSkill = await prisma.skill.findUnique({
			where: {
				name,
			},
		});

		if (existingSkill) {
			errorResponse(res, 400, "Skill already exists");
			return;
		}

		const skill = await prisma.skill.create({
			data: {
				name,
			},
		});

		successResponse(res, 201, "Skill created successfully", skill);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const updateSkill = async (req: Request, res: Response): Promise<void> => {
	try {
		const skillId = req.params.id;
		const validData = createSkillsSchema.safeParse(req.body);
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

		const existingSkill = await prisma.skill.findUnique({
			where: {
				name,
			},
		});

		if (existingSkill) {
			errorResponse(res, 400, "Skill already exists");
			return;
		}

		const skill = await prisma.skill.update({
			where: {
				id: skillId,
			},
			data: {
				name,
			},
		});

		if (!skill) {
			errorResponse(res, 404, "Skill not updated");
			return;
		}

		successResponse(res, 200, "Skill updated successfully", skill);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const deleteSkill = async (req: Request, res: Response): Promise<void> => {
	try {
		const skillId = req.params.id;

		const skill = await prisma.skill.delete({
			where: {
				id: skillId,
			},
		});

		if (!skill) {
			errorResponse(res, 404, "Skill not deleted");
			return;
		}

		successResponse(res, 200, "Skill deleted successfully", skill);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export { getAllSkills, createSkill, updateSkill, deleteSkill };
