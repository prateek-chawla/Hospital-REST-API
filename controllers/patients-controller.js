const ObjectId = require("mongoose").Types.ObjectId;

const Patient = require("../models/patient");
const Report = require("../models/reports");
const { getCurrentIST } = require("../utils");

const POSSIBLE_STATUS = ["Negative", "Travelled", "Symptoms", "Positive"];

module.exports.register = async (req, res) => {
	try {
		const phone = req.body.phone;
		let patient = await Patient.findOne({ phone: phone }).populate({
			// If patient already exists, populate all fields except patient and return existing records
			path: "reports",
			select: "-patient -__v",
			// Dont populate Doctor's encrypted password in results
			populate: { path: "doctor", select: "-password -__v" },
		});

		if (patient)
			return res.status(200).json({
				message: "Patient already registered",
				data: { patient: patient },
			});

		let newPatient = await Patient.create({ phone });
		return res.status(200).json({
			message: `Patient with Phone# ${phone} registered successfully `,
			data: {
				patientId: newPatient._id,
			},
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports.createReport = async (req, res) => {
	try {
		// Access a Patient by either - Phone # or Patient ID
		const credential = req.params.credential;

		// if input is a valid MongoDB id , then use it
		// else use Phone #

		let loginCredential = "phone";
		if (ObjectId.isValid(credential)) loginCredential = "_id";

		let patient = await Patient.findOne({ [loginCredential]: credential });
		if (!patient)
			return res
				.status(200)
				.json({ message: "Patient not registered, register the patient first" });

		const status = req.body.status;

		// Validate Status for Patient Report
		if (!POSSIBLE_STATUS.includes(status))
			return res.status(422).json({
				message:
					"Not a Valid Status, Choose from 'Negative', 'Travelled', 'Symptoms', 'Positive' ",
			});

		const reportData = {
			status: status,
			date: getCurrentIST(),
			doctor: req.user._id,
			patient: patient,
		};

		// Add new Report
		let report = await Report.create(reportData);

		// Add new report to the begining of reports - sorted by latest report first
		patient.reports.unshift(report);
		await patient.save();
		return res.status(200).json({ message: "Patient Report Added Successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports.fetchAllReports = async (req, res) => {
	try {
		// Access a Patient by either - Phone # or Patient ID
		const credential = req.params.credential;

		// if input is a valid MongoDB id , then use it
		// else use Phone #
		let loginCredential = "phone";
		if (ObjectId.isValid(credential)) loginCredential = "_id";

		let patient = await Patient.findOne({
			[loginCredential]: credential,
		}).populate({
			// Dont populate sensitive/redundant fields
			path: "reports",
			select: "-patient -__v",
			populate: { path: "doctor", select: "-password -__v" },
		});

		if (!patient)
			return res
				.status(200)
				.json({ message: "Patient not registered, register the patient first" });

		return res.status(200).json({
			message: "Fetched Reports Successfully",
			// Sorted Reports - latest report first
			data: { reports: patient.reports },
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
