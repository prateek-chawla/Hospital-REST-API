const Report = require("../models/reports");
const POSSIBLE_STATUS = ["Negative", "Travelled", "Symptoms", "Positive"];

module.exports.getReportsByStatus = async (req, res) => {
	try {
		const status = req.params.status;

		// Validate Status
		if (!POSSIBLE_STATUS.includes(status))
			return res.status(422).json({
				message:
					"Not a Valid Status, Choose from 'Negative', 'Travelled', 'Symptoms', 'Positive' ",
			});

		let reports = await Report.find({ status: status })
			// Dont populate sensitive/redundant fields
			.populate({ path: "patient", select: "-reports -password -__v" })
			.populate({ path: "doctor", select: "-password -__v" });

		return res.status(200).json({
			message: "Fetched Reports Successfully",
			data: {
				reports: reports,
			},
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
