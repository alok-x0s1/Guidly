import { ourValues } from "@/utils/data";
import { motion } from "framer-motion";

export const OurValues = () => {
	return (
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
						{ourValues.map((value) => (
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
	);
};
