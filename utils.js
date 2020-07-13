// Convert UTC to IST
module.exports.getCurrentIST = () => {
	const ISTOffset = 330 * 60000; // IST offset UTC +5:30 hours
	const ISTTime = new Date(Date.now() + ISTOffset);
	return ISTTime;
};
