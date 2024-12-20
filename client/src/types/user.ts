interface Skill {
	skill: {
		id: string;
		name: string;
	};
}

interface Interest {
	interest: {
		id: string;
		name: string;
	};
}

interface User {
	id: string;
	username: string;
	email: string;
	role: string;
}

export interface UserProfile {
	id: string;
	userId: string;
	name: string;
	bio: string;
	avatar: string;
	location: string;
	createdAt: string;
	updatedAt: string;
	user: User;
	skills: Skill[];
	interests: Interest[];
}
