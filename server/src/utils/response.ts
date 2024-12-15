import { Response } from "express";

export const errorResponse = (
	res: Response,
	errorCode: number,
	message: string,
	errorDetails?: any
) => {
	return res.status(errorCode).json({
		success: false,
		message,
		errorCode,
		...(errorDetails && { errorDetails }),
	});
};

export const successResponse = (
	res: Response,
	statusCode: number,
	message: string,
	data: any = {},
) => {
	return res.status(statusCode).json({
		success: true,
		message,
		statusCode,
		data,
	});
};
