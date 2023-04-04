const router = require("express").Router();
const questions = require("../Controllers/Question");
const CatchAsync = require("../Utilities/CatchAsync");

router.route("/edit").post(CatchAsync(questions.editQuestion));

router.route("/delete").post(CatchAsync(questions.deleteQuestion));

module.exports = router;
