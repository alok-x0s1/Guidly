import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import axios from "../utils/axios";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const DeleteProfile = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleDelete = async () => {
		try {
			const res = await axios.delete("/user");

			toast({
				title: "Success",
				description:
					res.data.message ?? "Profile deleted successfully.",
				duration: 3000,
			});

			navigate("/");
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Action failed.",
				description: errorMessage ?? "An error occurred while signup.",
				duration: 3000,
				variant: "destructive",
			});
		}
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">
					<Trash2 />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure ?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
