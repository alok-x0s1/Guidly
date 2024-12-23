import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AxiosError } from "axios";
import { MentorData } from "@/types/mentor";
import { ErrorResponse } from "@/types/apiResponse";
import axios from "@/utils/axios";
import { Error, Loading, MentorCard } from "@/components";

export default function Explore() {
	const [mentors, setMentors] = useState<MentorData[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const getAllMentors = async () => {
		setLoading(true);
		try {
			const response = await axios.get("/mentorship");
			setMentors(response.data.data);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;
			setError(
				errorMessage ?? "An error occurred while getting mentors."
			);
		}
		setLoading(false);
	};

	useEffect(() => {
		getAllMentors();
	}, []);

	if (loading) <Loading placeholder="Searching for mentors..." />;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
		>
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-extrabold text-gray-900 mb-8">
					Explore Mentors
				</h1>

				{error ? (
					<Error title="Error" error={error} />
				) : (
					<MentorCard mentors={mentors} />
				)}
			</div>
		</motion.div>
	);
}
