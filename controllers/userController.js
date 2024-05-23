const Vendor = require("../models/Vendor");
const Buyer = require("../models/Buyer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register user controller
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
		street,
		additionalInfo,
		zipCode,
		place,
		country,
	} = req.body;

	// Validation
	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Passwords do not match" });
	}

	try {
		// Check if the user already exists in the Vendor collection
		const existingVendor = await Vendor.findOne({ email });
		if (existingVendor) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Check if the user already exists in the Buyer collection
		const existingBuyer = await Buyer.findOne({ email });
		if (existingBuyer) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user object based on role
		let newUser;
		if (role === "vendor") {
			newUser = new Vendor({
				companyName,
				companyWebsite,
				firstName,
				lastName,
				email,
				phoneNumber,
				password: hashedPassword,
				confirmPassword: hashedPassword,
				street,
				additionalInfo,
				zipCode,
				place,
				country,
			});
		} else if (role === "buyer") {
			newUser = new Buyer({
				firstName,
				lastName,
				email,
				phoneNumber,
				password: hashedPassword,
				confirmPassword: hashedPassword,
				street,
				additionalInfo,
				zipCode,
				place,
				country,
			});
		} else {
			return res.status(400).json({ message: "Invalid role" });
		}

		// Save the user to the database
		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error during user registration:", error);
		res.status(500).json({ message: "Server error", error });
	}
};
// User login controller
exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Check if the user exists in the Vendor collection
		const vendor = await Vendor.findOne({ email });
		if (vendor) {
			// Check the password
			const isMatch = await bcrypt.compare(password, vendor.password);
			if (!isMatch) {
				return res.status(400).json({ message: "Incorrect Password" });
			}

			// Check if vendor is verified
			if (!vendor.vendorID) {
				return res.status(400).json({ message: "You are yet to be verified" });
			}

			// Create a JWT token
			const token = jwt.sign({ userId: vendor._id }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});

			return res.json({ message: "Login successful!", token });
		}

		// Check if the user exists in the Buyer collection
		const buyer = await Buyer.findOne({ email });
		if (buyer) {
			// Check the password
			const isMatch = await bcrypt.compare(password, buyer.password);
			if (!isMatch) {
				return res.status(400).json({ message: "Incorrect Password" });
			}

			// Create a JWT token
			const token = jwt.sign({ userId: buyer._id }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});

			return res.json({ message: "Login successful!", token });
		}

		// If the user is not found in either collection
		return res.status(400).json({ message: "Invalid credentials" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};
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
