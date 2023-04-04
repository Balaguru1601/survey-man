const Response = require("../Models/Response");
const Survey = require("../Models/Survey");

module.exports.saveResponse = async (req, res, next) => {
	try {
		const { name, email, response, sId: surveyId } = req.body;
		await new Response({
			name,
			email,
			surveyId,
			response,
		}).save();

		const survey = await Survey.findById(surveyId);
		survey.noOfResponse = survey.noOfResponse + 1;
		await survey.save();

		return res.status(200).json({
			message: "Surevy details recorded",
		});
	} catch (e) {
		return res.status(200).json({
			message: "Error occured, Retry submission",
		});
	}
};

module.exports.getAllResponses = async (req, res, next) => {
	try {
		const { sId: surveyId } = req.params;
		const responses = await Response.find({ surveyId }).populate({
			path: "response",
			populate: {
				path: "questionId",
				model: "Question",
			},
		});
		return res.status(200).json({
			message: "Response Fetch successfull",
			responses,
		});
	} catch (e) {
		return res.status(400).json({ message: "Error in retreiving" });
	}
};
