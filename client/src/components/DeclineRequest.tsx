import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ErrorResponse } from "@/types/apiResponse";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { useState } from "react";

interface DeclineRequestProps {
	id: string;
	getNotification: () => Promise<void>;
}

export const DeclineRequest = ({
	id,
	getNotification,
}: DeclineRequestProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const { toast } = useToast();

	const declineRequest = async () => {
		setLoading(true);
		try {
			await axios.post("/mentorship/decline/" + id);
			await getNotification();
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Error",
				description:
					errorMessage ??
					"An error occurred while declining request.",
				duration: 3000,
				variant: "destructive",
			});
		}
		setLoading(false);
	};

	return (
		<Button
			variant="destructive"
			disabled={loading}
			onClick={declineRequest}
		>
			{loading ? "Declining..." : "Decline"}
		</Button>
	);
};
