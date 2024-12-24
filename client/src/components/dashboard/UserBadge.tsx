import { User } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";

export const UserBadge = ({ user }: { user: User }) => {
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

	return (
		<div className="flex items-center gap-2">
			<span className="font-semibold">
				{user.profile?.name || user.username}
			</span>
			<Badge className={`text-xs ${getRoleColor(user.role)}`}>
				{user.role}
			</Badge>
		</div>
	);
};
