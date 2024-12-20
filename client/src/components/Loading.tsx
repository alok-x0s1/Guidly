import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const quotes = [
	"A mentor is someone who sees more talent and ability within you than you see in yourself. — John C. Maxwell",
	"Success is not just about making money. It’s about making a difference. — Unknown",
	"Knowledge speaks, but wisdom listens. — Jimi Hendrix",
	"In learning, you will teach, and in teaching, you will learn. — Phil Collins",
	"The best way to predict your future is to create it. — Peter Drucker",
	"The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt",
	"Life is 10% what happens to us and 90% how we react to it. — Charles R. Swindoll",
	"Don’t let yesterday take up too much of today. — Will Rogers",
];

export default function Loading({ placeholder }: { placeholder: string }) {
	const [quote, setQuote] = useState("");

	useEffect(() => {
		setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
	}, []);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center p-4">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center"
			>
				<motion.h2
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className="mt-4 text-2xl font-semibold text-indigo-600"
				>
					{placeholder}
				</motion.h2>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 0.5 }}
					className="mt-4 max-w-md text-center text-gray-600 italic"
				>
					"{quote}"
				</motion.div>
			</motion.div>
		</div>
	);
}
