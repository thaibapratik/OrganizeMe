import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import TodoPage from "./pages/TodoPage";
import "react-toastify/dist/ReactToastify.css";

import NotePage from "./pages/NotePage";
import { ToastContainer } from "react-toastify";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Navigate to="/" />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/todos" element={<TodoPage />} />
					<Route path="/notes" element={<NotePage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</div>
	);
};
export default App;
