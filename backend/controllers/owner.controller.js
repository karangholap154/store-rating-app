const db = require("../models");
const Store = db.store;
const Rating = db.rating;
const User = db.user;

exports.getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Get the store owned by this user
    const store = await Store.findOne({
      where: { ownerId },
      include: [
        {
          model: Rating,
          include: [{ model: User, attributes: ["id", "name", "email"] }],
        },
      ],
    });

    if (!store) {
      return res.status(404).json({ message: "No store found for this owner" });
    }

    const ratings = store.ratings || [];

    const averageRating = ratings.length
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
      : "N/A";

    // Get users who submitted ratings
    const users = ratings.map((r) => ({
      id: r.user.id,
      name: r.user.name,
      email: r.user.email,
      rating: r.rating,
    }));

    res.status(200).json({
      store: {
        id: store.id,
        name: store.name,
        address: store.address,
      },
      averageRating,
      ratedBy: users,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load store dashboard", error: err.message });
  }
};
