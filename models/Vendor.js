const mongoose = require("mongoose");
const { Schema } = mongoose;

// Vendor Schema
const vendorSchema = new Schema({
	role: {
		type: String,
		enum: ["vendor"],
		default: "vendor",
		required: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	companyWebsite: {
		type: String,
		validate: {
			validator: function (v) {
				return !v || /^(http|https):\/\/[^ "]+$/.test(v);
			},
			message: (props) => `${props.value} is not a valid URL!`,
		},
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
	// Vendor-specific field
	vendorID: {
		type: String,
		default: "", // or null, or any other default value indicating no vendorID assigned yet
	},
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
