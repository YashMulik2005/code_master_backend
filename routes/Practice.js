const express = require("express");
const router = express.Router();
const axios = require("axios");
const QuestionModel = require("../models/question");
const QuestionTrackModel = require("../models/question_track");

router.post("/add", async (req, res) => {
  const {
    name,
    description,
    topic,
    input_format,
    output_format,
    testcase1,
    testcase1_ans,
    testcase2,
    testcase2_ans,
    explanation,
    c_id,
  } = req.body;
  try {
    const question = new QuestionModel({
      name: name,
      description: description,
      topic: topic,
      input_format: input_format,
      output_format: output_format,
      testcase1: testcase1,
      testcase1_ans: testcase1_ans,
      testcase2: testcase2,
      testcase2_ans: testcase2_ans,
      explanation: explanation,
      c_id: c_id,
    });

    await question.save();
    return res.status(200).json({
      data: { success: true },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { success: false },
    });
  }
});

router.post("/compiler", async (req, res) => {
  const { requestdata } = req.body;
  console.log(requestdata);

  const options = {
    method: "POST",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "639e388a10msh3ccd60adff600b9p1f174djsn211b87c4474a",
      "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
    },
    data: {
      language: requestdata.language,
      version: "latest",
      code: requestdata.code,
      input: requestdata.input,
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      data: { result: response.data },
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      data: { err: error },
    });
  }
});

router.get("/:topic", async (req, res) => {
  try {
    const { topic } = req.params;

    let questions;
    if (topic === "all") {
      questions = await QuestionModel.find();
    } else {
      questions = await QuestionModel.find({ topic: topic });
    }

    return res.status(200).json({
      data: { result: questions },
    });
  } catch (err) {
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/question/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    console.log(id);

    const question = await QuestionModel.findOne({ _id: id });

    if (!question) {
      return res.status(404).json({
        data: { error: "Question not found" },
      });
    }

    let questionTrack = await QuestionTrackModel.find({
      q_id: id,
      u_id: data.username,
    });

    if (questionTrack && questionTrack.length > 0) {
      let r = {
        q_data: question,
        status: "solved",
      };
      return res.status(200).json({
        data: { r },
      });
    } else {
      let r = {
        q_data: question,
        status: "unsolved",
      };
      return res.status(200).json({
        data: { r },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/solved", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data.username);
    console.log(data.id);

    const questionTrack = new QuestionTrackModel({
      q_id: data.id,
      u_id: data.username,
      status: "solved",
    });

    await questionTrack.save();

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
