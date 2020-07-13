const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Doctor = require("../models/doctor");

// Register a new Doctor
module.exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		let doctor = await Doctor.findOne({ email: email });

		// Already Registered
		if (doctor) {
			return res.status(200).json({
				message:
					"This email is already registered, try with another email or login instead",
			});
		}

		// Encrypt Password
		const salt = await bcrypt.genSalt(10);
		const hashedPwd = await bcrypt.hash(password, salt);

		let newDoctor = await Doctor.create({ name, email, password: hashedPwd });

		// Issue New JWT
		const token = jwt.sign(newDoctor.toJSON(), process.env.JWTSecret, {
			expiresIn: "1h",
		});

		return res.status(200).json({
			message: `Registration for ${email} successful, token expires in one hour`,
			data: {
				token: token,
			},
		});

	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

module.exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		let doctor = await Doctor.findOne({ email: email });

		if (doctor) {
			//Compare Passwords
			let pwdMatch = await bcrypt.compare(password, doctor.password);
			if (!pwdMatch)
				return res.status(401).json({ message: "Invalid Email or Password" });

			// Issue new JWT
			const token = jwt.sign(doctor.toJSON(), process.env.JWTSecret, {
				expiresIn: "1h",
			});

			return res.status(200).json({
				message: `Login successful, token expires in one hour`,
				data: {
					token: token,
				},
			});
		} else {
			return res.status(401).json({ message: "Invalid Email or Password" });
		}

	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
};
