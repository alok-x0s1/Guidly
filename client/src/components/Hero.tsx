import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
	return (
		<div className="relative overflow-hidden min-h-[calc(100vh-64px)]">
			<div className="max-w-full mx-auto">
				<div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
					<div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
						<div className="sm:text-center lg:text-left">
							<motion.h1
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
							>
								<span className="block xl:inline">
									Find your perfect
								</span>{" "}
								<span className="block text-indigo-600 xl:inline">
									Guide
								</span>
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
								className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
							>
								Connect with experienced mentors or passionate
								mentees in your field. Grow together, learn from
								each other, and achieve your goals.
							</motion.p>
							<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.6 }}
								>
									<Link
										to="/signup"
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 duration-300 md:py-4 md:text-lg md:px-10"
									>
										Get started
									</Link>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.8 }}
								>
									<Link
										to="/explore"
										className="mt-3 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 duration-300 md:py-4 md:text-lg md:px-10 sm:mt-0 sm:ml-3"
									>
										Explore mentors
									</Link>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
				<img
					className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
					src="/hero.jpg"
					alt="People working on laptops"
				/>
			</div>
		</div>
	);
}
