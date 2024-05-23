const mongoose = require("mongoose");
const { Schema } = mongoose;

// Buyer Schema
const buyerSchema = new Schema({
	role: {
		type: String,
		enum: ["buyer"],
		default: "buyer",
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		match: [/.+\@.+\..+/, "Please fill a valid email address"],
	},
	phoneNumber: {
		type: String,
		required: true,
		match: [/^[0-9]{10}$/, "Please fill a valid phone number"],
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	confirmPassword: {
		type: String,
		required: true,
		minlength: 6,
		validate: {
			validator: function (value) {
				return value === this.password;
			},
			message: "Passwords do not match",
		},
	},
	signupDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	// Address fields
	street: {
		type: String,
		required: true,
	},
	additionalInfo: {
		type: String,
	},
	zipCode: {
		type: String,
		required: true,
	},
	place: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
});
const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
