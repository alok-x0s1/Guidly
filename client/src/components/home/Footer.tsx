import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="bg-gray-50 text-black">
			<div className="max-w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="space-y-8 xl:col-span-1">
						<Link
							to="/"
							className="text-2xl font-bold text-indigo-600"
						>
							Guidly
						</Link>
						<p className="text-base">
							Connecting mentors and mentees for mutual growth and
							success.
						</p>
					</div>
					<div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
									Company
								</h3>
								<ul className="mt-4 space-y-4">
									<li>
										<Link
											to="/about"
											className="text-base text-gray-700 hover:text-indigo-600 duration-300"
										>
											About
										</Link>
									</li>
									<li>
										<Link
											to="/careers"
											className="text-base text-gray-700 hover:text-indigo-600 duration-300"
										>
											Careers
										</Link>
									</li>
									<li>
										<Link
											to="/contact"
											className="text-base text-gray-700 hover:text-indigo-600 duration-300"
										>
											Contact
										</Link>
									</li>
								</ul>
							</div>
							<div className="mt-12 md:mt-0">
								<h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
									Legal
								</h3>
								<ul className="mt-4 space-y-4">
									<li>
										<Link
											to="/privacy"
											className="text-base text-gray-700 hover:text-indigo-600 duration-300"
										>
											Privacy Policy
										</Link>
									</li>
									<li>
										<Link
											to="/terms"
											className="text-base text-gray-700 hover:text-indigo-600 duration-300"
										>
											Terms of Service
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-12 border-t border-gray-400 pt-8">
					<p className="text-base text-gray-800 xl:text-center">
						&copy; {new Date().getFullYear()} Guidly. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
