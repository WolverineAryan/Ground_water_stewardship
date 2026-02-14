const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

exports.trainModel = async (req, res) => {

  const form = new FormData();
  form.append("file", fs.createReadStream(req.file.path));

  const response = await axios.post(
    "http://127.0.0.1:8000/train",
    form,
    { headers: form.getHeaders() }
  );

  res.json(response.data);
};

exports.predict = async (req, res) => {

  const year = req.params.year;

  const response = await axios.get(
    `http://127.0.0.1:8000/predict/${year}`
  );

  res.json(response.data);
};
