const mongoose = require("mongoose");

const topicTrackSchema = new mongoose.Schema({
  c_id: {
    type: String,
    required: true,
  },
  t_id: {
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

const topictrack = mongoose.model("topictrack", topicTrackSchema);

module.exports = topictrack;
