import { motion } from "framer-motion";
import { Calendar, MapPin, User2 } from "lucide-react";
import { formatDate } from "@/utils/Date";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MentorData } from "@/types/mentor";
import { useNavigate } from "react-router-dom";

export const MentorCard = ({ mentors }: { mentors: MentorData[] }) => {
	const navigate = useNavigate();

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{mentors.map((mentor) => (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					whileHover={{ y: -5 }}
					transition={{ duration: 0.3 }}
					onClick={() => navigate(`/mentor/${mentor.id}`)}
					key={mentor.id}
				>
					<Card className="overflow-hidden group cursor-pointer bg-card hover:shadow-xl transition-all duration-300">
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

							<div className="p-4">
								<div className="flex gap-2 flex-col">
									<div className="flex justify-between">
										<div className="flex flex-col gap-1">
											<h3 className="text-lg font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">
												{mentor.profile.name}
											</h3>
											<p className="text-sm text-muted-foreground">
												@{mentor.username}
											</p>
										</div>

										<motion.div
											whileHover={{ scale: 1.05 }}
											transition={{
												type: "spring",
												stiffness: 300,
											}}
										>
											<Avatar className="w-14 h-14 border-2 border-primary/10">
												<AvatarImage
													src={
														import.meta.env
															.VITE_API_URL +
														"/public/uploads/" +
														mentor.profile.avatar
													}
													alt={mentor.profile.name}
												/>
												<AvatarFallback className="bg-primary/5">
													{mentor.profile.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
										</motion.div>
									</div>

									<Separator />

									<div className="flex-1 space-y-2">
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<MapPin className="w-4 h-4" />
											<span>
												{mentor.profile.location}
											</span>
										</div>

										<p className="text-sm leading-relaxed">
											{mentor.profile.bio.length > 75
												? `${mentor.profile.bio.substring(
														0,
														75
												  )}...`
												: mentor.profile.bio}
										</p>

										<div className="flex items-center flex-wrap gap-4 pt-2 text-xs text-muted-foreground">
											<div className="flex items-center gap-1">
												<Calendar className="w-3 h-3" />
												<span>
													Joined{" "}
													{formatDate(
														mentor.profile.createdAt
													)}
												</span>
											</div>
											<div className="flex items-center gap-1">
												<User2 className="w-3 h-3" />
												<span>
													Member ID:{" "}
													{mentor.id.substring(0, 11)}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</motion.div>
			))}
		</div>
	);
};
