const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  resourceName: { type: String, required: true },
  description: String,
  category: String,
  driveLink: { type: String, required: true },
  uploadedBy: String,
  uploadDate: Date,
});

module.exports = mongoose.model('Resource', ResourceSchema);
