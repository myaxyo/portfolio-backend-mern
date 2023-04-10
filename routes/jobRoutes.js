const express = require("express");
const Job = require("../models/jobModel");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
  const { secret } = req.body;
  if (secret !== process.env.SECRET_KEY) {
    res.send("Secret is not correct");
    return;
  } else {
    try {
      const job = await Job.create(req.body);
      res.json(job);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
});

router.get("/", async (req, res) => {
  const { secret } = req.body;
  if (secret !== process.env.SECRET_KEY) {
    res.json("Secret is not correct");
  }
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID");
    }
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID");
    }
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
