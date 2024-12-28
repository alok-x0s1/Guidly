import { ProfileData } from "@/types/user";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { ErrorResponse } from "@/types/apiResponse";

export const useMentorProfile = (id: string | undefined) => {
	const [loading, setLoading] = useState(false);
	const [mentor, setMentor] = useState<ProfileData | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchMentorProfile = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`/mentorship/mentor/${id}`);
				setMentor(res.data.data);
			} catch (err) {
				const axiosError = err as AxiosError<ErrorResponse>;
				const errorMessage = axiosError.response?.data.message;
				setError(
					errorMessage || "An error occurred while getting mentors."
				);
			} finally {
				setLoading(false);
			}
		};

		fetchMentorProfile();
	}, [id]);

	return { loading, mentor, error };
};
