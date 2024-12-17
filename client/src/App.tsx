import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, Explore, Home, Login, SignUp } from "@/pages";
import { Layout } from "@/components";

function App() {
	return (
		<Router>
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
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</Router>
	);
}

export default App;
