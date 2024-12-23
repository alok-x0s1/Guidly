export enum NotificationStatus {
	PENDING = "PENDING",
	ACCEPTED = "ACCEPTED",
	REJECTED = "REJECTED",
}

export enum NotificationType {
	REQUEST = "REQUEST",
	MESSAGE = "MESSAGE",
}

export enum UserRole {
	ADMIN = "ADMIN",
	MENTOR = "MENTOR",
	MENTEE = "MENTEE",
}

export interface Profile {
	name: string;
	avatar: string;
}

export interface User {
	id: string;
	username: string;
	role: UserRole;
	profile: Profile;
}

export interface Request {
	id: string;
	senderId: string;
	receiverId: string;
	message: string;
	type: NotificationType;
	status: NotificationStatus;
	seen: boolean;
	createdAt: Date;
	updatedAt: Date;
	sender: User;
	receiver: User;
}

export interface Connection extends Request {
	isSender: boolean;
}
