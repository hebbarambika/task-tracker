import React, { useState, useEffect } from "react";
import axios from "axios";

const SignupPage = () => {
	const [role, setRole] = useState("buyer"); // Set default role to "buyer"
	const [companyName, setCompanyName] = useState("");
	const [companyWebsite, setCompanyWebsite] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [signupEnabled, setSignupEnabled] = useState(false);
	const [error, setError] = useState("");

	const handleRoleChange = (event) => {
		setRole(event.target.value);
	};

	useEffect(() => {
		setCompanyName("");
		setCompanyWebsite("");
		setFirstName("");
		setLastName("");
		setEmail("");
		setPhoneNumber("");
		setPassword("");
		setConfirmPassword("");
		setSignupEnabled(false);
	}, [role]);

	useEffect(() => {
		validateSignup();
	}, [
		role,
		companyName,
		firstName,
		lastName,
		email,
		phoneNumber,
		password,
		confirmPassword,
	]);

	const handleCompanyNameChange = (event) => {
		setCompanyName(event.target.value);
	};

	const handleCompanyWebsiteChange = (event) => {
		setCompanyWebsite(event.target.value);
	};

	const handleFirstNameChange = (event) => {
		setFirstName(event.target.value);
	};

	const handleLastNameChange = (event) => {
		setLastName(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePhoneNumberChange = (event) => {
		setPhoneNumber(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleConfirmPasswordChange = (event) => {
		setConfirmPassword(event.target.value);
	};

	const validateSignup = () => {
		if (role === "vendor") {
			if (
				companyName.trim() !== "" &&
				firstName.trim() !== "" &&
				lastName.trim() !== "" &&
				email.trim() !== "" &&
				phoneNumber.trim() !== "" &&
				password.trim() !== "" &&
				confirmPassword.trim() !== "" &&
				password === confirmPassword
			) {
				setSignupEnabled(true);
			} else {
				setSignupEnabled(false);
			}
		} else if (role === "buyer") {
			if (
				firstName.trim() !== "" &&
				lastName.trim() !== "" &&
				email.trim() !== "" &&
				phoneNumber.trim() !== "" &&
				password.trim() !== "" &&
				confirmPassword.trim() !== "" &&
				password === confirmPassword
			) {
				setSignupEnabled(true);
			} else {
				setSignupEnabled(false);
			}
		} else {
			setSignupEnabled(false);
		}
	};

	const handleSignup = async () => {
		setError("");
		try {
			const response = await axios.post(
				"http://localhost:5000/api/users/signup",
				{
					role,
					companyName,
					companyWebsite,
					firstName,
					lastName,
					email,
					phoneNumber,
					password,
					confirmPassword,
				}
			);
			console.log("Signup successful:", response.data);
		} catch (error) {
			setError(error.response ? error.response.data.message : "Server error");
			console.error(
				"Error during signup:",
				error.response ? error.response.data : error.message
			);
		}
	};
	return (
		<div>
			<div className='signup-box'>
				<h1>Sign Up</h1>
				<label>
					Role:
					<select value={role} onChange={handleRoleChange}>
						<option value='buyer'>Buyer</option>
						<option value='vendor'>Vendor</option>
					</select>
				</label>
				<br />
				{role === "vendor" && (
					<>
						<input
							type='text'
							placeholder='Company Name'
							value={companyName}
							onChange={handleCompanyNameChange}
						/>
						<br />
						<input
							type='text'
							placeholder='Company Website'
							value={companyWebsite}
							onChange={handleCompanyWebsiteChange}
						/>
						<br />
					</>
				)}
				<input
					type='text'
					placeholder='First Name'
					value={firstName}
					onChange={handleFirstNameChange}
				/>
				<br />
				<input
					type='text'
					placeholder='Last Name'
					value={lastName}
					onChange={handleLastNameChange}
				/>
				<br />
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={handleEmailChange}
				/>
				<br />
				<input
					type='tel'
					placeholder='Phone Number'
					value={phoneNumber}
					onChange={handlePhoneNumberChange}
				/>
				<br />
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={handlePasswordChange}
				/>
				<br />
				<input
					type='password'
					placeholder='Confirm Password'
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
				/>
				<br />
				<button onClick={handleSignup} disabled={!signupEnabled}>
					Sign Up
				</button>
			</div>
		</div>
	);
};

export default SignupPage;
