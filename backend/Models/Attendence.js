const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "TPOEvent"
  },
  eventName: {
    type: String,
  },
  views: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  suggestion: {
    type: String
  },
  markedAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Attendence", AttendanceSchema);
