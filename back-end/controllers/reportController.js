const Booking = require("models/Booking");
const Room = require("models/Room");

// GET /api/reports/summary
const summary = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const occupiedBookings = await Booking.countDocuments({ status: { $in: ["CheckedIn","Reserved"] } });
    const occupancyRate = totalRooms ? (occupiedBookings / totalRooms) * 100 : 0;

    const revenueAgg = await Booking.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" }, bookings: { $sum: 1 } } }
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;
    const totalBookings = revenueAgg[0]?.bookings || 0;

    res.json({ totalRooms, occupiedBookings, occupancyRate, totalRevenue, totalBookings });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { summary };
