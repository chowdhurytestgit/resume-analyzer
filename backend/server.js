const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    console.log("🔥 /analyze hit");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        score: 0,
        foundSkills: [],
        missingSkills: [],
        error: "No file uploaded"
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const text = (pdfData.text || "").toLowerCase();

    const skills = [
      "javascript",
      "react",
      "node",
      "python",
      "java",
      "machine learning",
      "sql"
    ];

    const foundSkills = skills.filter(skill => text.includes(skill));

    const score = Math.round((foundSkills.length / skills.length) * 100);

    const missingSkills = skills.filter(skill => !foundSkills.includes(skill));

    fs.unlinkSync(req.file.path);

    return res.json({
      success: true,
      score,
      foundSkills,
      missingSkills
    });

  } catch (err) {
    console.log("❌ ERROR:", err);

    return res.status(500).json({
      success: false,
      score: 0,
      foundSkills: [],
      missingSkills: [],
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});