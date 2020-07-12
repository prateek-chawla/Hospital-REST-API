module.exports.isAuth = (req, res, next) => {
	if (req.isAuthenticated()) next();
	else
		return res
			.status(403)
			.json({ message: "Unauthorized, Login or Register first" });
};
