import { ReactNode } from "react";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
}
