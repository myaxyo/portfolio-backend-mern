const express = require("express");
const router = express.Router();
const multer = require("multer");
const Project = require("../models/projectModel");
const mongoose = require("mongoose");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    const projectData = projects.map((project) => {
      const imageData = project.image.data.toString("base64");
      return {
        ...project.toObject(),
        image: {
          data: imageData,
          contentType: project.image.contentType,
        },
      };
    });
    res.json(projectData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      stack: req.body.stack,
      url: req.body.url,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid project ID" });
    }
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid project ID" });
    }
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    project.title = req.body.title || project.title;
    project.stack = req.body.stack || project.stack;
    project.url = req.body.url || project.url;
    if (req.file) {
      project.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid project ID" });
    }
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.json({ msg: "Project removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
