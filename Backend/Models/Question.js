const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	type: {
		type: String,
		required: true,
	},
	question: {
		type: String,
		required: true,
	},
	options: [{ type: String }],
	surveyId: {
		type: Schema.Types.ObjectId,
	},
});

module.exports = mongoose.model("Question", QuestionSchema);
