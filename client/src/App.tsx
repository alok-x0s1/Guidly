import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	About,
	Contact,
	Explore,
	Home,
	Login,
	NotFound,
	Profile,
	SignUp,
} from "@/pages";
import { Layout } from "@/components";
import { Toaster } from "./components/ui/toaster";

function App() {
	return (
		<Router>
			<div>
				<Toaster />

				<Routes>
					<Route path="/" element={<Layout children={<Home />} />} />
					<Route
						path="/explore"
						element={<Layout children={<Explore />} />}
					/>
					<Route
						path="/about"
						element={<Layout children={<About />} />}
					/>
					<Route
						path="/profile"
						element={<Layout children={<Profile />} />}
					/>
					<Route
						path="/contact"
						element={<Layout children={<Contact />} />}
					/>
					<Route path="/signin" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
