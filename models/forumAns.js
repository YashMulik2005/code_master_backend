const mongoose = require("mongoose");

const forumAnsSchema = new mongoose.Schema({
  q_id: {
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

const forumAnswer = mongoose.model("forumAnswer", forumAnsSchema);

module.exports = forumAnswer;
