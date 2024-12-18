import { motion } from "framer-motion";
import { UserIcon, SearchIcon, ChartPieIcon } from "lucide-react";

const steps = [
	{
		name: "Create your profile",
		description: "Sign up and create your profile as a mentor or mentee.",
		icon: UserIcon,
	},
	{
		name: "Find your match",
		description:
			"Search for mentors or mentees based on your interests and goals.",
		icon: SearchIcon,
	},
	{
		name: "Start your journey",
		description:
			"Connect with your match and begin your mentorship journey.",
		icon: ChartPieIcon,
	},
];

export default function HowItWorks() {
	return (
		<div className="py-12 sm:py-16 lg:py-20">
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="lg:text-center">
					<h2 className="text-2xl text-indigo-600 font-semibold tracking-wide uppercase">
						How it works
					</h2>
					<p className="mt-12 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Start your mentorship journey in 3 easy steps
					</p>
				</div>

				<div className="mt-16">
					<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
						{steps.map((step, index) => (
							<motion.div
								key={step.name}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.2,
								}}
								className="relative"
							>
								<dt>
									<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
										<step.icon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</div>
									<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
										{step.name}
									</p>
								</dt>
								<dd className="mt-2 ml-16 text-base text-gray-700">
									{step.description}
								</dd>
							</motion.div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
