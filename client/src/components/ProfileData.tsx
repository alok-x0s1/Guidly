import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { DeleteProfile } from "@/components";
import { UserProfile } from "@/types/user";

export const ProfileData = ({ profile }: { profile: UserProfile }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Profile</CardTitle>
				<CardDescription>
					Here's what others see about you
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<img
							src={
								import.meta.env.VITE_API_URL +
								"/public/uploads/" +
								profile.avatar
							}
							alt="user_avatar"
							className="w-32 h-32 rounded-full"
						/>
					</div>
					<div>
						<Label>Name</Label>
						<p className="text-lg">
							{profile.name} [@{profile.user.username}]
						</p>
					</div>
					<div>
						<Label>Email</Label>
						<p className="text-lg">{profile.user.email}</p>
					</div>
					<div>
						<Label>Bio</Label>
						<p className="text-lg">{profile.bio}</p>
					</div>
					<div>
						<Label>Location</Label>
						<p className="text-lg">{profile.location}</p>
					</div>
					<div>
						<Label>Skills</Label>
						<p className="text-lg">
							{profile.skills
								.map((skill) => skill.skill.name)
								.join(", ")}
						</p>
					</div>
					<div>
						<Label>Interests</Label>
						<p className="text-lg">
							{profile.interests
								.map((interest) => interest.interest.name)
								.join(", ")}
						</p>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col items-end gap-2">
				<div className="flex gap-2">
					<Button>
						<SquarePen />
					</Button>
					<DeleteProfile />
				</div>
				<p className="text-sm mt-1">
					member since {profile.createdAt.toString().slice(0, 10)}
				</p>
			</CardFooter>
		</Card>
	);
};
