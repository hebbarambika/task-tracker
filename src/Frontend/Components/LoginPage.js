import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginEnabled, setLoginEnabled] = useState(false);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		setLoginEnabled(event.target.value !== "" && password !== "");
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		setLoginEnabled(email !== "" && event.target.value !== "");
	};

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				"http://localhost:5000/api/users/login",
				{
					email,
					password,
				}
			);
			alert("Login successful: " + response.data.message);
			console.log("Login successful:", response.data);
		} catch (error) {
			alert(
				"Error during login: " +
					(error.response ? error.response.data.message : "Server error")
			);
			console.error(
				"Error during login:",
				error.response ? error.response.data : error.message
			);
		}
	};

	return (
		<section className='vh-100' style={{ backgroundColor: "#9A616D" }}>
			<div className='container py-5 h-100'>
				<div className='row d-flex justify-content-center align-items-center h-100'>
					<div className='col col-xl-10'>
						<div className='card' style={{ borderRadius: "1rem" }}>
							<div className='row g-0'>
								<div className='col-md-6 col-lg-5 d-none d-md-block'>
									<img
										src='https://img.freepik.com/free-vector/mobile-retail-ecommerce-concept_3446-460.jpg?w=740&t=st=1716276576~exp=1716277176~hmac=e98e0375059784982238c12b84571b505744d0138550be0102c44a04f71936b1'
										alt='login form'
										className='img-fluid'
										style={{ borderRadius: "1rem 0 0 1rem" }}
									/>
								</div>
								<div className='col-md-6 col-lg-7 d-flex align-items-center'>
									<div className='card-body p-4 p-lg-5 text-black'>
										<form>
											<div className='d-flex align-items-center mb-3 pb-1'>
												<i
													className='fas fa-cubes fa-2x me-3'
													style={{ color: "#ff6219" }}
												></i>
												<span className='h1 fw-bold mb-0'>BizCart4all</span>
											</div>

											<h5
												className='fw-normal mb-3 pb-3'
												style={{ letterSpacing: "1px" }}
											>
												Sign into your account
											</h5>

											<div className='form-outline mb-4'>
												<input
													type='email'
													id='form2Example17'
													className='form-control form-control-lg'
													value={email}
													onChange={handleEmailChange}
												/>
												<label className='form-label' htmlFor='form2Example17'>
													Email address
												</label>
											</div>

											<div className='form-outline mb-4'>
												<input
													type='password'
													id='form2Example27'
													className='form-control form-control-lg'
													value={password}
													onChange={handlePasswordChange}
												/>
												<label className='form-label' htmlFor='form2Example27'>
													Password
												</label>
											</div>

											<div className='pt-1 mb-4'>
												<button
													className='btn btn-dark btn-lg btn-block'
													type='button'
													onClick={handleLogin}
													disabled={!loginEnabled}
												>
													Login
												</button>
											</div>

											<a className='small text-muted' href='#!'>
												Forgot password?
											</a>
											<p className='mb-5 pb-lg-2' style={{ color: "#393f81" }}>
												Don't have an account?{" "}
												<Link to='/signup' style={{ color: "#393f81" }}>
													Register here
												</Link>
											</p>
											<a href='#!' className='small text-muted'>
												Terms of use.
											</a>
											<a href='#!' className='small text-muted'>
												Privacy policy
											</a>
										</form>
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

export default LoginPage;
