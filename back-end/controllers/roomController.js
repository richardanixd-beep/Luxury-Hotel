const Room = require("gitmodels/Room");

// CREATE ROOM (Admin)
const createRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, description, amenities, status } = req.body;

    if (!roomNumber || !type || !price) {
      return res.status(400).json({ message: "Room number, type, and price are required." });
    }

    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ message: "Room number already exists." });
    }

    const room = await Room.create({
      roomNumber,
      type,
      price,
      description,
      amenities,
      status: status || "Available"
    });

    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};


// GET ALL ROOMS
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};


// GET SINGLE ROOM
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};


// UPDATE ROOM
const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found." });
    }

    res.json(updatedRoom);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};


// DELETE ROOM
const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);

    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found." });
    }

    res.json({ message: "Room deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
};
