import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/dashboard";

export const UserAvatar = ({ user }: { user: User }) => (
	<Avatar className="h-10 w-10">
		{user.profile?.avatar ? (
			<AvatarImage
				src={
					import.meta.env.VITE_API_URL +
					"/public/uploads/" +
					user.profile.avatar
				}
				alt={user.profile.name || user.username}
				onError={(e) => {
					(e.target as HTMLImageElement).style.display = "none";
				}}
			/>
		) : (
			<AvatarFallback>
				{(user.profile?.name || user.username).charAt(0).toUpperCase()}
			</AvatarFallback>
		)}
	</Avatar>
);
