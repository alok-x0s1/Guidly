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

		const userProfile = await prisma.profile.findUnique({
			where: {
				userId: userId,
			},
		});

		if (!userProfile) {
			errorResponse(res, 404, "Please set up your profile first");
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
				role: "MENTOR",
			},
		});

		if (!existingRecipient) {
			errorResponse(res, 404, "Mentor not found, or not a mentor");
			return;
		}

		const existingNotification = await prisma.notification.findFirst({
			where: {
				receiverId,
				senderId: userId,
			},
		});

		if (existingRecipient.id === userId) {
			errorResponse(res, 400, "You cannot send a request to yourself");
			return;
		}

		if (existingNotification) {
			errorResponse(res, 400, "You have already sent a request");
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
			errorResponse(res, 404, "You haven't sent any requests yet");
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
				seen: true,
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
				seen: true,
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
			include: {
				sender: {
					select: {
						id: true,
						username: true,
						role: true,

						profile: {
							select: {
								name: true,
								avatar: true,
							},
						},
					},
				},
				receiver: {
					select: {
						id: true,
						username: true,
						role: true,

						profile: {
							select: {
								name: true,
								avatar: true,
							},
						},
					},
				},
			},
		});

		if (!connections) {
			errorResponse(res, 404, "No active connections found");
			return;
		}

		const connectionsWithIsSender = connections.map((connection) => ({
			...connection,
			isSender: connection.senderId === userId,
		}));

		successResponse(
			res,
			200,
			"Active connections fetched successfully",
			connectionsWithIsSender
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
			},
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

const getAllMentors = async (req: Request, res: Response): Promise<void> => {
	try {
		const mentors = await prisma.user.findMany({
			where: {
				role: "MENTOR",
			},
			select: {
				id: true,
				username: true,
				profile: true,
			},
		});

		if (!mentors) {
			errorResponse(res, 404, "No mentors found");
			return;
		}

		const mentorsWithProfile = mentors.filter(
			(mentor) => mentor.profile && mentor
		);

		successResponse(
			res,
			200,
			"Mentors fetched successfully",
			mentorsWithProfile
		);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getMentorById = async (req: Request, res: Response): Promise<void> => {
	try {
		const mentorId = req.params.id;
		const mentor = await prisma.profile.findUnique({
			where: {
				userId: mentorId,
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						role: true,
					},
				},
				skills: {
					select: {
						skill: true,
					},
				},
				interests: {
					select: {
						interest: true,
					},
				},
			},
		});

		if (!mentor || mentor.user.role !== "MENTOR") {
			errorResponse(res, 404, "Mentor not found or not a mentor");
			return;
		}

		successResponse(res, 200, "Mentor fetched successfully", mentor);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getAllSentRequests = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const requests = await prisma.notification.findMany({
			where: {
				senderId: userId,
			},
			include: {
				receiver: {
					select: {
						id: true,
						username: true,
						role: true,

						profile: {
							select: {
								name: true,
								avatar: true,
							},
						},
					},
				},
			},
		});

		if (!requests) {
			errorResponse(res, 404, "You haven't sent any requests yet");
			return;
		}

		successResponse(res, 200, "Requests fetched successfully", requests);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getAllReceivedRequests = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const requests = await prisma.notification.findMany({
			where: {
				receiverId: userId,
			},
			include: {
				sender: {
					select: {
						id: true,
						username: true,
						role: true,

						profile: {
							select: {
								name: true,
								avatar: true,
							},
						},
					},
				},
			},
		});

		if (!requests) {
			errorResponse(res, 404, "You haven't received any requests yet");
			return;
		}

		successResponse(res, 200, "Requests fetched successfully", requests);
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
	getMatches,
	getAllMentors,
	getMentorById,
	getAllSentRequests,
	getAllReceivedRequests,
};
