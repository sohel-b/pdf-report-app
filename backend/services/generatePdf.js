const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { getValueByPath } = require("../utils/getValueByPath");
const { classificationRanges } = require("../config/assessment_configs");

function classify(type, value) {
  const rangeSet = classificationRanges[type];
  if (!rangeSet || value == null) return null;

  const v = parseFloat(value);
  const match = rangeSet.find(r => v >= r.min && v <= r.max);
  return match?.label || null;
}

async function generatePdf(data, config, sessionId) {
  let html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { border-bottom: 1px solid #ccc; margin-top: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>
        <h1>Assessment Report</h1>
        <p><strong>Session ID:</strong> ${sessionId}</p>
  `;

  for (const section of config.sections) {
    html += `<h2>${section.name}</h2><table><tbody>`;
    for (const field of section.fields) {
      const value = getValueByPath(data, field.path);
      const label = field.label;
      const unit = field.unit || "";
      const classification = field.classify ? classify(field.classify, value) : "";

      html += `
        <tr>
          <td>${label}</td>
          <td>${value ?? "--"} ${unit}</td>
          <td>${classification}</td>
        </tr>
      `;
    }
    html += "</tbody></table>";
  }

  html += "</body></html>";

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfPath = path.join(__dirname, "../../reportfiles/output", `${sessionId}.pdf`);
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();
  return pdfPath;
}

module.exports = { generatePdf };
