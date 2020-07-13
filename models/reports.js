const mongoose = require("mongoose");
const Doctor = require("./doctor");

const { getCurrentIST } = require("../utils");

const reportSchema = new mongoose.Schema({
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
		required: true,
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: true,
	},
	date: {
		type: Date,
		// Change UTC to IST
		default: getCurrentIST(),
	},
	status: {
		type: String,
		required: true,
		enum: ["Negative", "Travelled", "Symptoms", "Positive"],
	},
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
