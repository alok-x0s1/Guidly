import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ErrorResponse } from "@/types/apiResponse";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { useState } from "react";

interface AcceptRequestProps {
	id: string;
	getNotification: () => Promise<void>;
}

export const AcceptRequest = ({ id, getNotification }: AcceptRequestProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const { toast } = useToast();

	const acceptRequest = async () => {
		setLoading(true);
		try {
			await axios.post("/mentorship/accept/" + id);
			await getNotification();
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Error",
				description:
					errorMessage ??
					"An error occurred while accepting request.",
				duration: 3000,
				variant: "destructive",
			});
		}
		setLoading(false);
	};

	return (
		<Button variant="outline" onClick={acceptRequest} disabled={loading}>
			{loading ? "Accepting..." : "Accept"}
		</Button>
	);
};
