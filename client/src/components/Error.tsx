import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ErrorDisplayProps {
	title: string;
	error: string;
	redirect?: boolean;
}

export default function Error({
	error,
	title,
	redirect = false,
}: ErrorDisplayProps) {
	const isUnauthorized = error === "Unauthorized request, Please login";
	const navigate = useNavigate();

	useEffect(() => {
		if (isUnauthorized && redirect) {
			navigate("/signin", { replace: true });
		}
	}, [isUnauthorized, redirect, navigate]);

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className="bg-red-50 border-l-4 hover:shadow-md duration-300 border-red-400 p-4 rounded-md mb-4 cursor-pointer"
		>
			<div className="flex items-start min-w-[450px]">
				<div className="flex-shrink-0">
					<XCircle
						className="h-6 w-6 text-red-500"
						aria-hidden="true"
					/>
				</div>
				<div className="ml-3">
					<h3 className="text-lg font-medium text-red-800">
						{isUnauthorized ? "Unauthorized Request" : title}
					</h3>
					<div className="mt-2 text-base text-red-700">
						<p>
							{isUnauthorized
								? "You are not logged in. Please log in first."
								: error}
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
