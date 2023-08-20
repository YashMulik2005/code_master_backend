const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  c_id: {
    type: String,
    required: true,
  },
  name1: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
    required: true,
  },
  name2: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
  syntax: {
    type: String,
    required: true,
  },
  example: {
    type: String,
    required: true,
  },
  question1: {
    type: String,
    required: true,
  },
  ans1: {
    type: String,
    required: true,
  },
  question2: {
    type: String,
    required: true,
  },
  ans2: {
    type: String,
    required: true,
  },
});

const topic = mongoose.model("topic", topicSchema);

module.exports = topic;
