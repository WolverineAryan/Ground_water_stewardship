const router = require("express").Router();
const Model = require("../models/Groundwater");

router.get("/", async (req,res)=>{
 const data = await Model.find().sort({year:1});
 res.json(data);
});

router.post("/", async (req,res)=>{
 const item = new Model(req.body);
 await item.save();
 res.json(item);
});

module.exports = router;
