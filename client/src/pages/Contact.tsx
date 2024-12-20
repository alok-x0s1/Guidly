import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "lucide-react";

export default function Contact() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8"
		>
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<motion.h2
					initial={{ y: -20 }}
					animate={{ y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-6 text-center text-3xl font-extrabold text-gray-900"
				>
					Get in touch
				</motion.h2>
				<motion.p
					initial={{ y: -20 }}
					animate={{ y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-2 text-center text-sm text-gray-600 max-w"
				>
					We'd love to hear from you! Connect with us on social media
					or check out our latest projects.
				</motion.p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="text-center text-gray-700 mb-6"
					>
						While we don't have a contact form at the moment, you
						can reach out to us through our social media channels or
						explore our work on GitHub.
					</motion.p>

					<div className="mt-6 flex flex-col space-y-4">
						<motion.a
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							href="https://github.com/alok-x0s1"
							target="_blank"
							rel="noopener noreferrer"
							className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<GithubIcon className="h-5 w-5 mr-2" />
							Check out our GitHub
						</motion.a>

						<motion.a
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							href="https://linkedin.com/in/alok-x0s1"
							target="_blank"
							rel="noopener noreferrer"
							className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<LinkedinIcon className="h-5 w-5 mr-2" />
							Connect on LinkedIn
						</motion.a>
					</div>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="mt-6 text-center text-sm text-gray-500"
					>
						We typically respond within 1-2 business days.
					</motion.p>
				</div>
			</div>
		</motion.div>
	);
}
