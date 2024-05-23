import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
	const [role, setRole] = useState("buyer");
	const [companyName, setCompanyName] = useState("");
	const [companyWebsite, setCompanyWebsite] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [street, setStreet] = useState("");
	const [additionalInfo, setAdditionalInfo] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [place, setPlace] = useState("");
	const [country, setCountry] = useState("");
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
		setStreet("");
		setAdditionalInfo("");
		setZipCode("");
		setPlace("");
		setCountry("");
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
		street,
		additionalInfo,
		zipCode,
		place,
		country,
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

	const handleStreetChange = (event) => {
		setStreet(event.target.value);
	};

	const handleAdditionalInfoChange = (event) => {
		setAdditionalInfo(event.target.value);
	};

	const handleZipCodeChange = (event) => {
		setZipCode(event.target.value);
	};

	const handlePlaceChange = (event) => {
		setPlace(event.target.value);
	};

	const handleCountryChange = (event) => {
		setCountry(event.target.value);
	};

	const validateSignup = () => {
		if ((role === "vendor" && companyName.trim() !== "") || role === "buyer") {
			if (
				firstName.trim() !== "" &&
				lastName.trim() !== "" &&
				email.trim() !== "" &&
				phoneNumber.trim() !== "" &&
				password.trim() !== "" &&
				confirmPassword.trim() !== "" &&
				street.trim() !== "" &&
				zipCode.trim() !== "" &&
				place.trim() !== "" &&
				country.trim() !== "" &&
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
					street,
					additionalInfo,
					zipCode,
					place,
					country,
				}
			);
			alert("Signup successful: " + response.data.message);
		} catch (error) {
			alert(
				"Error during signup: " +
					(error.response ? error.response.data.message : "Server error")
			);
			console.error(
				"Error during signup:",
				error.response ? error.response.data : error.message
			);
		}
	};

	return (
		<section className='h-100 h-custom gradient-custom-2'>
			<div className='container py-5 h-100'>
				<div className='row d-flex justify-content-center align-items-center h-100'>
					<div className='col-12'>
						<div
							className='card card-registration card-registration-2'
							style={{ borderRadius: "15px" }}
						>
							<div className='card-body p-0'>
								<div className='row g-0'>
									<div
										className='col-lg-6'
										style={{ backgroundColor: "#495057" }}
									>
										<div className='p-5 text-white'>
											<h3 className='fw-normal mb-5'>General Information</h3>

											<div className='mb-4 pb-2'>
												<select
													className='form-select form-select-lg'
													value={role}
													onChange={handleRoleChange}
												>
													<option value='buyer'>Buyer</option>
													<option value='vendor'>Vendor</option>
												</select>
											</div>

											{role === "vendor" && (
												<>
													<div className='mb-4 pb-2'>
														<input
															type='text'
															className='form-control form-control-lg'
															placeholder='Company Name'
															value={companyName}
															onChange={handleCompanyNameChange}
														/>
													</div>
													<div className='mb-4 pb-2'>
														<input
															type='text'
															className='form-control form-control-lg'
															placeholder='Company Website'
															value={companyWebsite}
															onChange={handleCompanyWebsiteChange}
														/>
													</div>
												</>
											)}

											<div className='row'>
												<div className='col-md-6 mb-4 pb-2'>
													<input
														type='text'
														className='form-control form-control-lg'
														placeholder='First Name'
														value={firstName}
														onChange={handleFirstNameChange}
													/>
												</div>
												<div className='col-md-6 mb-4 pb-2'>
													<input
														type='text'
														className='form-control form-control-lg'
														placeholder='Last Name'
														value={lastName}
														onChange={handleLastNameChange}
													/>
												</div>
											</div>

											<div className='mb-4 pb-2'>
												<input
													type='email'
													className='form-control form-control-lg'
													placeholder='Email'
													value={email}
													onChange={handleEmailChange}
												/>
											</div>
											<div className='mb-4 pb-2'>
												<input
													type='tel'
													className='form-control form-control-lg'
													placeholder='Phone Number'
													value={phoneNumber}
													onChange={handlePhoneNumberChange}
												/>
											</div>
											<div className='mb-4 pb-2'>
												<input
													type='password'
													className='form-control form-control-lg'
													placeholder='Password'
													value={password}
													onChange={handlePasswordChange}
												/>
											</div>
											<div className='mb-4 pb-2'>
												<input
													type='password'
													className='form-control form-control-lg'
													placeholder='Confirm Password'
													value={confirmPassword}
													onChange={handleConfirmPasswordChange}
												/>
											</div>
										</div>
									</div>
									<div
										className='col-lg-6'
										style={{ backgroundColor: "#0d6efd" }}
									>
										<div className='p-5 text-white'>
											<h3 className='fw-normal mb-5'>Address Details</h3>

											<div className='mb-4 pb-2'>
												<input
													type='text'
													className='form-control form-control-lg form-white'
													placeholder='Street + Nr'
													value={street}
													onChange={handleStreetChange}
												/>
											</div>
											<div className='mb-4 pb-2'>
												<input
													type='text'
													className='form-control form-control-lg form-white'
													placeholder='Additional Information'
													value={additionalInfo}
													onChange={handleAdditionalInfoChange}
												/>
											</div>

											<div className='row'>
												<div className='col-md-5 mb-4 pb-2'>
													<input
														type='text'
														className='form-control form-control-lg form-white'
														placeholder='Zip Code'
														value={zipCode}
														onChange={handleZipCodeChange}
													/>
												</div>
												<div className='col-md-7 mb-4 pb-2'>
													<input
														type='text'
														className='form-control form-control-lg form-white'
														placeholder='Place'
														value={place}
														onChange={handlePlaceChange}
													/>
												</div>
											</div>

											<div className='mb-4 pb-2'>
												<input
													type='text'
													className='form-control form-control-lg form-white'
													placeholder='Country'
													value={country}
													onChange={handleCountryChange}
												/>
											</div>

											<button
												type='button'
												className='btn btn-light btn-lg'
												onClick={handleSignup}
												disabled={!signupEnabled}
											>
												Register
											</button>
											<p className='mb-5 pb-lg-2' style={{ color: "white" }}>
												Already have an account?{" "}
												<Link to='/login' style={{ color: "white" }}>
													Signin here
												</Link>
											</p>

											{error && <p className='text-danger mt-3'>{error}</p>}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SignupPage;
