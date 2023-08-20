const mongoose = require("mongoose");

const certificateTrackSchema = new mongoose.Schema({
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
    required: true,
  },
});

const CertificateTrack = mongoose.model(
  "CertificateTrack",
  certificateTrackSchema
);

module.exports = CertificateTrack;
