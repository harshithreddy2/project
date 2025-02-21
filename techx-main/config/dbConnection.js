const mongoose = require("mongoose");

const connectDB = async() => {
	try
	{
		const db = process.env.MONGO_URI;
		await mongoose.connect("mongodb://localhost:27017/mydatabase");
		console.log("MongoDB connected...");
	}
	catch(err)
	{
		console.log(err);
		process.exit(1);
	}
}

module.exports = connectDB;