const mongoose = require("mongoose");

const certificateQueTrackSchema = new mongoose.Schema({
  c_id: {
    type: String,
    required: true,
  },
  u_id: {
    type: String,
    required: true,
  },
  t_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const CertificateQueTrack = mongoose.model(
  "CertificateQueTrack",
  certificateQueTrackSchema
);

module.exports = CertificateQueTrack;
