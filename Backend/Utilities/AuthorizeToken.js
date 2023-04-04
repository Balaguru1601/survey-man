const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = (t) => {
	try {
		const token = t.slice(7);
		const verificationResult = jwt.verify(token, secret);
		return true;
	} catch (e) {
		return false;
	}
};
