const express = require("express");
const router = express.Router();
const passport = require("passport");

const patientController = require("../controllers/patients-controller");

router.post(
	"/register",
	passport.authenticate("jwt", { session: false }),
	patientController.register
);

router.post(
	"/:credential/create-report",
	passport.authenticate("jwt", { session: false }),
	patientController.createReport
);

router.get(
	"/:credential/all-reports",
	passport.authenticate("jwt", { session: false }),
	patientController.fetchAllReports
);

module.exports = router;
