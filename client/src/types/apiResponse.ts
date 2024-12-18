export interface SuccessResponse<T> {
	success: boolean;
	message: string;
	statusCode: number;
	data: T;
}

export interface ErrorResponse {
	success: boolean;
	message: string;
	errorCode: number;
	errorDetails?: string;
}
