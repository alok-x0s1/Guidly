import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "../utils/axios";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/apiResponse";

const FormSchema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must be at least 20 characters")
		.regex(
			/^[a-zA-Z0-9_]+$/,
			"Username must not contain special characters"
		),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	role: z.enum(["MENTOR", "MENTEE"]),
});

export default function SignUp() {
	const [loading, setLoading] = useState<boolean>(false);
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			role: "MENTEE",
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		setLoading(true);

		try {
			const res = await axios.post("/auth/register", data);
			console.log(res.data);

			toast({
				title: "Success",
				description: res.data.message,
			});
			navigate("/profile");
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			toast({
				title: "Signup failed.",
				description: errorMessage ?? "An error occurred while signup.",
				duration: 3000,
				variant: "destructive",
			});
		}

		setLoading(false);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen bg-gray-50 flex flex-col justify-center py-10 sm:px-6 lg:px-8"
		>
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
					Create your account
				</h2>
			</div>

			<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="john_guidly"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="johe@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="********"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="MENTEE">
													Mentee
												</SelectItem>
												<SelectItem value="MENTOR">
													Mentor
												</SelectItem>
											</SelectContent>
										</Select>
										<FormDescription>
											You can not change your role after
											signing up.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" disabled={loading}>
								{loading ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									"Sign Up"
								)}
							</Button>
						</form>
					</Form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									Or
								</span>
							</div>
						</div>

						<div className="mt-6">
							<div className="text-sm text-center">
								<Link
									to="/signin"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Already have an account? Sign in
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
