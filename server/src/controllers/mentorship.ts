import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import { createNotificationSchema } from "../schema/notifications";
import prisma from "../config/prisma";

const sendRequest = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const validData = createNotificationSchema.safeParse(req.body);
		if (!validData.success) {
			errorResponse(
				res,
				400,
				validData.error.message,
				validData.error.errors
			);
			return;
		}

		const { receiverId, message, type } = validData.data;
		const existingRecipient = await prisma.user.findUnique({
			where: {
				id: receiverId,
			},
		});

		if (!existingRecipient) {
			errorResponse(res, 404, "Mentor not found");
			return;
		}

		const notification = await prisma.notification.create({
			data: {
				senderId: userId,
				receiverId: receiverId,
				message: message,
				type: type,
				status: "PENDING",
			},
		});

		if (!notification) {
			errorResponse(
				res,
				500,
				"Failed to send request, something went wrong"
			);
			return;
		}

		successResponse(res, 200, "Request sent successfully", notification);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getAllRequests = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const requests = await prisma.notification.findMany({
			where: {
				OR: [{ senderId: userId }, { receiverId: userId }],
				type: "REQUEST",
			},
		});

		if (!requests) {
			errorResponse(res, 404, "No requests found");
			return;
		}

		successResponse(res, 200, "Requests fetched successfully", requests);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const acceptRequest = async (req: Request, res: Response): Promise<void> => {
	try {
		const notificationId = req.params.id;
		const updatedNotification = await prisma.notification.update({
			where: {
				id: notificationId,
			},
			data: {
				status: "ACCEPTED",
			},
		});

		if (!updatedNotification) {
			errorResponse(res, 404, "Request not found");
			return;
		}

		successResponse(
			res,
			200,
			"Request accepted successfully",
			updatedNotification
		);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const declineRequest = async (req: Request, res: Response): Promise<void> => {
	try {
		const notificationId = req.params.id;
		const updatedNotification = await prisma.notification.update({
			where: {
				id: notificationId,
			},
			data: {
				status: "DECLINED",
			},
		});

		if (!updatedNotification) {
			errorResponse(res, 404, "Request not found");
			return;
		}

		successResponse(
			res,
			200,
			"Request declined successfully",
			updatedNotification
		);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getActiveConnections = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const connections = await prisma.notification.findMany({
			where: {
				OR: [{ senderId: userId }, { receiverId: userId }],
				type: "REQUEST",
				status: "ACCEPTED",
			},
		});

		if (!connections) {
			errorResponse(res, 404, "No active connections found");
			return;
		}

		successResponse(
			res,
			200,
			"Active connections fetched successfully",
			connections
		);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getMatches = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const profiles = await prisma.profile.findMany({
			where: { userId },
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
		});

		if (!profiles) {
			errorResponse(res, 404, "Please set up your profile first");
			return;
		}

		const matches = await prisma.profile.findMany({
			where: {
				NOT: {
					userId,
				},
				AND: {
					skills: {
						some: {
							skill: {
								name: {
									in: profiles[0].skills.map(
										(skill) => skill.skill.name
									),
								},
							},
						},
					},
					interests: {
						some: {
							interest: {
								name: {
									in: profiles[0].interests.map(
										(interest) => interest.interest.name
									),
								},
							},
						},
					},
				},
			},
			include: {
				user: true,
			}
		});

		if (!matches) {
			errorResponse(res, 404, "No matches found");
			return;
		}

		successResponse(res, 200, "Matches fetched successfully", matches);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export {
	getAllRequests,
	sendRequest,
	acceptRequest,
	declineRequest,
	getActiveConnections,
	getMatches
}