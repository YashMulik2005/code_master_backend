const mongoose = require("mongoose");

const questionTrackSchema = new mongoose.Schema({
  q_id: {
    type: String,
    required: true,
  },
  u_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const QuestionTrack = mongoose.model("QuestionTrack", questionTrackSchema);

module.exports = QuestionTrack;
