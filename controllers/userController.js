const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration controller
exports.registerUser = async (req, res) => {
	const {
		role,
		companyName,
		companyWebsite,
		firstName,
		lastName,
		email,
		phoneNumber,
		password,
		confirmPassword,
	} = req.body;

	// Validation
	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Passwords do not match" });
	}

	try {
		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({
			role,
			companyName,
			companyWebsite,
			firstName,
			lastName,
			email,
			phoneNumber,
			password: hashedPassword,
			confirmPassword: hashedPassword,
			signupDate: new Date(),
		});

		// Save the user to the database
		await newUser.save();
		console.log("user added");

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error during user registration:", error);
		res.status(500).json({ message: "Server error", error });
	}
};

// User login controller
// exports.loginUser = async (req, res) => {
// 	const { email, password } = req.body;

// 	try {
// 		// Find the user by email
// 		const user = await User.findOne({ email });
// 		if (!user) {
// 			return res.status(400).json({ message: "Invalid credentials" });
// 		}

// 		// Check the password
// 		const isMatch = await bcrypt.compare(password, user.password);
// 		if (!isMatch) {
// 			return res.status(400).json({ message: "Invalid credentials" });
// 		}

// 		// Create a JWT token
// 		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
// 			expiresIn: "1h",
// 		});

// 		res.json({ token });
// 	} catch (error) {
// 		res.status(500).json({ message: "Server error", error });
// 	}
// };

// Get user profile controller
// exports.getUserProfile = async (req, res) => {
// 	// Assuming you have middleware to authenticate and set req.user
// 	const userId = req.user.id;

// 	try {
// 		const user = await User.findById(userId).select(
// 			"-password -confirmPassword"
// 		);
// 		if (!user) {
// 			return res.status(404).json({ message: "User not found" });
// 		}

// 		res.json(user);
// 	} catch (error) {
// 		res.status(500).json({ message: "Server error", error });
// 	}
// };

// Update user profile controller
// exports.updateUserProfile = async (req, res) => {
// 	const userId = req.user.id;
// 	const { firstName, lastName, phoneNumber, companyName, companyWebsite } =
// 		req.body;

// 	try {
// 		const updatedUser = await User.findByIdAndUpdate(
// 			userId,
// 			{ firstName, lastName, phoneNumber, companyName, companyWebsite },
// 			{ new: true, runValidators: true }
// 		).select("-password -confirmPassword");

// 		res.json(updatedUser);
// 	} catch (error) {
// 		res.status(500).json({ message: "Server error", error });
// 	}
// };

// Delete user account controller
// exports.deleteUserAccount = async (req, res) => {
// 	const userId = req.user.id;

// 	try {
// 		await User.findByIdAndDelete(userId);
// 		res.json({ message: "User account deleted successfully" });
// 	} catch (error) {
// 		res.status(500).json({ message: "Server error", error });
// 	}
// };
