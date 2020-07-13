const express = require("express");
const router = express.Router();
const passport = require("passport");

const doctorRoutes = require("./doctors");
const patientRoutes = require("./patients");

const reportsController = require("../controllers/reports-controller");

router.use("/doctors", doctorRoutes);
router.use("/patients", patientRoutes);

router.get(
	"/reports/:status",
	passport.authenticate("jwt", { session: false }),
	reportsController.getReportsByStatus
);

router.use("/", (req, res) => {
	return res.status(404).json({
		message: "Server could not find the requested resource, Check Request Again",
	});
});

module.exports = router;
