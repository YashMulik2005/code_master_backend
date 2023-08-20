const express = require("express");
const router = express.Router();
const DiscussQuestionModel = require("../models/forumQuestion");

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
    let result = await DiscussQuestionModel.find();
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
    const result = await DiscussQuestionModel.find({ user: data.username });
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

module.exports = router;
