const router = require("express").Router();
const response = require("../Controllers/Response");
const CatchAsync = require("../Utilities/CatchAsync");

router.route("/save").post(CatchAsync(response.saveResponse));

router.route("/all/:sId").get(CatchAsync(response.getAllResponses));

module.exports = router;
