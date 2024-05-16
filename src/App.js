import logo from "./logo.svg";
import HomePage from "./Frontend/Components/HomePage";
import LoginPage from "./Frontend/Components/LoginPage";
import Signup from "./Frontend/Components/Signup";

// src/App.js
import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Switch,
} from "react-router-dom";

const App = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	// const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

	// const handleLogout = () => {
	// 	setIsUserLoggedIn(false);
	// };

	return (
		<Router>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<Signup />} />

				<Route path='/' element={<HomePage />} />
				{/* <Route
					path='/'
					element={
						<HomePage
							isUserLoggedIn={isUserLoggedIn}
							setIsUserLoggedIn={setIsUserLoggedIn}
							
						/>
					}
				/> */}
			</Routes>
		</Router>
	);
};

export default App;
