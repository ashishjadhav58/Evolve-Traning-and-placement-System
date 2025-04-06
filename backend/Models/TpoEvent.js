const mongoose = require('mongoose');

const TpoEventSchema = new mongoose.Schema({
  lecturer: { type: String, required: true },
  lectureName: { type: String, required: true },
  eventDateTime: { type: Date, required: true },
  venue: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Upcoming' }
});

module.exports = mongoose.model("TpoEvent", TpoEventSchema);
