const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	const token = req.header("x-access-token");

	if (!token) {
		res.status(400).json({ msg: "Token Required" });
	} else {
		jwt.verify(token, process.env.AUTH_SECRET_KEY, function(err, decoded) {
			if (err) {
				return res.status(401).json({ msg: "Invalid Token", error: err });
			} else {
				console.log(decoded);
				req.userId = decoded.userId;
				next();
			}
		});
	}
};

module.exports = authenticate;