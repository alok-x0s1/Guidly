import axios from "@/utils/axios";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";

export const SendMentorshipRequest = ({ mentorId }: { mentorId: string }) => {
	const { toast } = useToast();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [open, setOpen] = useState<boolean>(false);

	const handleClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (message.trim().length <= 10) {
			toast({
				title: "Action failed.",
				description: "Message must be at least 10 characters long.",
				duration: 3000,
				variant: "destructive",
			});
            return;
		}

		setLoading(true);
		try {
			await axios.post("/mentorship/request", {
				receiverId: mentorId,
				message,
				type: "REQUEST",
			});

			toast({
				title: "Success",
				description: "Mentorship request sent successfully!",
			});

			setOpen(false);
			setMessage("");
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Action failed.",
				description: errorMessage ?? "An error occurred while signup.",
				duration: 3000,
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button className="bg-indigo-600 hover:bg-indigo-700 duration-300">
					Send Mentorship Request
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-sm font-semibold">
						You are about to send a mentorship request to this
						mentor.
					</AlertDialogTitle>
					<AlertDialogDescription>
						Write a personalized message to help your mentor better
						understand your needs.
						<Textarea
							className="mt-2 text-black"
							placeholder="Type your message here..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							disabled={loading}
						/>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>
						Cancel
					</AlertDialogCancel>
					<Button
						onClick={handleClick}
						disabled={loading || !message.trim()}
						className="bg-indigo-600 hover:bg-indigo-700"
					>
						{loading ? (
							<Loader2 className="animate-spin w-6 h-6" />
						) : (
							"Send Request"
						)}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
