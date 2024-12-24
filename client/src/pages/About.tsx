import {
	About as AboutComponent,
	OurMission,
	OurValues,
	OurTeam,
} from "@/components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="bg-white"
		>
			<AboutComponent />
			<OurMission />
			<OurValues />
			<OurTeam />

			<div className="bg-indigo-700">
				<div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
						<span className="block">
							Ready to start your mentorship journey?
						</span>
					</h2>
					<p className="mt-4 text-lg leading-6 text-indigo-200">
						Join Guidly today and connect with mentors who can
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
