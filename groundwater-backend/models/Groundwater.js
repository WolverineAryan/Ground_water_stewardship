const mongoose = require("mongoose");

const groundwaterSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  depth: {
    type: Number,
    required: true
  },
  rainfall: Number
},
{
  timestamps: true
});

module.exports =
mongoose.model("Groundwater", groundwaterSchema);
