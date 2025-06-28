import { Error, Loading } from "@/components";
import { Card } from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ErrorResponse } from "@/types/apiResponse";
import { Notification } from "@/types/notification";
import axios from "@/utils/axios";
import { formatDate, getStatusColor } from "@/utils/Date";
import { AxiosError } from "axios";
import { CheckCircle2, Clock, Mail, MailOpen, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Notifications = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const getAllNotifications = async () => {
		setLoading(true);
		try {
			const res = await axios.get("/notifications");
			setNotifications(res.data.data);
		} catch (error) {
			const axiosError = error as AxiosError<ErrorResponse>;
			const errorMessage = axiosError.response?.data.message;

			if (errorMessage === "Unauthorized request") navigate("/signin");
			setError(
				errorMessage ?? "An error occurred while getting notifications."
			);
		}
		setLoading(false);
	};

	useEffect(() => {
		getAllNotifications();
	}, []);

	if (loading) {
		return <Loading placeholder="Loading notifications..." />;
	}

	return (
		<div className="mx-auto min-w-full p-6">
			<h1 className="text-3xl font-bold mb-6">Notifications</h1>

			<div className="space-y-4 flex flex-col items-start">
				{error ? (
					<Error title="Error" error={error} />
				) : notifications.length === 0 ? (
					<Card className="p-6 text-center text-muted-foreground">
						No notifications to display
					</Card>
				) : (
					notifications.map((notification) => (
						<Card
							key={notification.id}
							className={`p-4 transition-all max-w-7xl hover:shadow-md cursor-pointer duration-300 relative ${
								!notification.seen ? "bg-primary/5" : ""
							}`}
							onClick={() =>
								navigate(`/notifications/${notification.id}`)
							}
						>
							<div className="flex items-start justify-between gap-4">
								<div className="flex items-start gap-3">
									{notification.seen ? (
										<MailOpen className="w-6 h-6 text-muted-foreground mt-1" />
									) : (
										<Mail className="w-6 h-6 text-primary mt-1" />
									)}

									<div className="space-y-1">
										<div className="font-medium">
											Mentorship Request
											<span
												className={`ml-2 text-sm ${getStatusColor(
													notification.status
												)}`}
											>
												• {notification.status}
											</span>
										</div>

										<HoverCard>
											<HoverCardTrigger>
												<p className="text-base text-muted-foreground line-clamp-2 my-1">
													{notification.message.slice(
														0,
														90
													)}{" "}
													{notification.message
														.length > 90 ? (
														<span>
															...{" "}
															<span className="text-primary hover:underline">
																Read more
															</span>
														</span>
													) : (
														""
													)}
												</p>
											</HoverCardTrigger>
											<HoverCardContent>
												{notification.message}
											</HoverCardContent>
										</HoverCard>

										<div className="flex items-center text-right gap-2 text-xs text-muted-foreground">
											<Clock className="w-3 h-3" />
											{formatDate(notification.createdAt)}
										</div>
									</div>
								</div>

								{notification.status === "ACCEPTED" && (
									<CheckCircle2 className="w-5 h-5 text-green-600" />
								)}

								{notification.status === "DECLINED" && (
									<XCircle className="w-5 h-5 text-red-600" />
								)}
							</div>
						</Card>
					))
				)}
			</div>
		</div>
	);
};
