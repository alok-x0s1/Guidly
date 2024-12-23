import { formatDistanceToNow } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Request } from "@/pages/Dashboard";

const RequestItem = ({
	request,
	isSent,
}: {
	request: Request;
	isSent: boolean;
}) => {
	const trimMessage = (message: string, maxLength: number = 100) => {
		return message.length > maxLength
			? `${message.slice(0, maxLength)}...`
			: message;
	};

	const getRoleColor = (role: string) => {
		switch (role.toUpperCase()) {
			case "ADMIN":
				return "bg-red-100 text-red-800";
			case "MENTOR":
				return "bg-blue-100 text-blue-800";
			case "MENTEE":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status.toUpperCase()) {
			case "ACCEPTED":
				return "bg-green-100 text-green-800";
			case "REJECTED":
				return "bg-red-100 text-red-800";
			default:
				return "bg-yellow-100 text-yellow-800";
		}
	};

	if (isSent) {
		request.sender = request.receiver;
	}

	return (
		<Card className="mb-4 hover:shadow-md transition-shadow">
			<CardContent className="p-4">
				<div className="flex items-start gap-4">
					<Avatar className="h-10 w-10">
						{request.sender.profile?.avatar ? (
							<AvatarImage
								src={
									import.meta.env.VITE_API_URL +
									"/public/uploads/" +
									request.sender.profile.avatar
								}
								alt={request.sender.username}
							/>
						) : (
							<AvatarFallback>
								{request.sender.profile?.name?.charAt(0) ||
									request.sender.username.charAt(0)}
							</AvatarFallback>
						)}
					</Avatar>

					<div className="flex-1">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<span className="font-semibold">
									{request.sender.profile?.name ||
										request.sender.username}
								</span>
								<Badge
									className={`text-xs ${getRoleColor(
										request.sender.role
									)}`}
								>
									{request.sender.role}
								</Badge>
							</div>
							<div className="flex items-center gap-2">
								<Badge
									variant="outline"
									className={`text-xs ${getStatusColor(
										request.status
									)}`}
								>
									{request.status}
								</Badge>
								{request.seen && (
									<CheckCheck className="h-4 w-4 text-blue-500" />
								)}
								{!request.seen && (
									<Check className="h-4 w-4 text-gray-400" />
								)}
							</div>
						</div>

						<p className="text-gray-700 mb-2">
							{trimMessage(request.message)}
						</p>

						<div className="flex justify-between items-center text-sm text-gray-500">
							<span>
								{formatDistanceToNow(
									new Date(request.createdAt),
									{ addSuffix: true }
								)}
							</span>
							<Badge variant="secondary" className="text-xs">
								{request.type}
							</Badge>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default RequestItem;
