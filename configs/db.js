const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		// mongodb+srv://username:password@cluster-name.mongodb.net/dbName
		const MONGO_URI =
			"mongodb+srv://rhebbar18:Ambika%40123@cluster0.wopr3j5.mongodb.net/bizcart";
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
