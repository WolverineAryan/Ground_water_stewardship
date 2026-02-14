const router = require("express").Router();
const controller = require("../controllers/groundwaterController");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });
router.get("/", controller.getGroundwater);
router.post("/", controller.addGroundwater);
router.delete("/:id", controller.deleteGroundwater);
router.put("/:id", controller.updateGroundwater);
router.post("/predict", controller.predictGroundwater);
router.get("/forecast", controller.getForecast);

router.post("/upload", upload.single("file"), async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      await Groundwater.insertMany(results);

      res.json({ message: "Dataset uploaded" });
    });
});

module.exports = router;
