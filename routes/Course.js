const express = require("express");
const router = express.Router();
const CourseModel = require("../models/course");
const CourseTrack = require("../models/Course_tarck");
const TopicModel = require("../models/topic");
const TopicTrackModel = require("../models/topic_track");

router.post("/add", async (req, res) => {
  const {
    c_id,
    name1,
    description1,
    name2,
    description2,
    syntax,
    example,
    question1,
    ans1,
    question2,
    ans2,
  } = req.body;
  try {
    const topic = new TopicModel({
      c_id: c_id,
      name1: name1,
      description1: description1,
      name2: name2,
      description2: description2,
      syntax: syntax,
      example: example,
      question1: question1,
      ans1: ans1,
      question2: question2,
      ans2: ans2,
    });

    await topic.save();
    return res.status(200).json({
      data: { success: true },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/singletopic", async (req, res) => {
  try {
    const { data } = req.body;

    const topic = await TopicModel.findOne({ _id: data.t_id });

    if (!topic) {
      return res.status(404).json({
        data: { error: "Topic not found" },
      });
    } else {
      return res.status(200).json({
        data: { result: topic },
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/enroll", async (req, res) => {
  try {
    const { data } = req.body;

    const courseTrack = new CourseTrack({
      c_id: data.c_id,
      u_id: data.username,
      status: "completed",
    });

    await courseTrack.save();

    return res.status(200).json({
      data: { success: true },
    });
  } catch (err) {
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/t", async (req, res) => {
  try {
    const { data } = req.body;

    const topics = await TopicModel.find({ c_id: data.c_id });

    let track = {};
    const topicTracks = await TopicTrackModel.find({
      c_id: data.c_id,
      u_id: data.username,
    });

    if (topicTracks && topicTracks.length === 0) {
      const course_data = {
        c_data: topics,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    } else {
      for (let i = 0; i < topicTracks.length; i++) {
        track[topicTracks[i].t_id] = topicTracks[i].t_id;
      }
      const course_data = {
        c_data: topics,
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

router.post("/topic", async (req, res) => {
  try {
    const { data } = req.body;

    const course = await CourseModel.findOne({ _id: data.c_id });

    let track = {};
    const courseTrack = await CourseTrack.findOne({
      c_id: data.c_id,
      u_id: data.username,
    });

    if (!courseTrack) {
      const course_data = {
        c_data: course,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    } else {
      track[courseTrack.c_id] = courseTrack.c_id;
      const course_data = {
        c_data: course,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/all", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(req.body);

    const courses = await CourseModel.find();

    let track = {};
    const courseTracks = await CourseTrack.find({ u_id: data.username });

    if (courseTracks && courseTracks.length === 0) {
      let course_data = {
        c_data: courses,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    } else {
      for (let i = 0; i < courseTracks.length; i++) {
        track[courseTracks[i].c_id] = courseTracks[i].c_id;
      }
      let course_data = {
        c_data: courses,
        track: track,
      };
      return res.status(200).json({
        data: { course_data },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: { error: err },
    });
  }
});

router.post("/topiccomplete", async (req, res) => {
  try {
    const { data } = req.body;

    const topicTrack = new TopicTrackModel({
      c_id: data.c_id,
      t_id: data.t_id,
      u_id: data.u_id,
      status: "yes",
    });

    await topicTrack.save();

    return res.status(200).json({
      data: { success: true },
    });
  } catch (err) {
    return res.status(400).json({
      data: { error: err },
    });
  }
});

module.exports = router;
