import { formatDistanceToNow } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Connection } from "@/types/dashboard";
import { UserAvatar } from "./UserAvatar";
import { UserBadge } from "./UserBadge";

export const ConnectionItem = ({ connection }: { connection: Connection }) => {
	const trimMessage = (message: string, maxLength: number = 100) => {
		if (!message) return "No message provided";
		return message.length > maxLength
			? `${message.slice(0, maxLength)}...`
			: message;
	};

	if (!connection.sender || !connection.receiver) {
		return (
			<Card className="mb-4 bg-gray-50">
				<CardContent className="p-4">
					<p className="text-gray-500">
						Connection details unavailable
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="mb-4 hover:shadow-md transition-shadow">
			<CardContent className="p-4">
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<Badge variant="outline" className="text-xs">
							{connection.status === "ACCEPTED"
								? "Connected"
								: connection.status}
						</Badge>
						<span className="text-sm text-gray-500">
							{formatDistanceToNow(
								new Date(connection.createdAt),
								{ addSuffix: true }
							)}
						</span>
					</div>

					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<UserAvatar user={connection.sender} />
							<UserBadge user={connection.sender} />
						</div>
						<div className="text-gray-400">→</div>
						<div className="flex items-center gap-3">
							<UserAvatar user={connection.receiver} />
							<UserBadge user={connection.receiver} />
						</div>
					</div>

					<div className="bg-gray-50 p-3 rounded-lg">
						<p className="text-gray-700">
							{trimMessage(connection.message)}
						</p>
					</div>

					<div className="flex justify-between items-center text-sm text-gray-500">
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="text-xs">
								{connection.type}
							</Badge>
							{connection.seen && (
								<CheckCheck className="h-4 w-4 text-blue-500" />
							)}
							{!connection.seen && (
								<Check className="h-4 w-4 text-gray-400" />
							)}
						</div>
						<span>
							Last updated:{" "}
							{formatDistanceToNow(
								new Date(connection.updatedAt),
								{ addSuffix: true }
							)}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
