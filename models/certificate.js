const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const CertificateSchema = mongoose.model(
  "certificateSchema",
  certificateSchema
);

module.exports = CertificateSchema;
