const Question = require("../Models/Question");
const Survey = require("../Models/Survey");
const verifyToken = require("../Utilities/AuthorizeToken");

module.exports.editQuestion = async (req, res, next) => {
	try {
		const { qId, type, question, options } = req.body;
		const token = req.get("Authorization");
		if (verifyToken(token)) {
			const ques = await Question.findById(qId);
			ques.type = type;
			ques.question = question;
			ques.options = options;
			await ques.save();
			return res.status(200).json({
				message: "Question updated!",
			});
		} else
			return res.status(401).json({
				message: "Unauthorized",
			});
	} catch (e) {
		return res.status(400).json({
			message: "Updation error!",
		});
	}
};

module.exports.deleteQuestion = async (req, res, next) => {
	try {
		const { qId, sId } = req.body;
		const token = req.get("Authorization");
		if (verifyToken(token)) {
			await Question.deleteOne({ id: qId });
			const s = await Survey.findByIdAndUpdate(
				sId,
				{ $pull: { questions: qId } },
				{ new: true }
			);
			console.log(s);
			return res.status(200).json({
				message: "Question deleted successfully",
			});
		} else
			return res.status(401).json({
				message: "Unauthorized",
			});
	} catch (e) {
		return res.status(400).json({
			message: "Deletion error!",
		});
	}
};
