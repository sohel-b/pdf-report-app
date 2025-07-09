exports.assessmentConfigs = {
  as_hr_02: {
    sections: [
      {
        name: "Key Vitals",
        fields: [
          { label: "Heart Rate", path: "vitalsMap.vitals.heart_rate", unit: "bpm" },
          { label: "Oxygen Saturation", path: "vitalsMap.vitals.oxy_sat_prcnt", unit: "%" },
          { label: "Respiratory Rate", path: "vitalsMap.vitals.resp_rate", unit: "rpm" }
        ]
      },
      {
        name: "Body Composition",
        fields: [
          { label: "BMI", path: "bodyCompositionData.BMI", unit: "", classify: "bmi" },
          { label: "BMR", path: "bodyCompositionData.BMR", unit: "kcal" },
          { label: "Fat Mass", path: "bodyCompositionData.FM", unit: "kg" }
        ]
      },
      {
        name: "Exercises",
        fields: [
          { label: "Jog Test Time", path: "exercises[2].setList[0].time", unit: "s" },
          { label: "Squat Reps", path: "exercises[3].correctReps", unit: "reps" }
        ]
      }
    ]
  },
  as_card_01: {
    sections: [
      {
        name: "Vitals",
        fields: [
          { label: "Heart Rate", path: "vitalsMap.vitals.heart_rate", unit: "bpm" },
          { label: "BP Systolic", path: "vitalsMap.vitals.bp_sys", unit: "mmHg" }
        ]
      },
      {
        name: "Body Composition",
        fields: [
          { label: "BMI", path: "bodyCompositionData.BMI", unit: "", classify: "bmi" }
        ]
      },
      {
        name: "Exercise",
        fields: [
          { label: "Jog Test Time", path: "exercises[2].setList[0].time", unit: "s" }
        ]
      }
    ]
  }
};

exports.classificationRanges = {
  bmi: [
    { min: 0, max: 18.5, label: "Underweight" },
    { min: 18.5, max: 24.9, label: "Normal" },
    { min: 25, max: 29.9, label: "Overweight" },
    { min: 30, max: Infinity, label: "Obese" }
  ]
};