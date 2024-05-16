import React, { useState } from "react";

const LoginPage = () => {
	const [userType, setUserType] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginEnabled, setLoginEnabled] = useState(false);

	const handleUserTypeChange = (event) => {
		setUserType(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		setLoginEnabled(event.target.value !== "" && password !== "");
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		setLoginEnabled(email !== "" && event.target.value !== "");
	};

	const handleLogin = () => {
		// Add your login logic here using userType, email, and password
		console.log(
			`Logging in as ${userType} with email: ${email} and password: ${password}`
		);
	};

	return (
		<div>
			<h1>Login Page</h1>
			<label>
				Select User Type:
				<select value={userType} onChange={handleUserTypeChange}>
					<option value=''>Select User Type</option>
					<option value='buyer'>Buyer</option>
					<option value='administrator'>Administrator</option>
					<option value='vendor'>Vendor</option>
				</select>
			</label>
			<br />
			<label>
				Email:
				<input type='email' value={email} onChange={handleEmailChange} />
			</label>
			<br />
			<label>
				Password:
				<input
					type='password'
					value={password}
					onChange={handlePasswordChange}
				/>
			</label>
			<br />
			<button onClick={handleLogin} disabled={!loginEnabled}>
				Login
			</button>
		</div>
	);
};

export default LoginPage;
