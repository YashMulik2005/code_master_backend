const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
// const CertificateModel = require("../models/certificate");
// const QuestionModel = require("../models/question");
// const QuestionTrackModel = require("../models/question_track");

router.post("/add", async (req, res) => {
  try {
    const { data } = req.body;
    const course = new CertificateTrackModel({
      // name: data.name,
      // description: data.description,
      // topic: data.topic,
      // input_format: data.input_format,
      // output_format: data.output_format,
      // testcase1: data.testcase1,
      // testcase1_ans: data.testcase1_ans,
      // testcase2: data.testcase2,
      // testcase2_ans: data.testcase2_ans,
      // explanation: data.explanation,
      c_id: data.c_id,
      u_id: data.u_id,
      status: data.status,
    });
    await course.save();
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

router.post("/login", async (req, res) => {
  try {
    const { data } = req.body;
    const user = await UserModel.findOne({ username: data.username });

    if (!user) {
      return res.status(200).json({
        data: { success: false },
      });
    } else {
      if (data.password === user.password) {
        return res.status(200).json({
          data: { success: true },
        });
      } else {
        return res.status(200).json({
          data: { success: false },
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/sighup", async (req, res) => {
  try {
    const { data } = req.body;

    const existingUser = await UserModel.findOne({ username: data.username });

    if (existingUser) {
      return res.status(200).json({
        data: { success: false },
      });
    }

    const newUser = new UserModel({
      username: data.username,
      email: data.email,
      password: data.password,
      fname: data.fname,
      lname: data.lname,
    });

    await newUser.save();

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

module.exports = router;
