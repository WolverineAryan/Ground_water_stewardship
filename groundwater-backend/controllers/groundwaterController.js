const Groundwater = require("../models/Groundwater");
const axios = require("axios");

// GET all records
exports.getGroundwater = async (req, res) => {
  try {
    const data = await Groundwater.find().sort({ year: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD record
exports.addGroundwater = async (req, res) => {
  try {
    const record = new Groundwater(req.body);
    const saved = await record.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE record
exports.deleteGroundwater = async (req, res) => {
  await Groundwater.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};

// UPDATE record
exports.updateGroundwater = async (req, res) => {
  try {
    const updated = await Groundwater.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Predict record
exports.predictGroundwater = async (req, res) => {

  const { year } = req.body;

  const response = await axios.post(
    "http://localhost:8000/predict",
    { year }
  );

  res.json(response.data);
};

exports.getForecast = async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/forecast"
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "ML service error" });
  }
};