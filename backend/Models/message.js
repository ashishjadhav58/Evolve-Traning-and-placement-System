const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    msg: String,
    read: { type: Boolean, default: false },  // Default read status to false
}, { timestamps: true });  // Automatically adds createdAt & updatedAt fields

const message = mongoose.model("message", messageSchema);

module.exports = message;
