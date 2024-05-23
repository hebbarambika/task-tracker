const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const authHeader = req.header("Authorization");

	if (!authHeader) {
		return res.status(401).json({ message: "No token, authorization denied" });
	}

	if (!authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Token format is not valid" });
	}

	const token = authHeader.replace("Bearer ", "");

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ message: "Token is not valid" });
	}
};

module.exports = authMiddleware;

// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
// 	const token = req.header("Authorization").replace("Bearer ", "");

// 	if (!token) {
// 		return res.status(401).json({ message: "No token, authorization denied" });
// 	}

// 	try {
// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);
// 		req.user = decoded;
// 		next();
// 	} catch (err) {
// 		res.status(401).json({ message: "Token is not valid" });
// 	}
// };

// module.exports = authMiddleware;
