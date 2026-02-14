const router = require("express").Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/mlController");

router.post("/train", upload.single("file"), controller.trainModel);
router.get("/predict/:year", controller.predict);

module.exports = router;
