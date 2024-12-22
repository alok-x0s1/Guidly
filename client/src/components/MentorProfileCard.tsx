import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ProfileData as UserProfile } from "@/types/user";
import { motion } from "framer-motion";
import { SendMentorshipRequest } from "./SendMentorshipRequest";

export const MentorProfileCard = ({ mentor }: { mentor: UserProfile }) => {
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
					<motion.div
						className="w-32 h-32 overflow-hidden border rounded-full hover:shadow-sm"
						whileHover={{ scale: 1.05 }}
						transition={{
							type: "spring",
							stiffness: 300,
						}}
					>
						<img
							src={
								import.meta.env.VITE_API_URL +
								"/public/uploads/" +
								mentor.avatar
							}
							alt="user_avatar"
							className="w-32 h-32 rounded-full cursor-pointer"
						/>
					</motion.div>
					<div>
						<Label>Name</Label>
						<p className="text-lg">
							{mentor.name} [@{mentor.user.username}]
						</p>
					</div>
					<div>
						<Label>Bio</Label>
						<p className="text-lg">{mentor.bio}</p>
					</div>
					<div>
						<Label>Location</Label>
						<p className="text-lg">{mentor.location}</p>
					</div>
					<div>
						<Label>Skills</Label>
						<p className="text-lg">
							{mentor.skills
								.map((skill) => skill.skill.name)
								.join(", ")}
						</p>
					</div>
					<div>
						<Label>Interests</Label>
						<p className="text-lg">
							{mentor.interests
								.map((interest) => interest.interest.name)
								.join(", ")}
						</p>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<SendMentorshipRequest mentorId={mentor.user.id} />
			</CardFooter>
		</Card>
	);
};
