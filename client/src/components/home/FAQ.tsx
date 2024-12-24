import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, MinusIcon } from "lucide-react";
import { faqs } from "@/utils/data";

export default function FAQ() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	return (
		<section className="py-12 sm:py-16 lg:py-20">
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
					Frequently Asked Questions
				</h2>
				<dl className="space-y-6 divide-y divide-gray-200">
					{faqs.map((faq, index) => (
						<div key={index} className="pt-6">
							<dt className="text-lg">
								<button
									onClick={() =>
										setActiveIndex(
											activeIndex === index ? null : index
										)
									}
									className="text-left w-full flex justify-between items-start text-gray-400"
								>
									<span className="font-medium text-gray-900">
										{faq.question}
									</span>
									<span className="ml-6 h-7 flex items-center">
										{activeIndex === index ? (
											<MinusIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<PlusIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</span>
								</button>
							</dt>
							<AnimatePresence>
								{activeIndex === index && (
									<motion.dd
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ duration: 0.3 }}
										className="mt-2 pr-12"
									>
										<p className="text-base text-gray-500">
											{faq.answer}
										</p>
									</motion.dd>
								)}
							</AnimatePresence>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
