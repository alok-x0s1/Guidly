export const About = () => {
	return (
		<div className="relative bg-indigo-800 text-white">
			<div className="absolute inset-0">
				<img
					className="w-full h-full object-cover"
					src="/team_collab.jpg"
					alt="Team_collaboration"
				/>
				<div
					className="absolute inset-0 bg-indigo-400 mix-blend-multiply"
					aria-hidden="true"
				></div>
			</div>
			<div className="relative max-w-full mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
					About Guidly
				</h1>
				<p className="mt-6 max-w-3xl text-xl text-indigo-100">
					Connecting mentors and mentees to foster growth, share
					knowledge, and build successful careers.
				</p>
			</div>
		</div>
	);
};
