const Booking = require("/models/Booking");
const Room = require("/models/Room");

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { roomId, checkIn, checkOut } = req.body;
    if (!roomId || !checkIn || !checkOut) return res.status(400).json({ message: "Missing fields" });

    // simple overlap check
    const existing = await Booking.findOne({
      room: roomId,
      status: { $in: ["Reserved", "CheckedIn"] },
      $or: [
        { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
        { checkIn: { $lte: new Date(checkIn) }, checkOut: { $gte: new Date(checkOut) } }
      ]
    });
    if (existing) return res.status(400).json({ message: "Room not available for those dates" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24));
    const totalPrice = nights * room.price;

    const booking = await Booking.create({
      user: userId,
      room: roomId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      totalPrice
    });

    // optional: mark reserved
    room.status = "Reserved";
    await room.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/bookings (admin gets all, user gets own)
const listBookings = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const all = await Booking.find().populate("room").populate("user").sort({ createdAt: -1 });
      return res.json(all);
    }
    const mine = await Booking.find({ user: req.user.id }).populate("room").sort({ createdAt: -1 });
    res.json(mine);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createBooking, listBookings };
