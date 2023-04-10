const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  stack: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);
