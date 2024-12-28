import { AcceptRequest, DeclineRequest, Loading } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SignleNotification as ISignleNotification } from "@/types/notification";
import axios from "@/utils/axios";
import { Check, CheckCheck, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SingleNotification = () => {
	const { id } = useParams();
	const [notification, setNotification] =
		useState<ISignleNotification | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const getNotification = async () => {
		setLoading(true);
		try {
			const res = await axios.get("/notifications/" + id);
			setNotification(res.data.data);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		getNotification();
	}, []);

	if (loading || !notification) {
		return <Loading placeholder="Loading..." />;
	}

	const getStatusIcon = (): JSX.Element => {
		if (notification?.seen) {
			return <CheckCheck className="h-4 w-4 text-blue-500" />;
		}
		if (status === "DELIVERED") {
			return <Check className="h-4 w-4 text-gray-500" />;
		}
		return <Clock className="h-4 w-4 text-gray-400" />;
	};

	const getStatusText = (): string => {
		if (notification?.seen) {
			return "Seen";
		}
		if (status === "DELIVERED") {
			return "Delivered";
		}
		return "Pending";
	};

	const otherUser = notification.isSender
		? notification.receiver
		: notification.sender;

	return (
		<div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
			<Card className="w-full max-w-4xl hover:bg-gray-50 transition-colors min-h-[35vh]">
				<CardContent className="p-4">
					<div className="flex justify-end">
						<Badge
							variant={
								notification?.type === "REQUEST"
									? "destructive"
									: "default"
							}
							className="text-xs"
						>
							{notification?.type}
						</Badge>
					</div>
					<Avatar className="h-16 w-16 bg-primary/10 mb-2">
						<AvatarImage
							src={
								import.meta.env.VITE_API_URL +
								"/public/uploads/" +
								otherUser.profile.avatar
							}
							alt={otherUser.profile.name}
						/>
						<AvatarFallback className="bg-primary/5">
							{otherUser.profile.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
					<div className="flex items-start gap-4">
						<div className="flex-1 space-y-1">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3 mb-2">
									<span className="font-medium">
										{otherUser.profile.name} [@
										{otherUser.username}]
									</span>
									<Badge
										variant={
											otherUser.role === "MENTOR"
												? "default"
												: "secondary"
										}
										className="text-xs"
									>
										{otherUser.role}
									</Badge>
								</div>
							</div>

							<div className="flex flex-col flex-wrap gap-3 my-2">
								<div className="flex gap-2 flex-wrap">
									<p className="text-base font-semibold">
										Skills
									</p>
									{notification.sender.profile.skills.map(
										({ skill }) => (
											<Badge
												key={skill.id}
												variant="outline"
												className="text-xs"
											>
												{skill.name}
											</Badge>
										)
									)}
								</div>
								<div className="flex gap-2 flex-wrap">
									<p className="text-base font-semibold">
										Interests
									</p>
									{notification.sender.profile.interests.map(
										({ interest }) => (
											<Badge
												key={interest.id}
												variant="outline"
												className="text-xs bg-blue-50"
											>
												{interest.name}
											</Badge>
										)
									)}
								</div>
							</div>

							<p className="text-gray-800 mt-1">
								<span className="font-semibold">Message :</span>{" "}
								{notification?.message}
							</p>
							<p className="mt-1">
								<span className="font-semibold">Status : </span>
								<span
									className={
										notification.status === "ACCEPTED"
											? "text-green-500"
											: "text-red-500"
									}
								>
									{notification.status}
								</span>
							</p>

							<div className="flex items-center justify-end mt-2">
								<div className="flex item gap-1 text-sm text-gray-500">
									{notification?.isSender && (
										<div className="flex gap-1 items-center">
											<span>Sent by you</span>
											{getStatusIcon()}
											<span>{getStatusText()}</span>
										</div>
									)}
								</div>
							</div>

							{!notification.isSender &&
								notification.status === "PENDING" && (
									<div className="flex items-center justify-start mt-2 gap-2">
										<AcceptRequest
											id={notification.id}
											getNotification={getNotification}
										/>
										<DeclineRequest
											id={notification.id}
											getNotification={getNotification}
										/>
									</div>
								)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
