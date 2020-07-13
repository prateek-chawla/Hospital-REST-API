require("dotenv").config();
const express = require("express");
const passport = require("passport");

const app = express();

const db = require("./config/mongoose");
const passportJWT = require("./config/passport-jwt");
const routes = require("./routes/index");

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Redirect to Routes
app.use("/", routes);

app.listen(PORT, err => {
	if (err) console.log("Error Starting Server");
	else console.log(`Server Listening on Port ${PORT}`);
});
