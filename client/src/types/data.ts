import { LucideIcon } from "lucide-react";

export interface TeamMember {
	name: string;
	role: string;
	image: string;
	bio: string;
}

export interface OurValues {
	name: string;
	description: string;
}

export interface FAQ {
	question: string;
	answer: string;
}

export interface Steps {
	name: string;
	description: string;
	icon: LucideIcon;
}

export interface Testimonial {
	content: string;
	author: string;
	role: string;
}