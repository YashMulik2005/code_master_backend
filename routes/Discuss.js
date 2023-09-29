const express = require("express");
const router = express.Router();
const DiscussQuestionModel = require("../models/forumQuestion");
const DiscussAnsModel = require("../models/forumAns");

router.post("/add", async (req, res) => {
  const { data } = req.body;
  try {
    const question = new DiscussQuestionModel({
      heading: data.heading,
      description: data.description,
      code: data.code,
      user: data.user,
    });

    await question.save();

    return res.status(200).json({
      data: { success: true },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      data: { success: false },
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let result = await DiscussQuestionModel.find().sort({ timestamp: -1 });
    return res.status(200).json({
      data: { result },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/userpost", async (req, res) => {
  const { data } = req.body;
  console.log(data.username);
  try {
    if (data.username == "") {
      return res.status(200).json({
        data: { Notlogin: true },
      });
    }
    const result = await DiscussQuestionModel.find({
      user: data.username,
    }).sort({ timestamp: -1 });
    return res.status(200).json({
      data: { result },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/fullque", async (req, res) => {
  const { data } = req.body;
  try {
    const result = await DiscussQuestionModel.find({ _id: data.id });
    return res.status(200).json({
      data: { result },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/addans", async (req, res) => {
  const { data } = req.body;
  try {
    const ans = new DiscussAnsModel({
      q_id: data.q_id,
      description: data.description,
      code: data.code,
      user: data.user,
    });

    await ans.save();

    return res.status(200).json({
      data: { success: true },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      data: { success: false },
    });
  }
});

router.post("/getans", async (req, res) => {
  const { data } = req.body;
  try {
    let result = await DiscussAnsModel.find({ q_id: data.q_id }).sort({
      timestamp: -1,
    });
    return res.status(200).json({
      data: { result },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/userans", async (req, res) => {
  const { data } = req.body;
  console.log(data.username);
  try {
    if (data.username == "") {
      return res.status(200).json({
        data: { Notlogin: true },
      });
    }
    const result = await DiscussAnsModel.find({ user: data.username }).sort({
      timestamp: -1,
    });
    return res.status(200).json({
      data: { result },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/search", async (req, res) => {
  const { data } = req.body;
  console.log(data.search);
  try {
    const result = await DiscussQuestionModel.find({
      heading: { $regex: ".*" + data.search + ".*", $options: "i" },
    });
    if (result.length > 0) {
      res.status(200).json({
        data: { result },
      });
    } else {
      res.status(200).json({
        data: { msg: "no data found", result },
      });
    }
  } catch (err) {
    res.status(400).json({
      data: { error: err },
    });
  }
});

module.exports = router;
