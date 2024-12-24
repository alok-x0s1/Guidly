import { motion } from "framer-motion";

export const OurMission = () => {
	return (
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
						, we believe that everyone has the potential to grow and
						succeed with the right guidance. Our mission is to
						create a global community where knowledge is shared
						freely, connections are made easily, and careers are
						advanced through meaningful mentorship relationships.
					</p>
				</motion.div>
			</div>
		</div>
	);
};
