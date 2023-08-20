const mongoose = require("mongoose");

const courseTrackSchema = new mongoose.Schema({
  c_id: {
    type: String,
    required: true,
  },
  u_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["in progress", "completed"],
    default: "in progress",
  },
});

const CourseTrack = mongoose.model("CourseTrack", courseTrackSchema);

module.exports = CourseTrack;
