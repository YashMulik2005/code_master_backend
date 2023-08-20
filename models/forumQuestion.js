const mongoose = require("mongoose");

const forumQuestionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const forumQuestion = mongoose.model("forumQuestion", forumQuestionSchema);

module.exports = forumQuestion;
