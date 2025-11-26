const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  status: { type: String, enum: ["Vacant","Occupied","Reserved","Under maintenance"], default: "Vacant" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Room || mongoose.model("Room", RoomSchema);
