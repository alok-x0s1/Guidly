import { Error, Loading, MentorProfileCard } from "@/components";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useMentorProfile } from "@/hooks/useMentorProfile";

export const MentorProfile = () => {
	const { id } = useParams();
	const { loading, mentor, error } = useMentorProfile(id);

	if (loading) {
		return <Loading placeholder="Loading Mentor Profile..." />;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex justify-center items-center px-4 py-8"
		>
			{error ? (
				<Error title="Error" error={error} />
			) : (
				mentor && <MentorProfileCard mentor={mentor} />
			)}
		</motion.div>
	);
};
