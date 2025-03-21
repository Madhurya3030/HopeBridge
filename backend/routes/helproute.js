const express = require("express");
const multer = require("multer");
const path = require("path");
const ReportCase = require("../models/help");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ Handle report form submission
router.post("/report", upload.single("photo"), async (req, res) => {
  try {
    const { 
      name, age, children, studying, healthIssues, healthDetails, 
      address, location, earnings, sufficientFood, needHelp 
    } = req.body;

    const newReport = new ReportCase({
      name,
      age,
      children,
      studying,
      healthIssues,
      healthDetails: healthIssues === "yes" ? healthDetails : "",
      address,
      location,
      earnings,
      sufficientFood: sufficientFood === "yes",
      needHelp,
      photo: req.file ? req.file.filename : null, // Store uploaded file name
      verified: false, // ✅ Default to unverified when a report is submitted
    });

    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting report", error });
  }
});

// ✅ Get all reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await ReportCase.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
});

// ✅ Update verification status
router.put("/reports/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;

    const report = await ReportCase.findByIdAndUpdate(
      id,
      { verified },
      { new: true } // Return the updated document
    );

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Failed to update verification status", error });
  }
});

module.exports = router;
