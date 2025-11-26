const Feedback = require("/models/Feedback");

// POST /api/feedback
const createFeedback = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const { roomId, rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({ message: "Rating required" });
    }

    const fb = await Feedback.create({
      user: userId,
      room: roomId,
      rating,
      comment
    });

    res.status(201).json(fb);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/feedback
const listFeedback = async (req, res) => {
  try {
    const list = await Feedback.find()
      .populate("user")
      .populate("room")
      .sort({ createdAt: -1 });

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createFeedback, listFeedback };
