import { FAQ, OurValues, Steps, TeamMember, Testimonial } from "@/types/data";
import { ChartPieIcon, SearchIcon, UserIcon } from "lucide-react";

export const teamMembers: TeamMember[] = [
	{
		name: "Sarah Johnson",
		role: "Founder & CEO",
		image: "https://randomuser.me/api/portraits/med/women/12.jpg",
		bio: "Sarah has over 15 years of experience in tech and is passionate about connecting people through mentorship.",
	},
	{
		name: "Michael Chen",
		role: "CTO",
		image: "https://randomuser.me/api/portraits/med/men/15.jpg",
		bio: "Michael is an experienced software engineer with a focus on creating scalable and user-friendly platforms.",
	},
	{
		name: "Emily Rodriguez",
		role: "Head of Community",
		image: "https://randomuser.me/api/portraits/med/men/32.jpg",
		bio: "Emily is dedicated to fostering meaningful connections and ensuring a positive experience for all Guidly users.",
	},
];

export const ourValues: OurValues[] = [
	{
		name: "Connection",
		description:
			"We believe in the power of human connections to drive personal and professional growth.",
	},
	{
		name: "Growth",
		description:
			"We are committed to fostering an environment that encourages continuous learning and development.",
	},
	{
		name: "Inclusivity",
		description:
			"We strive to create a diverse and inclusive community where everyone feels welcome and valued.",
	},
	{
		name: "Impact",
		description:
			"We aim to make a positive impact on individuals careers and the broader professional landscape.",
	},
];

export const faqs: FAQ[] = [
	{
		question: "What is Guidly?",
		answer: "Guidly is a platform that connects mentors and mentees in various professional fields, facilitating growth and knowledge sharing.",
	},
	{
		question: "How do I sign up?",
		answer: "You can sign up by clicking the 'Get started' button on our homepage and following the registration process. It's quick and easy!",
	},
	{
		question: "Is MentorMatch free to use?",
		answer: "We offer both free and premium plans. The basic features are free, while advanced features are available in our premium plans.",
	},
	{
		question: "How are mentors vetted?",
		answer: "We have a thorough vetting process for mentors, including background checks and verification of professional experience.",
	},
];

export const steps: Steps[] = [
	{
		name: "Create your profile",
		description: "Sign up and create your profile as a mentor or mentee.",
		icon: UserIcon,
	},
	{
		name: "Find your match",
		description:
			"Search for mentors or mentees based on your interests and goals.",
		icon: SearchIcon,
	},
	{
		name: "Start your journey",
		description:
			"Connect with your match and begin your mentorship journey.",
		icon: ChartPieIcon,
	},
];

export const testimonials: Testimonial[] = [
	{
		content:
			"Guidly helped me find the perfect mentor to guide me in my career. It's been an invaluable experience.",
		author: "Sarah Johnson",
		role: "Software Developer",
	},
	{
		content:
			"As a mentor, I've had the opportunity to give back and help shape the next generation of professionals in my field.",
		author: "Michael Chen",
		role: "Senior Product Manager",
	},
	{
		content:
			"The platform made it easy to connect with mentees who share my passion. It's been rewarding to see their growth.",
		author: "Emily Rodriguez",
		role: "Marketing Executive",
	},
];
