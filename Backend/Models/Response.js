const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
	surveyId: {
		type: Schema.Types.ObjectId,
		ref: "Survey",
		required: true,
	},
	response: [
		{
			answer: { type: String, required: true },
			questionId: {
				type: Schema.Types.ObjectId,
				ref: "Question",
				required: true,
			},
		},
	],
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Response", ResponseSchema);
