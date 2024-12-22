export type NotificationStatus = "PENDING" | "ACCEPTED" | "DECLINED";
export type NotificationType = "REQUEST" | "ACCEPT" | "DECLINE";

export interface Notification {
	id: string;
	message: string;
	receiverId: string;
	senderId: string;
	seen: boolean;
	isSender: boolean;
	status: NotificationStatus;
	type: NotificationType;
	createdAt: string;
	updatedAt: string;
}

interface Interest {
	id: string;
	name: string;
}

interface Skill {
	id: string;
	name: string;
}

interface Profile {
	interests: Array<{ interest: Interest }>;
	skills: Array<{ skill: Skill }>;
	name: string;
	avatar: string;
}

interface User {
	id: string;
	username: string;
	role: "MENTOR" | "MENTEE";
	profile: Profile;
}

export interface SignleNotification {
	id: string;
	createdAt: string;
	updatedAt: string;
	message: string;
	seen: boolean;
	isSender: boolean;
	status: NotificationStatus;
	type: NotificationType;

	sender: User;
	senderId: string;
	receiver: User;
	receiverId: string;
}
