// Set up DB
const mongoose = require("mongoose");

const MONGO_CONNECTION_STRING = require("../keys").MONGO_CONNECTION_STRING;

// Connect to MongoDB
mongoose.connect(MONGO_CONNECTION_STRING, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", () => console.log("Error Connecting to Database"));

db.once("open", () => console.log("Connected To Database"));
