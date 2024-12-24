import { testimonials } from "@/utils/data";
import { motion } from "framer-motion";

export default function Testimonials() {
	return (
		<section className="py-12 sm:py-16 lg:py-20">
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
					What our users say
				</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							className="bg-gray-50 rounded-lg shadow-md p-6 h-fit border"
						>
							<p className="text-gray-800 mb-4">
								{testimonial.content}
							</p>
							<div className="font-medium text-gray-900">
								{testimonial.author}
							</div>
							<div className="text-gray-600">
								{testimonial.role}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
