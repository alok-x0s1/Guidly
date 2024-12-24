import { teamMembers } from "@/utils/data";
import { motion } from "framer-motion";

export const OurTeam = () => {
	return (
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
						The passionate individuals behind Guidly, dedicated to
						making mentorship accessible to all.
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
	);
};
