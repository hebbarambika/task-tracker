import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

const HomePage = () => {
	const navigate = useNavigate();

	const handleSignUpClick = () => {
		console.log("Sign Up clicked");
		// Add your sign-up logic here
		navigate("/signup");
	};

	const handleLoginClick = () => {
		console.log("Login clicked");
		// Add your condition checking logic here in the future
		// For now, directly navigate to the login page
		navigate("/login");
	};

	return (
		<div>
			<h1>Welcome to Our Website!</h1>
			<button onClick={handleSignUpClick}>Sign Up</button>
			<button onClick={handleLoginClick}>Login</button>
		</div>
	);
};

export default HomePage;
