const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const SKILLS = ["javascript", "react", "node", "python", "sql"];

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const data = await pdf(req.file.buffer);
    const text = data.text.toLowerCase();

    let found = [];
    let score = 0;

    SKILLS.forEach(skill => {
      if (text.includes(skill)) {
        found.push(skill);
        score += 20;
      }
    });

    res.json({
      score,
      foundSkills: found,
      missingSkills: SKILLS.filter(s => !found.includes(s))
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;