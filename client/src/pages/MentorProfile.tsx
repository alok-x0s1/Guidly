import { Loading, MentorProfileCard } from "@/components";
import { useToast } from "@/hooks/use-toast";
import { ErrorResponse } from "@/types/apiResponse";
import { ProfileData } from "@/types/user";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export const MentorProfile = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [mentor, setMentor] = useState<ProfileData | null>(null);

	const { toast } = useToast();

	const getMentor = async () => {
		setLoading(true);
		try {
			const res = await axios.get("/mentorship/" + id);
			setMentor(res.data.data);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Error",
				description:
					errorMessage ?? "An error occurred while getting profile.",
				duration: 3000,
				variant: "destructive",
			});
		}
		setLoading(false);
	};

	useEffect(() => {
		getMentor();
	}, []);

	if (loading || !mentor) {
		return <Loading placeholder="Loading Mentor Profile..." />;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex justify-center items-center px-4 py-8"
		>
			<MentorProfileCard mentor={mentor} />
		</motion.div>
	);
};
