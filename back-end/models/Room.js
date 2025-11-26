const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomNumber: { type: String, unique: true },
  price: { type: Number, required: true },
  capacity: { type: Number, default: 1 },
  type: { 
    type: String, 
    enum: ["Standard", "Deluxe", "Suite"], 
    default: "Standard" 
  },
  status: { 
    type: String, 
    enum: ["Available", "Reserved", "Maintenance"], 
    default: "Available" 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Room || mongoose.model("Room", RoomSchema);
