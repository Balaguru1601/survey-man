const Survey = require("../Models/Survey");
const Question = require("../Models/Question");
const verifyToken = require("../Utilities/AuthorizeToken");

module.exports.addSurvey = async (req, res, next) => {
	try {
		const { name, questions } = req.body;
		const quesIds = [];
		const survey = await new Survey({ name, quesIds }).save();
		for (const i of questions) {
			const ques = await new Question(i).save();
			ques.surveyId = survey._id;
			await ques.save();
			quesIds.push(ques._id);
		}
		survey.questions = quesIds;
		await survey.save();
		survey.populate("questions");
		return res
			.status(200)
			.json({ message: "Survey added successsfully", survey });
	} catch (e) {
		return res.status(400).json({
			message: "Survey addition failed",
		});
	}
};

module.exports.deleteSurvey = async (req, res, next) => {
	try {
		const { sId } = req.params;
		const token = req.get("Authorization");
		if (verifyToken(token)) {
			const survey = await Survey.findById({ sId });
			await Question.deleteMany({ _id: { $in: survey.questions } });
			await Survey.deleteOne({ _id: sId });
			return res.status(200).json({
				message: "Survey deleted succesfully",
			});
		} else {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
	} catch (e) {
		return res.status(400).json({
			message: "Deletion failed",
		});
	}
};

module.exports.getAllSurveys = async (req, res, next) => {
	try {
		const surveys = await Survey.find({});
		return res.status(200).json({
			message: "Survey retreived succesfully",
			surveys,
		});
	} catch (e) {
		return res.status(400).json({
			message: "Not able to fetch surveys",
		});
	}
};

module.exports.getSurvey = async (req, res, next) => {
	try {
		const survey = await Survey.findById(req.param.sId);
		return res.status(200).json({
			message: "Survey retreived succesfully",
			survey,
		});
	} catch (e) {
		return res.status(400).json({
			message: "Not able to fetch survey",
		});
	}
};
