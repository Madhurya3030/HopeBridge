const mongoose = require("mongoose");

const reportCaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  children: { type: Number, required: true },
  studying: { type: String, enum: ["yes", "no"], required: false },
  healthIssues: { type: String, enum: ["yes", "no"], required: true },
  healthDetails: { type: String, required: function () { return this.healthIssues === "yes"; } },
  address: { type: String, required: true },
  location: { type: String, required: true },
  earnings: { type: Number, required: true },
  sufficientFood: { type: Boolean, required: true },
  needHelp: { type: String, enum: ["yes", "no"], required: true },
  photo: { type: String },
  verified: { type: Boolean, default: false } // Stores the filename or URL of the uploaded image
}, { timestamps: true });

module.exports = mongoose.model("ReportCase", reportCaseSchema);
