const express = require("express");
const app = express();
const mongoose = require("mongoose");

const UserRoutes = require("./Routes/User");
const QuestionRoutes = require("./Routes/Question");
const ResponseRoutes = require("./Routes/Response");
const SurveyRoutes = require("./Routes/Survey");

require("dotenv").config();
const cors = require("cors");
const ExpressError = require("./Utilities/ExpressError");

app.use(express.json());
app.use(cors());

const db_url = process.env.DB_URL;

mongoose
	.connect(db_url || "mongodb://localhost:27017/assignment")
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO ERROR!!!!");
		console.log(err);
	});

app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Origin",
		"https://survey-man.vercel.app/*"
	);
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use("/user", UserRoutes);
app.use("/question", QuestionRoutes);
app.use("/response", ResponseRoutes);
app.use("/survey", SurveyRoutes);

app.get("/", (req, res, next) => {
	res.send("hello there!");
});

app.all("*", (req, res, next) => {
	next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
	const { status = 500 } = err;
	if (!err.message) err.message = "Oh No,Something Went Wrong!";
	return res.status(status).json({ message: err.message });
});

app.listen(5000, () => {
	console.log("Server running at 5000");
});
