import React from "react";
import "./App.css";
import Layout from "./components/common/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthContextProvider } from "./contexts/AuthContext";
import Subscribe from "./pages/Subscribe";

function App() {
	return (
		<AuthContextProvider>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-in" element={<Login />} />
					<Route path="/subscribe" element={<Subscribe />} />
				</Routes>
			</Layout>
		</AuthContextProvider>
	);
}

export default App;
