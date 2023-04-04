const router = require("express").Router();
const survey = require("../Controllers/Survey");
const CatchAsync = require("../Utilities/CatchAsync");

router.route("/create").post(CatchAsync(survey.addSurvey));

router.route("/delete/:sId").get(CatchAsync(survey.deleteSurvey));

router.route("/all").get(CatchAsync(survey.getAllSurveys));

router.route("/get/:sId").get(CatchAsync(survey.getSurvey));

module.exports = router;
