import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ErrorResponse } from "@/types/apiResponse";
import { CreateProfile, Loading, ProfileData } from "@/components";
import { UserProfile } from "@/types/user";

export default function Profile() {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	const { toast } = useToast();

	useEffect(() => {
		fetchProfile();
	}, []);

	const fetchProfile = async () => {
		try {
			const response = await axios.get("/profile");
			setProfile(response.data.data);

			toast({
				title: "Success",
				description: response.data.message,
			});
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

	if (loading) {
		return <Loading placeholder="Loading your mentoring profile..." />;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex justify-center items-center px-4 py-8"
		>
			{profile ? (
				<ProfileData profile={profile} />
			) : (
				<CreateProfile fetchProfile={fetchProfile} />
			)}
		</motion.div>
	);
}
