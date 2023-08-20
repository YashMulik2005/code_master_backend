const express = require("express");
const router = express.Router();
const CertificateModel = require("../models/certificate");
const CertificateTrackModel = require("../models/certificate_track");
const CertificateQueTrackModel = require("../models/certificate_que_track");
const QuestionModel = require("../models/question");

router.post("/", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data.username);

    const certificates = await CertificateModel.find();

    const track = {};
    const certificateTracks = await CertificateTrackModel.find({
      u_id: data.username,
    });

    if (certificateTracks && certificateTracks.length === 0) {
      const course_data = {
        c_data: certificates,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    } else {
      for (let i = 0; i < certificateTracks.length; i++) {
        track[certificateTracks[i].c_id] = certificateTracks[i].c_id;
      }
      const course_data = {
        c_data: certificates,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/dashboard", async (req, res) => {
  try {
    const { data } = req.body;

    const questions = await QuestionModel.find({ c_id: data.c_id });

    const track = {};
    const certificateQueTracks = await CertificateQueTrackModel.find({
      c_id: data.c_id,
      u_id: data.username,
    });

    if (certificateQueTracks && certificateQueTracks.length === 0) {
      const course_data = {
        c_data: questions,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    } else {
      for (let i = 0; i < certificateQueTracks.length; i++) {
        track[certificateQueTracks[i].t_id] = certificateQueTracks[i].t_id;
      }
      const course_data = {
        c_data: questions,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/question", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);

    const question = await QuestionModel.findOne({ _id: data.t_id });

    if (!question) {
      return res.status(404).json({
        data: { error: "Question not found" },
      });
    } else {
      return res.status(200).json({
        data: { result: question },
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/solved", async (req, res) => {
  try {
    const { data } = req.body;

    const certificateQueTrack = new CertificateQueTrackModel({
      c_id: data.c_id,
      t_id: data.t_id,
      u_id: data.username,
      status: "yes",
    });

    await certificateQueTrack.save();

    return res.status(200).json({
      data: { success: true },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/certified", async (req, res) => {
  try {
    const { data } = req.body;
    const Certificate = new CertificateTrackModel({
      c_id: data.c_id,
      u_id: data.username,
      status: "yes",
    });

    await Certificate.save();

    return res.status(200).json({
      data: { success: true },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/show", async (req, res) => {
  const { data } = req.body;
  const certificate = await CertificateTrackModel.find({
    u_id: data.username,
    c_id: data.c_id,
  });
  if (!certificate) {
    return res.status(200).json({
      data: { success: false },
    });
  } else {
    const course = await CertificateModel.find({ _id: data.c_id });
    if (course) {
      const c_data = {
        course: course,
        success: true,
      };
      return res.status(200).json({
        data: { c_data },
      });
    }
  }
});

module.exports = router;
