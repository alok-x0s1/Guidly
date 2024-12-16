import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../config/prisma";
import { createNotificationSchema } from "../schema/notifications";

const getAllNotifications = async (req: Request, res: Response):Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const notifications = await prisma.notification.findMany({
			where: {
				receiverId: userId,
			},
		});

		if (!notifications) {
			errorResponse(res, 404, "Notifications not found");
			return;
		}

		successResponse(
			res,
			200,
			"Notifications fetched successfully",
			notifications
		);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const createNotification = async (req: Request, res: Response):Promise<void> => {
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

		const existingNotification = await prisma.notification.findFirst({
			where: {
				receiverId,
				senderId: userId,
			},
		});

		if (existingNotification) {
			errorResponse(res, 400, "Notification already exists");
			return;
		}

		const notification = await prisma.notification.create({
			data: {
				receiverId,
				senderId: userId,
				message,
				type,
				status: "PENDING",
			},
		});

		if (!notification) {
			errorResponse(res, 500, "Failed to create notification");
			return;
		}

		successResponse(res, 200, "Request created successfully", notification);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const getNotificationById = async (req: Request, res: Response):Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const notificationId = req.params.id;

		const notification = await prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
			include: {
				sender: true,
			},
		});

		if (!notification) {
			errorResponse(res, 404, "Notification not found");
			return;
		}

		successResponse(
			res,
			200,
			"Notification fetched successfully",
			notification
		);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

const markNotificationAsRead = async (req: Request, res: Response):Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			errorResponse(res, 404, "Unauthorized request, please log in");
			return;
		}

		const notificationId = req.params.id;

		const notification = await prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
		});

		if (!notification) {
			errorResponse(res, 404, "Notification not found");
			return;
		}

		const updatedNotification = await prisma.notification.update({
			where: {
				id: notificationId,
			},
			data: {
				seen: true,
			},
		});

		if (!updatedNotification) {
			errorResponse(res, 500, "Failed to mark notification as read");
			return;
		}

		successResponse(
			res,
			200,
			"Notification marked as read",
			updatedNotification
		);
	} catch (error) {
		console.log(error);
		errorResponse(res, 500, "Something went wrong", error);
	}
};

export {
	getAllNotifications,
	createNotification,
	getNotificationById,
	markNotificationAsRead,
};
