import { FAQ, Hero, HowItWorks, Testimonials } from "@/components";
import { motion } from "framer-motion";

export default function Home() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Hero />
			<HowItWorks />
			<Testimonials />
			<FAQ />
		</motion.div>
	);
}
