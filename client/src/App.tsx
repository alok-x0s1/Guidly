import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	About,
	Contact,
	Dashboard,
	Explore,
	Home,
	Login,
	MentorProfile,
	NotFound,
	Notifications,
	Profile,
	SignUp,
	SingleNotification,
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
						path="/mentor/:id"
						element={<Layout children={<MentorProfile />} />}
					/>
					<Route
						path="/notifications"
						element={<Layout children={<Notifications />} />}
					/>
					<Route
						path="/notifications/:id"
						element={<Layout children={<SingleNotification />} />}
					/>
					<Route
						path="/contact"
						element={<Layout children={<Contact />} />}
					/>
					<Route
						path="/dashboard"
						element={<Layout children={<Dashboard />} />}
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
