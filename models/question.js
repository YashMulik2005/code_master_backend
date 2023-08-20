const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  input_format: {
    type: String,
    required: true,
  },
  output_format: {
    type: String,
    required: true,
  },
  testcase1: {
    type: String,
    required: true,
  },
  testcase1_ans: {
    type: String,
    required: true,
  },
  testcase2: {
    type: String,
    required: true,
  },
  testcase2_ans: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
  c_id: {
    type: String,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
