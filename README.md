
# 📄 PDF Report Generation System

A full-stack Node.js + React.js application to generate configurable PDF reports based on assessment data using Puppeteer.

---

## 🧩 Features

- 🔐 User authentication (Login & Signup)
- 📄 Dynamic PDF generation by `session_id`
- ⚙️ Configuration-driven report layout via `config.js`
- 🧠 Classification logic (e.g., BMI: Normal, Obese, etc.)
- ⚡ Easily extendable to new assessment types
- 🖨️ Generates and stores PDF files locally

---


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pdf-report-app.git
cd pdf-report-app
```
NOTE: Use node greater than v20
---

### 2. Backend Setup

#### ⬇ Install Dependencies

```bash
cd backend
npm install
```

#### 🧠 Update Data


#### ⚙️ Run the Server

```bash
node app.js
```

> Server runs at: `http://localhost:3001`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

> Runs at: `http://localhost:3000`

---

## 📮 API Usage

### `GET /generate-report?session_id=session_001`

- 🔍 Looks up data by `session_id`
- 🧩 Uses `assessment_id` to find correct config
- 📄 Generates PDF using Puppeteer
- 💾 Saves to `backend/reports/session_001.pdf`

**Example response:**

```json
{
  "status": "success",
  "path": "./reports/session_001.pdf"
}
```

---

## ⚙️ Configuration

All report layout logic is stored in:

```js
backend/config/config.js
```

Supports:
- Section headings
- Field paths (deep-nested)
- Units
- Optional classification logic (BMI, etc.)

To support a new assessment type, simply **add a new config entry** — no code change required.

---

## ✅ Example Configuration

```js
exports.assessmentConfigs = {
  as_hr_02: {
    sections: [
      {
        name: "Vitals",
        fields: [
          { label: "Heart Rate", path: "vitalsMap.vitals.heart_rate", unit: "bpm" },
          { label: "BMI", path: "bodyCompositionData.BMI", classify: "bmi" }
        ]
      }
    ]
  }
};
```

```js
exports.classificationRanges = {
  bmi: [
    { min: 0, max: 18.5, label: "Underweight" },
    { min: 18.5, max: 24.9, label: "Normal" },
    { min: 25, max: 29.9, label: "Overweight" },
    { min: 30, max: Infinity, label: "Obese" }
  ]
};
```

---

## 🛠 Development Notes

- `puppeteer` is used (not `puppeteer-core`) to avoid ReadableStream errors.
- Uses `getValueByPath()` utility to resolve dynamic field paths.
- All generated PDFs are stored in `/backend/reports`.

---

## 📬 Contact

Built by [Sohel B].  
