import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, MenuIcon, XIcon } from "lucide-react";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const navItems = [
		{ name: "About", href: "/about" },
		{ name: "Mentorship?", href: "/explore" },
		{ name: "Join Now", href: "/signup" },
	];

	return (
		<nav className="border-b">
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between py-3 items-center">
					<div className="flex-shrink-0 flex">
						<Link
							to="/"
							className="text-4xl font-bold text-indigo-600 tracking-tighter"
						>
							Guidly
						</Link>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:space-x-6">
						{navItems.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className="hover:text-indigo-600 px-2 py-2 rounded-md text-[17px] font-medium duration-300 tracking-tight"
							>
								{item.name}
							</Link>
						))}

						<Link
							to="/notifications"
							className="hover:text-indigo-600 px-2 py-2 rounded-md text-[17px] font-medium duration-300 tracking-tight"
						>
							<Bell className="h-6 w-6" />
						</Link>
					</div>
					<div className="-mr-2 flex items-center sm:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						>
							<span className="sr-only">Open main menu</span>
							{isOpen ? (
								<XIcon
									className="block h-6 w-6"
									aria-hidden="true"
								/>
							) : (
								<MenuIcon
									className="block h-6 w-6"
									aria-hidden="true"
								/>
							)}
						</button>
					</div>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
				transition={{ duration: 0.2 }}
				className={`${isOpen ? "block" : "hidden"} sm:hidden`}
			>
				<div className="px-2 pt-2 pb-3 space-y-1">
					{navItems.map((item) => (
						<Link
							key={item.name}
							to={item.href}
							className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
							onClick={() => setIsOpen(false)}
						>
							{item.name}
						</Link>
					))}
				</div>
			</motion.div>
		</nav>
	);
}
