import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface TeamMember {
	name: string;
	role: string;
	image: string;
	bio: string;
}

const teamMembers: TeamMember[] = [
	{
		name: "Sarah Johnson",
		role: "Founder & CEO",
		image: "https://randomuser.me/api/portraits/med/women/12.jpg",
		bio: "Sarah has over 15 years of experience in tech and is passionate about connecting people through mentorship.",
	},
	{
		name: "Michael Chen",
		role: "CTO",
		image: "https://randomuser.me/api/portraits/med/men/15.jpg",
		bio: "Michael is an experienced software engineer with a focus on creating scalable and user-friendly platforms.",
	},
	{
		name: "Emily Rodriguez",
		role: "Head of Community",
		image: "https://randomuser.me/api/portraits/med/men/32.jpg",
		bio: "Emily is dedicated to fostering meaningful connections and ensuring a positive experience for all MentorMatch users.",
	},
];

export default function About() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="bg-white"
		>
			<div className="relative bg-indigo-800 text-white">
				<div className="absolute inset-0">
					<img
						className="w-full h-full object-cover"
						src="/team_collab.jpg"
						alt="Team collaboration"
					/>
					<div
						className="absolute inset-0 bg-indigo-400 mix-blend-multiply"
						aria-hidden="true"
					></div>
				</div>
				<div className="relative max-w-full mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
					<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
						About MentorMatch
					</h1>
					<p className="mt-6 max-w-3xl text-xl text-indigo-100">
						Connecting mentors and mentees to foster growth, share
						knowledge, and build successful careers.
					</p>
				</div>
			</div>

			<div className="bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
				<div className="max-w-full mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
							Our Mission
						</h2>
						<p className="mt-4 text-xl text-gray-500">
							At{" "}
							<span className="font-bold text-indigo-600">
								Guidly
							</span>
							, we believe that everyone has the potential to grow
							and succeed with the right guidance. Our mission is
							to create a global community where knowledge is
							shared freely, connections are made easily, and
							careers are advanced through meaningful mentorship
							relationships.
						</p>
					</motion.div>
				</div>
			</div>

			<div className="py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
				<div className="max-w-full mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
							Our Values
						</h2>
						<dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
							{[
								{
									name: "Connection",
									description:
										"We believe in the power of human connections to drive personal and professional growth.",
								},
								{
									name: "Growth",
									description:
										"We are committed to fostering an environment that encourages continuous learning and development.",
								},
								{
									name: "Inclusivity",
									description:
										"We strive to create a diverse and inclusive community where everyone feels welcome and valued.",
								},
								{
									name: "Impact",
									description:
										"We aim to make a positive impact on individuals careers and the broader professional landscape.",
								},
							].map((value) => (
								<div
									key={value.name}
									className="relative border p-4 rounded-sm shadow-md"
								>
									<dt>
										<p className="text-lg leading-6 font-medium text-gray-900">
											{value.name}
										</p>
									</dt>
									<dd className="mt-2 text-base text-gray-600">
										{value.description}
									</dd>
								</div>
							))}
						</dl>
					</motion.div>
				</div>
			</div>

			<div className="bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
				<div className="max-w-full mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
							Meet Our Team
						</h2>
						<p className="mt-4 max-w-3xl text-xl text-gray-500">
							The passionate individuals behind MentorMatch,
							dedicated to making mentorship accessible to all.
						</p>
						<div className="mt-12 grid gap-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
							{teamMembers.map((member) => (
								<div key={member.name}>
									<div>
										<img
											className="object-cover shadow-lg rounded-lg"
											src={member.image}
											alt={member.name}
										/>
									</div>
									<div className="mt-4">
										<h3 className="text-lg font-medium text-gray-900">
											{member.name}
										</h3>
										<p className="text-sm font-medium text-indigo-600">
											{member.role}
										</p>
									</div>
									<div className="mt-2 text-base text-gray-600">
										<p>{member.bio}</p>
									</div>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>

			<div className="bg-indigo-700">
				<div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
						<span className="block">
							Ready to start your mentorship journey?
						</span>
					</h2>
					<p className="mt-4 text-lg leading-6 text-indigo-200">
						Join MentorMatch today and connect with mentors who can
						help guide your career to new heights.
					</p>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Link
							to="/signup"
							className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
						>
							Sign Up Now
						</Link>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}
