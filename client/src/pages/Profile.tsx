import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import { ErrorResponse } from "@/types/apiResponse";
import { CreateProfile, Error, Loading, ProfileData } from "@/components";
import { ProfileData as UserProfile } from "@/types/user";

export default function Profile() {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchProfile = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get<{ data: UserProfile }>("/profile");
			setProfile(response.data.data);
		} catch (err) {
			const axiosError = err as AxiosError<ErrorResponse>;
			const errorMessage =
				axiosError.response?.data.message ||
				"An error occurred while fetching the profile.";
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProfile();
	}, [fetchProfile]);

	if (loading) {
		return <Loading placeholder="Loading your mentoring profile..." />;
	}

	const renderContent = () => {
		if (error === "Unauthorized request") {
			return (
				<Error
					title="Unauthorized request"
					error="You are not logged in. Please log in first."
				/>
			);
		}

		if (profile) {
			return <ProfileData profile={profile} />;
		}

		return (
			<div className="flex flex-col items-center">
				<Error
					title="Profile not found"
					error={error || "Profile data is not available."}
				/>
				<CreateProfile fetchProfile={fetchProfile} />
			</div>
		);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex justify-center items-center px-4 py-8"
		>
			{renderContent()}
		</motion.div>
	);
}
