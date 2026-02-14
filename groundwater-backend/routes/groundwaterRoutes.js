const router = require("express").Router();
const controller =
require("../controllers/groundwaterController");

router.get("/", controller.getGroundwater);
router.post("/", controller.addGroundwater);
router.delete("/:id", controller.deleteGroundwater);
router.put("/:id", controller.updateGroundwater);

module.exports = router;
