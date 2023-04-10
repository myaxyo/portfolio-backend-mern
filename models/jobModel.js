const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  durations: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Job", jobSchema);
