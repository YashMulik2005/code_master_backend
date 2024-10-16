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

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let url =
    "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/";

  try {
    const response = await axios.post(
      url,
      {
        lang: requestdata.language,
        source: requestdata.code,
        input: requestdata.input,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "client-secret": "b1d1028bdeb82b9936bd041e239db123b3113912",
        },
      }
    );

    url = response.data.status_update_url;
    if (requestdata.language == "JAVA8") {
      await delay(5000);
    } else {
      await delay(2000);
    }

    const outputResponse = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "client-secret": "b1d1028bdeb82b9936bd041e239db123b3113912",
      },
    });
    console.log(outputResponse.data?.result?.compile_status);
    if (outputResponse.data?.result?.compile_status != "OK") {
      return res.status(200).json({
        data: outputResponse.data?.result?.compile_status,
      });
    }
    url = outputResponse.data?.result?.run_status?.output;
    const output = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "client-secret": "b1d1028bdeb82b9936bd041e239db123b3113912",
      },
    });
    console.log(output);

    return res.status(200).json({
      data: output.data,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.response ? error.response.data : error.message,
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

    const resp = await QuestionTrackModel.find({
      q_id: data.id,
      u_id: data.username,
    });

    if (resp.length >= 1) {
      return res.status(200).json({
        data: { success: true },
      });
    } else {
      const questionTrack = new QuestionTrackModel({
        q_id: data.id,
        u_id: data.username,
        status: "solved",
      });

      await questionTrack.save();

      return res.status(200).json({
        data: { success: true },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);

    const result = await QuestionModel.find({
      name: { $regex: ".*" + data.searchtext + ".*", $options: "i" },
    });

    if (result.length > 0) {
      return res.status(200).json({
        data: { result },
      });
    }

    return res.status(200).json({
      data: { msg: "data not found", result },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

module.exports = router;
