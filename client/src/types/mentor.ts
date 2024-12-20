interface MentorProfile {
	id: string;
	userId: string;
	name: string;
	bio: string;
	avatar: string;
	location: string;
	createdAt: string;
	updatedAt: string;
}

export interface MentorData {
	id: string;
	username: string;
	profile: MentorProfile;
}
