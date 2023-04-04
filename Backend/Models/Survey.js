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
		noOfResponse: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Survey", SurveySchema);
