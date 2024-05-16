const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	role: {
		type: String,
		enum: ["buyer", "vendor"],
		default: "buyer",
		required: true,
	},
	companyName: {
		type: String,
		required: function () {
			return this.role === "vendor";
		},
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
});

const User = mongoose.model("User", userSchema);
module.exports = User;
