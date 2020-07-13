const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
	phone: {
		type: String,
		required: true,
	},
	// Array of type - Report
	reports: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Report",
		},
	],
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
