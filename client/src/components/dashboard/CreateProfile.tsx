import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import axios from "@/utils/axios";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { MultiSelect } from "@/components/MultiSelect";
import { CreateProfileSchema } from "@/schema/user";

export interface ProfileProps {
	id: string;
	name: string;
}

export const CreateProfile = ({
	fetchProfile,
}: {
	fetchProfile: () => void;
}) => {
	const { toast } = useToast();
	const [loading, setLoading] = useState<boolean>(false);
	const [skills, setSkills] = useState<ProfileProps[]>([]);
	const [interests, setInterests] = useState<ProfileProps[]>([]);

	const availableSkills = async () => {
		try {
			const response = await axios.get("/skills");
			setSkills(response.data.data);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;
			toast({
				title: "Error",
				description:
					errorMessage ?? "An error occurred while getting skills.",
				duration: 3000,
				variant: "destructive",
			});
		}
	};

	const availableInterests = async () => {
		try {
			const response = await axios.get("/interests");
			setInterests(response.data.data);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;
			toast({
				title: "Error",
				description:
					errorMessage ??
					"An error occurred while getting interests.",
				duration: 3000,
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		availableSkills();
		availableInterests();
	}, []);

	const form = useForm<z.infer<typeof CreateProfileSchema>>({
		resolver: zodResolver(CreateProfileSchema),
		defaultValues: {
			name: "",
			bio: "",
			location: "",
			skills: [],
			interests: [],
			avatar: undefined,
		},
	});

	const onSubmit = async (data: z.infer<typeof CreateProfileSchema>) => {
		setLoading(true);

		try {
			const formData = new FormData();
			formData.append("name", data.name);
			formData.append("bio", data.bio);
			formData.append("location", data.location);
			formData.append("skills", JSON.stringify(data.skills));
			formData.append("interests", JSON.stringify(data.interests));
			formData.append("avatar", data.avatar[0]);

			const response = await axios.post("/profile", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast({
				title: "Success",
				description: response.data.message,
			});

			fetchProfile();
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
		} finally {
			setLoading(false);
		}
	};

	const avatarRef = form.register("avatar", { required: true });
	return (
		<Card className="w-full p-2 lg:w-[750px]">
			<CardHeader>
				<CardTitle>Create Your Profile</CardTitle>
				<CardDescription>
					Let's get you set up with a profile
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="John Doe"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us a little bit about yourself"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="City, Country"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="skills"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Skills</FormLabel>
									<FormControl>
										<MultiSelect
											options={skills}
											selected={field.value}
											onChange={field.onChange}
											placeholder="Select skills..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="interests"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Interests</FormLabel>
									<FormControl>
										<MultiSelect
											options={interests}
											selected={field.value}
											onChange={field.onChange}
											placeholder="Select interests..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="avatar"
							render={() => (
								<FormItem>
									<FormLabel>Avatar</FormLabel>
									<FormControl>
										<Input
											type="file"
											{...avatarRef}
											className="file:text-indigo-700 file:bg-indigo-100 file:border-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:cursor-pointer h-fit"
											accept="image/png, image/jpeg, image/jpg"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">
							{loading ? (
								<Loader2 className="mr-2 animate-spin" />
							) : (
								"Create Profile"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
