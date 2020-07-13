// Set up DB
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", () => console.log("Error Connecting to Database"));

db.once("open", () => console.log("Connected To Database"));
