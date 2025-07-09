const express = require("express");
const router = express.Router();
const { assessmentConfigs } = require("../config/assessment_configs");
const { generatePdf } = require("../services/generatePdf");
const { assessments } = require("../../reportfiles/input/data");

router.get("/generate-report", async (req, res) => {
  const { session_id } = req.query;

  const data = assessments.find(item => item.session_id === session_id);
  if (!data) {
    return res.status(404).json({ msg: "Session not found" });
  }

  const config = assessmentConfigs[data.assessment_id];
  if (!config) {
    return res.status(400).json({ msg: "Unsupported assessment_id" });
  }

  try {
    const pdfPath = await generatePdf(data, config, session_id);
    res.json({ status: "success", path: pdfPath });
  } catch (err) {
    console.error("PDF generation failed:", err);
    res.status(500).json({ status: "error", msg: "PDF generation failed" });
  }
});

module.exports = router;

