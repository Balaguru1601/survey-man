const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		questions: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Question",
				},
			],
		},
		noOfResponse: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Survey", SurveySchema);
