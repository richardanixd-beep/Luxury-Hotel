const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["Available", "Reserved"], default: "Available" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Room || mongoose.model("Room", RoomSchema);
