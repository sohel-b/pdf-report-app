const { assessmentConfigs, classificationRanges } = require("../config/assessment_configs");
const { getValueByPath } = require("../utils/getValueByPath");

exports.generateHTML = function(data) {
  const config = assessmentConfigs[data.assessment_id];
  let html = `<html><head><style>body{font-family:sans-serif;}h2{color:#333;}</style></head><body>`;
  html += `<h1>Assessment Report</h1>`;
  config.sections.forEach(section => {
    html += `<h2>${section.name}</h2><ul>`;
    section.fields.forEach(field => {
      let val = getValueByPath(data, field.path);
      let label = field.label;
      let unit = field.unit;
      if (field.classify) {
        const range = classificationRanges[field.classify].find(r => val >= r.min && val < r.max);
        label += ` (${range?.label || 'N/A'})`;
      }
      html += `<li>${label}: ${val} ${unit}</li>`;
    });
    html += `</ul>`;
  });
  html += `</body></html>`;
  return html;
};